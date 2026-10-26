import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const id='jiao-wo-shen-zong';
const browser=await chromium.launch({headless:true,channel:'msedge'});
await fs.mkdir('.local/shen',{recursive:true});
try {
for(const width of [390,1440]){
 const context=await browser.newContext({viewport:{width,height:900}});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto(base);await page.locator('.work-card').first().waitFor();
 assert.equal(await page.locator('.work-card').count(),3);
 const card=page.locator(`a[href="work.html?id=${id}"]`);
 assert.ok(await card.locator('img').evaluate(async img=>{await img.decode();return img.naturalWidth>0&&getComputedStyle(img).objectFit==='contain';}));
 await page.screenshot({path:`.local/shen/home-${width}.png`,fullPage:true});
 await card.click();await page.locator('#chapter-list a').waitFor();
 assert.equal(await page.locator('#work-title').innerText(),'叫我沈總');
 assert.match(await page.locator('#work-disclaimer').innerText(),/無官方合作或授權關係/);
 assert.equal(await page.locator('#chapter-list a').count(),1);
 assert.ok(await page.locator('#work-cover img').evaluate(async img=>{await img.decode();return getComputedStyle(img).objectFit==='contain';}));
 await page.screenshot({path:`.local/shen/work-${width}.png`,fullPage:true});
 await page.locator('#chapter-list a').click();await page.locator('body[data-ready=true]').waitFor();
 await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#motion').selectOption('fold');await page.locator('#settings .panel-head button').click();
 assert.equal(await page.locator('.sheet').count(),width===390?1:2);
 await page.locator('#next').click();await page.waitForTimeout(750);
 const moved=await page.locator('#position').innerText();
 await page.locator('#prev').click();await page.waitForTimeout(750);
 assert.notEqual(await page.locator('#position').innerText(),moved);
 await page.locator('#next').click();await page.waitForTimeout(750);
 await page.screenshot({path:`.local/shen/reader-${width}.png`,fullPage:true});
 const saved=await page.evaluate(()=>localStorage.getItem('imaginary-library:v1:progress:jiao-wo-shen-zong'));
 await page.reload();await page.locator('body[data-ready=true]').waitFor();
 assert.equal(await page.locator('#position').innerText(),moved);
 assert.ok(saved);
 await page.locator('[data-language-toggle]').click();assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 await page.locator('#settings-button').click();await page.locator('button[data-mode=scroll]').click();await page.locator('#settings .panel-head button').click();
 assert.match(await page.locator('#scroll-content').innerText(),/劳斯莱斯/);
 await page.locator('[data-language-toggle]').click();
 const body=await page.locator('#scroll-content > p').allTextContents().then(parts=>parts.join('\n'));assert.ok(body.trim().endsWith('「嘖，老子的勞斯萊斯呢？」'));
 assert.match(body,/胡林語/);
 assert.ok(await page.locator('#scroll-content').evaluate(el=>{const r=document.createRange();r.selectNodeContents(el.querySelector('p'));getSelection().removeAllRanges();getSelection().addRange(r);return getSelection().toString().length>0;}));
 await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#motion').selectOption('none');await page.locator('#settings .panel-head button').click();
 for(let n=0;n<80;n++){
  const state=await page.evaluate(()=>{const sheets=[...document.querySelectorAll('.sheet:not([aria-hidden="true"])')];const m=document.querySelector('#position').textContent.match(/^(\d+)(?: — (\d+))? \/ (\d+)$/);return {empty:sheets.some(s=>!s.querySelector('.book-page-body').textContent.trim()),overflow:sheets.some(s=>{const b=s.querySelector('.book-page-body'),c=s.querySelector('.page-content');return [...b.children].some(x=>x.getBoundingClientRect().bottom>c.getBoundingClientRect().bottom+2);}),last:m&&Number(m[2]||m[1])>=Number(m[3])};});
  assert.equal(state.empty,false);assert.equal(state.overflow,false);if(state.last)break;assert.ok(n<79);await page.locator('#next').click();
 }
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.locator('#back-to-work').click();await page.locator('#chapter-list a').waitFor();
 await page.goto(base+'reader.html?work=zhen-du-chuanyue&chapter=001');await page.locator('body[data-ready=true]').waitFor();assert.match(await page.locator('#reader-title').innerText(),/我穿越了/);
 assert.ok(await page.evaluate(()=>localStorage.getItem('imaginary-library:v1:progress:jiao-wo-shen-zong')));
 assert.deepEqual(errors,[]);await context.close();
 console.log(`PASS ${base} ${width}px: catalog, cover, disclaimer, page/scroll, language, selection, progress, old work, no errors`);
}
}finally{await browser.close();}
