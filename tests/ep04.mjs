import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];await fs.mkdir('.local/ep04',{recursive:true});
try{
 for(const width of [375,390,430,1440]){
  const context=await browser.newContext({viewport:{width,height:width===375?667:width===430?932:900}});
  await context.addInitScript(()=>{
   if(!localStorage.getItem('imaginary-library:v1:reader:settings'))localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'scroll',size:18,line:1.9,motion:'none',theme:'dark'}));
   if(!localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind'))localStorage.setItem('imaginary-library:v1:progress:tainan-youth-wind',JSON.stringify({schemaVersion:1,chapterId:'ep03',block:2,offset:0,percentage:.1,updatedAt:new Date().toISOString()}));
  });
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'work.html?id=tainan-youth-wind');
  await page.locator('#chapter-list a').last().waitFor();
  assert.equal(await page.locator('#chapter-list a').count(),5);
  assert.match(await page.locator('#chapter-list a').last().getAttribute('href'),/chapter=ep05/);
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep03');
  await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#next-chapter').getAttribute('href'),/chapter=ep04/);
  await page.locator('#music-panel summary').click();await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.locator('#next-chapter').click();await page.waitForURL(/chapter=ep04/);
  assert.match(await page.locator('#music-chapter-song').innerText(),/30CM/);
  assert.match(await page.locator('#music-summary').innerText(),/安平之光/);
  assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),false);
  assert.match(await page.locator('#next-chapter').getAttribute('href'),/chapter=ep05/);
  assert.ok(await page.locator('a[href*="chapter=ep05"]').count()>0);
  assert.match(await page.locator('#previous-chapter').getAttribute('href'),/chapter=ep03/);
  assert.equal(await page.locator('#scroll-content .fn-ref').count(),5);
  const text=await page.locator('#scroll-content').innerText();
  assert.ok(text.includes('大屌哥'));assert.ok(!text.includes('大屌歌'));
  assert.ok(!text.includes('公開上架前應再確認'));
  await page.locator('#scroll-content .fn-ref').nth(4).click();
  assert.match(await page.locator('#note-text').innerText(),/饒舌歌曲/);await page.locator('#note .panel-head button').click();
  if(!await page.locator('#music-panel').evaluate(e=>e.open))await page.locator('#music-panel summary').click();
  await page.locator('#music-switch').click();await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused&&document.querySelector('#music-audio').duration>0);
  const duration=await page.locator('#music-audio').evaluate(a=>a.duration);assert.ok(duration>60);
  await page.locator('#music-volume').fill('40');assert.equal(await page.locator('#music-audio').evaluate(a=>a.volume),.4);
  await page.locator('#music-seek').fill('500');await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>30);
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-audio').paused);
  await page.locator('#music-panel summary').click();
  await page.locator('[data-language-toggle]').click();assert.match(await page.locator('#scroll-content').innerText(),/国华街/);
  await page.locator('[data-language-toggle]').click();
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
  await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#next').click();await page.locator('#next').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind'))?.block>0);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind')));
  assert.equal(saved.chapterId,'ep04');assert.ok(saved.block>0);
  const position=await page.locator('#position').innerText();
  await page.reload();await page.locator('body[data-ready=true]').waitFor();
  assert.equal(await page.locator('#position').innerText(),position);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind')).chapterId),'ep04');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`.local/ep04/reader-${width}.png`});assert.deepEqual(errors,[]);
  results.push({width,duration,notes:5,chapterNavigation:true,crossChapterMusic:true,progressRestored:true});
  await context.close();console.log('PASS EP.04',width,duration);
 }
 await fs.writeFile('.local/ep04/browser-results.json',JSON.stringify(results,null,2));
}finally{await browser.close();}
