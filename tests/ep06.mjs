import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const source=await fs.readFile('content/works/tainan-youth-wind/chapters/ep06.md');
assert.deepEqual(await fs.readFile('dist/content/tainan-youth-wind/ep06.md'),source);
const browser=await chromium.launch({channel:'msedge',headless:true});
await fs.mkdir('.local/ep06',{recursive:true});
try{
 for(const width of [375,390,430,1440])for(const theme of ['dark','light','warm']){
  const context=await browser.newContext({viewport:{width,height:width===375?667:900}});
  await context.addInitScript(theme=>{if(!localStorage.getItem('imaginary-library:v1:reader:settings'))localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({theme,mode:'scroll',size:18,line:1.9,motion:'none'}));},theme);
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'work.html?id=tainan-youth-wind');
  await page.locator('#chapter-list a').last().waitFor();assert.equal(await page.locator('#chapter-list a').count(),6);
  assert.match(await page.locator('#chapter-list a').last().textContent(),/EP.06｜菸癮/);
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep05');await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#next-chapter').click();await page.waitForURL(/chapter=ep06/);await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#previous-chapter').getAttribute('href'),/chapter=ep05/);
  assert.equal(await page.locator('#next-chapter').evaluate(e=>e.hidden),true);
  const text=await page.locator('#scroll-content').innerText();assert.ok(text.includes('我叫嘉豪。')&&text.includes('是妳。'));
  assert.equal(await page.locator('#scroll-content .fn-ref').count(),0);
  await page.locator('[data-language-toggle]').click();assert.match(await page.locator('#scroll-content').innerText(),/烟瘾/);
  await page.locator('[data-language-toggle]').click();assert.equal(await page.locator('#scroll-content').innerText(),text);
  if(theme==='dark'){
   await page.locator('#music-panel summary').click();assert.match(await page.locator('#music-summary').textContent(),/Who Cares 胡凱兒〈菸癮〉/);
   await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>0);
   const duration=await page.locator('#music-audio').evaluate(a=>a.duration);assert.ok(duration>60);console.log('Decoded MP3 seconds:',duration);
   await page.locator('#music-volume').fill('40');assert.equal(await page.locator('#music-audio').evaluate(a=>a.volume),.4);
   await page.locator('#music-seek').fill('500');await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>30);
   await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-audio').paused);await page.locator('#music-panel summary').click();
  }
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
  await page.locator('#next').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind'))?.block>0);
  const position=await page.locator('#position').innerText();await page.reload();await page.locator('body[data-ready=true]').waitFor();assert.equal(await page.locator('#position').innerText(),position);
  for(let turn=0;turn<180;turn++){
   const result=await page.evaluate(()=>{const sheets=[...document.querySelectorAll('.sheet:not([aria-hidden="true"])')],m=document.querySelector('#position').textContent.match(/^(\d+)(?: — (\d+))? \/ (\d+)$/);return{empty:sheets.some(s=>!s.querySelector('.book-page-body').textContent.trim()),overflow:sheets.some(s=>{const box=s.querySelector('.page-content').getBoundingClientRect();return [...s.querySelector('.book-page-body').children].some(c=>c.getBoundingClientRect().bottom>box.bottom+2);}),last:m&&Number(m[2]||m[1])>=Number(m[3]),horizontal:document.documentElement.scrollWidth>innerWidth};});
   assert.equal(result.empty,false);assert.equal(result.overflow,false);assert.equal(result.horizontal,false);
   if(result.last)break;assert.ok(turn<179);await page.locator('#next').click();
  }
  assert.ok((await page.locator('#book').innerText()).includes('是妳。'));assert.deepEqual(errors,[]);
  await page.screenshot({path:`.local/ep06/${width}-${theme}.png`});await context.close();console.log('PASS EP.06',width,theme);
 }
}finally{await browser.close();}
