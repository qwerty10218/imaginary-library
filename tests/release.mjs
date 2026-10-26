import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
await fs.mkdir('.local/release',{recursive:true});
async function scanPages(page){
 await page.locator('#settings-button').click();await page.locator('#motion').selectOption('none');await page.locator('#settings .panel-head button').click();
 for(let turn=0;turn<50;turn++){
  const result=await page.evaluate(()=>{
   const sheets=[...document.querySelectorAll('.sheet:not([aria-hidden="true"])')];
   const overflow=sheets.some(sheet=>{const content=sheet.querySelector('.page-content'),body=sheet.querySelector('.book-page-body'),notes=sheet.querySelector('.page-footnotes');return [...body.children].some(child=>child.getBoundingClientRect().bottom>(notes?.getBoundingClientRect().top??content.getBoundingClientRect().bottom)+2);});
   const position=document.querySelector('#position').textContent;
   const match=position.match(/^(\d+)(?: — (\d+))? \/ (\d+)$/);
   return {nonempty:sheets.every(sheet=>sheet.querySelector('.book-page-body').textContent.trim()),overflow,last:match&&Number(match[2]||match[1])>=Number(match[3])};
  });
  assert.ok(result.nonempty,'published page is empty');assert.equal(result.overflow,false,'published page overflows');
  if(result.last)return;
  await page.locator('#next').click();
 }
 throw Error('Published chapter has too many or nonterminating pages');
}
try{
 for(const width of [390,1440,1720]){
  const context=await browser.newContext({viewport:{width,height:width===390?844:width===1720?864:900}});
  const page=await context.newPage();const errors=[],failed=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)failed.push(response.url());});
  await page.goto(base);await page.locator('.work-card').first().waitFor();
  assert.equal(await page.locator('.work-card').count(),2);
  const firstCover=page.locator('.work-card').filter({has:page.locator('a[href="work.html?id=zhen-du-chuanyue"]')}).locator('.work-cover img');
  await firstCover.evaluate(img=>img.decode());
  assert.equal(await firstCover.evaluate(img=>img.naturalWidth===1086),true);
  await page.screenshot({path:`.local/release/home-${width}.png`,fullPage:true});
  await page.locator('[data-language-toggle]').click();
  const originalCard=page.locator('.work-card').filter({has:page.locator('a[href="work.html?id=zhen-du-chuanyue"]')});
  assert.match(await originalCard.innerText(),/历史轻喜剧/);
  await originalCard.locator('a').click();await page.locator('#chapter-list a').first().waitFor();
  assert.equal(await page.locator('#chapter-list a').count(),3);
  assert.match(await page.locator('#work-disclaimer').innerText(),/历史轻喜剧/);
  assert.match(await page.locator('#chapter-list').innerText(),/御花园遇和珅/);
  await page.screenshot({path:`.local/release/work-${width}.png`,fullPage:true});
  await page.locator('#chapter-list a').first().click();await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#reader-title').innerText(),/我穿越了/);
  assert.equal(await page.evaluate(()=>document.documentElement.lang),'zh-CN');
  if(width===390){await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();}
  assert.equal(await page.locator('.sheet').count(),width===390?1:2);
  assert.match(await page.locator('#book').innerText(),/我穿越了/);
  await page.screenshot({path:`.local/release/reader-${width}.png`,fullPage:true});
  await scanPages(page);
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:zhen-du-chuanyue')));
  await page.locator('[data-language-toggle]').click();
  assert.equal(await page.evaluate(()=>document.documentElement.lang),'zh-TW');
  assert.equal(await page.locator('.sheet').count(),width===390?1:2);
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:zhen-du-chuanyue')));
  assert.equal(after.chapterId,before?.chapterId||'001');
  await page.locator('#next').click();await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#reader-title').innerText(),/御花園遇和珅/);
  await page.locator('[data-language-toggle]').click();
  await page.locator('#settings-button').click();await page.locator('button[data-mode=scroll]').click();await page.locator('#settings .panel-head button').click();
  const simplified=await page.locator('#scroll-content').innerText();
  assert.match(simplified,/抬起头来/);
  assert.doesNotMatch(simplified,/擡/);
  assert.match(await page.locator('#scroll-content').evaluate(el=>getComputedStyle(el).fontFamily),/Songti SC.*SimSun/);
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
  await page.screenshot({path:`.local/release/reader-simplified-${width}.png`,fullPage:true});
  await scanPages(page);
  await page.locator('[data-language-toggle]').click();
  await page.locator('#next').click();await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#reader-title').innerText(),/暢音閣點戲/);
  await scanPages(page);
  await page.locator('[data-language-toggle]').click();await page.reload();await page.locator('body[data-ready=true]').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.lang),'zh-CN');
  assert.match(await page.locator('#reader-title').innerText(),/畅音阁点戏/);
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  await context.close();
 }
 console.log('PASS: published chapters, cover, Traditional/Simplified preference and page navigation at 390/1440/1720px.');
}finally{await browser.close();}
