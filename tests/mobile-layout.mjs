import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const browser=await chromium.launch({headless:true,channel:'msedge'});
const out='.local/mobile-reader';await fs.mkdir(out,{recursive:true});
const results=[];
const ready=page=>page.locator('body[data-ready=true]').waitFor();
const close=page=>page.locator('#settings .panel-head button').click();
async function mode(page,value){await page.locator('#settings-button').click();await page.locator(`button[data-mode=${value}]`).click();await close(page);await page.waitForTimeout(400);}
async function geometry(page){return page.evaluate(()=>{
 const rect=id=>{const r=document.querySelector(id).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
 const aa=rect('#floating-settings'),music=rect('#music-panel');
 return {book:rect('#book'),scroll:rect('#scroll-content'),aa,music,dock:rect('#reader-dock'),overflow:document.documentElement.scrollWidth>innerWidth,overlap:aa.left<music.right&&aa.right>music.left&&aa.top<music.bottom&&aa.bottom>music.top};
});}
try{
 for(const width of [375,390,430,1440]){
  const height=width===375?667:900;
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<600}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/imaginary-library/reader.html?work=tainan-youth-wind&chapter=ep01');await ready(page);
  await mode(page,'page');
  const collapsed=await geometry(page);
  assert.equal(collapsed.overflow,false);assert.equal(collapsed.overlap,false);
  if(width<600){
   assert.ok(Math.abs(collapsed.book.width/width-.88)<.005);
   assert.ok(collapsed.music.width<=collapsed.book.width);
   assert.ok(collapsed.music.width<=280&&collapsed.music.width<=width*.72+.5);
   assert.ok(collapsed.aa.bottom+7<=collapsed.music.top);
   assert.equal(collapsed.aa.width,44);assert.equal(collapsed.aa.height,44);
   assert.equal(await page.locator('.reading-navigation .progress-track').isVisible(),false);
   for(const id of ['prev','next']){
    const bounds=await page.locator('#'+id).boundingBox();assert.equal(bounds.width,44);
    assert.ok(bounds.x>=-1&&bounds.x+bounds.width<=width+1);
   }
   const clearText=await page.evaluate(()=>{
    const text=document.querySelector('.page-content').getBoundingClientRect(),prev=document.querySelector('#prev').getBoundingClientRect(),next=document.querySelector('#next').getBoundingClientRect();
    return text.left>=prev.right&&text.right<=next.left;
   });assert.equal(clearText,true);
  }
  await page.screenshot({path:`${out}/after-page-${width}.png`});
  const before=await page.locator('#position').innerText();await page.locator('#next').click();
  await page.waitForFunction(()=>!document.querySelector('.turn-overlay'));assert.notEqual(await page.locator('#position').innerText(),before);
  await page.locator('#prev').click();await page.waitForFunction(()=>!document.querySelector('.turn-overlay'));
  await page.locator('#music-panel summary').click();await page.waitForTimeout(400);
  const expanded=await geometry(page);assert.equal(expanded.overlap,false);assert.equal(expanded.overflow,false);
  assert.ok(expanded.book.bottom<=expanded.dock.top,'expanded tools cover the page');
  await page.screenshot({path:`${out}/after-expanded-${width}.png`});
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-vinyl').classList.contains('is-playing'));
  await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-vinyl').classList.contains('is-playing'));
  await page.locator('#music-panel summary').click();await page.locator('#floating-settings').click();
  await page.locator('#settings[open]').waitFor();await close(page);
  await mode(page,'scroll');
  const scroll=await geometry(page);if(width<600)assert.ok(Math.abs(scroll.scroll.width/width-.88)<.005);
  await page.locator('#scroll-content .fn-ref').first().click();await page.locator('#note[open]').waitFor();await page.locator('#note .panel-head button').click();
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/after-scroll-${width}.png`});
  assert.equal((await geometry(page)).overflow,false);assert.deepEqual(errors,[]);
  results.push({width,height,collapsed,expanded,scroll});await page.close();console.log('PASS mobile layout',width);
 }
 await fs.writeFile(out+'/results.json',JSON.stringify(results,null,2));
}finally{await browser.close();}
