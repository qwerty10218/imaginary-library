import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const browser=await chromium.launch({headless:true,channel:'msedge'});
await fs.mkdir('.local/vinyl',{recursive:true});
try {
 for(const width of [320,375,390,430,1440]){
  const page=await browser.newPage({viewport:{width,height:width===375?667:900},hasTouch:width<600});
  await page.goto('http://127.0.0.1:4173/imaginary-library/reader.html?work=tainan-youth-wind&chapter=ep01');
  await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#music-panel summary').click();
  const button=await page.locator('#music-play').boundingBox();
  assert.equal(button.width,44);assert.equal(button.height,44);
  const geometry=await page.locator('.music-deck').evaluate(deck=>{
   const vinyl=deck.querySelector('.music-vinyl'),arm=deck.querySelector('.music-needle');
   const bounds=deck.getBoundingClientRect(),needle=arm.getBoundingClientRect();
   return {diameter:vinyl.offsetWidth,origin:getComputedStyle(vinyl).transformOrigin,wood:(parseFloat(getComputedStyle(deck,'::before').width)+2)/bounds.width,inside:vinyl.offsetLeft>=0&&vinyl.offsetLeft+vinyl.offsetWidth<=deck.clientWidth&&vinyl.offsetTop+vinyl.offsetHeight<=deck.clientHeight,armInside:needle.left-10>=bounds.left&&needle.right+10<=bounds.right&&needle.top-10>=bounds.top&&needle.bottom+10<=bounds.bottom};
  });
  assert.equal(geometry.diameter,76);assert.equal(geometry.origin,'38px 38px');
  assert.ok(Math.abs(geometry.wood-.7)<.01);assert.equal(geometry.inside,true);assert.equal(geometry.armInside,true);
  await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  assert.equal(await page.locator('#music-panel').evaluate(e=>e.open),true);
  const transform=()=>page.locator('#music-vinyl').evaluate(e=>getComputedStyle(e).transform);
  const start=await transform();await page.waitForTimeout(250);assert.notEqual(await transform(),start);
  const armInside=await page.locator('.music-needle').evaluate(arm=>{const a=arm.getBoundingClientRect(),d=arm.parentElement.getBoundingClientRect();return a.left-10>=d.left&&a.right+10<=d.right&&a.top-10>=d.top&&a.bottom+10<=d.bottom;});
  assert.equal(armInside,true);
  await page.screenshot({path:`.local/vinyl/after-${width}.png`});
  await page.locator('#music-play').click();
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('#music-vinyl')).animationPlayState==='paused');
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const stopped=await transform();await page.waitForTimeout(250);assert.equal(await transform(),stopped);
  assert.notEqual(stopped,'none');
  await page.locator('#music-play').click();await page.waitForTimeout(250);assert.notEqual(await transform(),stopped);
  assert.equal(await page.locator('#music-play').getAttribute('aria-label'),'暫停音樂');
  const layout=await page.evaluate(()=>{
   const a=document.querySelector('#floating-settings').getBoundingClientRect(),m=document.querySelector('#music-panel').getBoundingClientRect();
   return {overflow:document.documentElement.scrollWidth>innerWidth,overlap:a.left<m.right&&a.right>m.left&&a.top<m.bottom&&a.bottom>m.top,deck:document.querySelector('.music-deck').getBoundingClientRect().height};
  });
  assert.equal(layout.overflow,false);assert.equal(layout.overlap,false);assert.equal(layout.deck,76);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('#music-vinyl').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.close();console.log('PASS vinyl',width);
 }
} finally {await browser.close();}
