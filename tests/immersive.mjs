import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const base='http://127.0.0.1:4173/imaginary-library/reader.html?work=zhen-du-chuanyue&chapter=002';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
try {
 for(const [width,height,minBookHeight] of [[1440,900,700],[1720,864,700],[390,844,500]]){
  const context=await browser.newContext({viewport:{width,height}});
  await context.addInitScript(()=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({theme:'warm',mode:'page',size:20,line:1.9,font:'serif',motion:'fold'})));
  await context.addInitScript(()=>{const observer=new MutationObserver(()=>{if(document.body){observer.disconnect();requestAnimationFrame(()=>{window.__firstFrameTheme=document.body.dataset.theme;});}});observer.observe(document,{childList:true,subtree:true});});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base);await page.locator('body[data-ready=true]').waitFor();await page.waitForFunction(()=>window.__firstFrameTheme!==undefined);
  assert.equal(await page.evaluate(()=>window.__firstFrameTheme),'warm','saved theme flashes dark before the reader loads');
  const layout=await page.evaluate(()=>{
   const book=document.querySelector('#book').getBoundingClientRect();
   const prev=document.querySelector('#prev').getBoundingClientRect();
   const next=document.querySelector('#next').getBoundingClientRect();
   const progress=document.querySelector('.reading-navigation').getBoundingClientRect();
   return {height:book.height,top:book.top,bottom:book.bottom,left:book.left,right:book.right,prevX:prev.right,nextX:next.left,prevY:prev.top+prev.height/2,nextY:next.top+next.height/2,progressTop:progress.top,progressBottom:progress.bottom,horizontalOverflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.ok(layout.height>=minBookHeight,`${width}px book is too short: ${layout.height}`);
  assert.equal(layout.horizontalOverflow,false,`${width}px horizontal overflow`);
  assert.ok(layout.top>=50&&layout.progressBottom<=height,`${width}px controls leave the viewport`);
  const edgeInset=width<600?26:2;
  assert.ok(layout.prevX<=layout.left+edgeInset&&layout.nextX>=layout.right-edgeInset,`${width}px page buttons cover text`);
  assert.ok(Math.abs(layout.prevY-(layout.top+layout.height/2))<2&&Math.abs(layout.nextY-(layout.top+layout.height/2))<2,`${width}px page buttons are not centered`);
  for(let i=0;i<4;i++){
   await page.locator('#next').click();
   await page.locator('.turn-overlay').waitFor({state:'detached'});
   assert.equal(await page.locator('body').getAttribute('data-theme'),'warm','page turn changed the theme');
  }
  await page.locator('#prev').click();await page.locator('.turn-overlay').waitFor({state:'detached'});
  assert.equal(await page.locator('body').getAttribute('data-theme'),'warm');
  const beforeKeyboard=await page.locator('#position').innerText();
  await page.keyboard.press('ArrowRight');await page.locator('.turn-overlay').waitFor({state:'detached'});
  assert.notEqual(await page.locator('#position').innerText(),beforeKeyboard,'arrow key stopped working after button focus');
  await page.locator('#settings-button').click();await page.locator('button[data-mode=scroll]').click();await page.locator('#settings .panel-head button').click();
  assert.equal(await page.locator('.book-stage').isVisible(),false);
  assert.equal(await page.locator('#scroll-content').isVisible(),true);
  assert.equal(await page.locator('body').getAttribute('data-theme'),'warm');
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
  assert.equal(await page.locator('#book').isVisible(),true);
  assert.equal(await page.locator('body').getAttribute('data-theme'),'warm');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:zhen-du-chuanyue')).chapterId),'002');
  await page.locator('[data-language-toggle]').click();
  assert.equal(await page.evaluate(()=>document.documentElement.lang),'zh-CN');
  assert.equal(await page.locator('body').getAttribute('data-theme'),'warm');
  if(width===1720){
   await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(2).click();
   await page.locator('body[data-ready=true]').waitFor();await page.waitForFunction(()=>window.__firstFrameTheme!==undefined);
   assert.equal(await page.evaluate(()=>window.__firstFrameTheme),'warm','chapter navigation flashes dark');
   assert.equal(await page.locator('body').getAttribute('data-theme'),'warm');
  }
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${width}×${height}, book ${Math.round(layout.height)}px, side controls, warm turns, keyboard, modes, progress and language.`);
  await context.close();
 }
 const blocked=await browser.newContext();
 await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage blocked');}}));
 const fallback=await blocked.newPage();await fallback.goto(base);await fallback.locator('body[data-ready=true]').waitFor();
 assert.equal(await fallback.locator('body').getAttribute('data-theme'),'dark');
 await blocked.close();
}finally{await browser.close();}
