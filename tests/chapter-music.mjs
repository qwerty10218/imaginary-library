import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const work=JSON.parse(await fs.readFile('content/works/tainan-youth-wind/metadata.json','utf8'));
const songs=new Map(work.songs.map(song=>[song.id,song]));
const browser=await chromium.launch({channel:'msedge',headless:true});
await fs.mkdir('.local/chapter-music',{recursive:true});
async function selected(page,index){
 const song=songs.get(work.chapters[index].songId);
 await page.waitForURL(new RegExp('chapter='+work.chapters[index].id));
 await page.waitForFunction(audio=>document.querySelector('#music-audio').getAttribute('src')===audio,song.audio);
 assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),true);
 assert.equal(await page.locator('#music-audio').evaluate(a=>a.currentTime),0);
 assert.equal(await page.locator('#music-summary').textContent(),`聆聽 · ${song.artist}〈${song.title}〉`);
 assert.equal(await page.locator('#music-play').getAttribute('aria-label'),'播放音樂');
 assert.equal(await page.locator('#music-switch').isVisible(),false);
 assert.equal(await page.locator('#music-vinyl').evaluate(e=>e.classList.contains('is-playing')),false);
}
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');
  await page.locator('body[data-ready=true]').waitFor();await selected(page,0);
  await page.locator('#music-panel summary').click();
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>0);
  assert.match(await page.locator('#music-summary').textContent(),/^播放中/);
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-summary').textContent.startsWith('已暫停'));assert.match(await page.locator('#music-summary').textContent(),/^已暫停/);
  for(const index of [1,2,3,4,0]){
   // Exercise both playing and paused transitions; every target must reset paused.
   if(index%2){await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);}
   await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(index).click();await selected(page,index);
  }
  await page.goBack();await selected(page,4);await page.goForward();await selected(page,0);
  await page.reload();await page.locator('body[data-ready=true]').waitFor();await selected(page,0);
  await page.locator('#music-panel summary').click();
  await page.locator('#music-file').setInputFiles('web/assets/music/summer-night-wind.mp3');
  assert.match(await page.locator('#music-audio').getAttribute('src'),/^blob:/);
  assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),true);
  await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(1).click();await selected(page,1);
  await page.screenshot({path:`.local/chapter-music/not-started-${width}.png`});
  assert.deepEqual(errors,[]);await page.close();console.log('PASS chapter music defaults, five songs, playing/paused transitions, history, reload and local file',width);
 }
 const page=await browser.newPage();
 await page.route('**/data/works.json',async route=>{
  const response=await route.fetch();const data=await response.json();data.works.find(w=>w.id===work.id).chapters[1].songId=null;
  await route.fulfill({response,json:data});
 });
 await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await page.locator('body[data-ready=true]').waitFor();
 await page.locator('#music-panel summary').click();await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
 await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(1).click();await page.waitForURL(/chapter=ep02/);
 assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),true);assert.equal(await page.locator('#music-audio').getAttribute('src'),null);assert.equal(await page.locator('#music-play').isDisabled(),true);
 await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(2).click();await selected(page,2);assert.equal(await page.locator('#music-play').isDisabled(),false);
 await page.close();console.log('PASS chapter without song clears previous audio and next song restores controls');
}finally{await browser.close();}
