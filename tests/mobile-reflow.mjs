import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const browser=await chromium.launch({headless:true,channel:'msedge'});
const base='http://127.0.0.1:4173/imaginary-library/reader.html?work=tainan-youth-wind&chapter=ep01';
const settle=async p=>{await p.locator('body[data-ready=true]').waitFor();await p.waitForTimeout(450);};
async function setting(p,id,value){await p.locator('#settings-button').click();await p.locator('#'+id).selectOption(value);await p.locator('#settings .panel-head button').click();await settle(p);}
const anchor=p=>p.locator('#book [data-idx]').first().evaluate(e=>({block:e.dataset.idx,offset:Number(e.dataset.start||0)}));
async function contains(p,a){
 const blocks=await p.locator('#book [data-idx]').evaluateAll(els=>els.map(e=>({block:e.dataset.idx,start:Number(e.dataset.start||0),length:e.textContent.length})));
 assert.ok(blocks.some(b=>b.block===String(a.block)&&b.start<=a.offset&&b.start+b.length>a.offset),`reflow lost anchor ${JSON.stringify(a)}; visible ${JSON.stringify(blocks)}`);
}
async function fits(p){assert.equal(await p.evaluate(()=>{
 const book=document.querySelector('#book'),dock=document.querySelector('#reader-dock'),box=book.querySelector('.page-content');
 const notes=box.querySelector('.page-footnotes'),end=notes?.getBoundingClientRect().top??box.getBoundingClientRect().bottom;
 return document.body.dataset.mode==='page'&&book.getBoundingClientRect().bottom<=dock.getBoundingClientRect().top&&[...box.querySelector('.book-page-body').children].every(e=>e.getBoundingClientRect().bottom<=end+2)&&(!notes||notes.getBoundingClientRect().bottom<=box.getBoundingClientRect().bottom+2)&&document.documentElement.scrollWidth<=innerWidth;
 }),true,'viewport change clips the page or covers text');}
try{
 for(const [width,height] of [[375,667],[390,844],[430,932]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await settle(page);
  assert.equal(await page.locator('#font-size').inputValue(),'18','new mobile default must be 18px');
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#motion').selectOption('none');await page.locator('#settings .panel-head button').click();await settle(page);
  for(let i=0;i<5;i++)await page.locator('#next').click();
  let current=await anchor(page);
  await setting(page,'font-size','22');await contains(page,current);await fits(page);
  assert.equal(await page.locator('#book .book-page-body').evaluate(e=>getComputedStyle(e).fontSize),'22px');
  current=await anchor(page);await setting(page,'line-height','2.1');await contains(page,current);await fits(page);
  await setting(page,'font-size','18');await setting(page,'line-height','1.7');await fits(page);await setting(page,'line-height','1.9');
  await page.locator('#next').click();await page.waitForTimeout(550);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind')));
  assert.ok(saved?.block!==undefined);
  await page.reload();await settle(page);await contains(page,{block:saved.block,offset:saved.offset});
  assert.equal(await page.locator('#font-size').inputValue(),'18');
  for(const viewport of [{width,height:height-120},{width:height,height:width},{width,height}]){
   current=await anchor(page);await page.setViewportSize(viewport);await settle(page);await contains(page,current);await fits(page);
  }
  current=await anchor(page);await page.evaluate(()=>visualViewport.dispatchEvent(new Event('resize')));await settle(page);await contains(page,current);await fits(page);
  await page.locator('#music-panel summary').click();await settle(page);await fits(page);await page.locator('#music-panel summary').click();await settle(page);
  const position=await page.locator('#position').innerText();
  await page.locator('#book').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:300,clientY:200}]});
  await page.locator('#book').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:100,clientY:200}]});
  assert.notEqual(await page.locator('#position').innerText(),position,'swipe must still turn pages');
  await setting(page,'motion','fold');
  await page.locator('#next').evaluate(e=>e.click());
  const duration=await page.locator('.turn-leaf').evaluate(e=>{const a=e.getAnimations()[0];a.pause();a.currentTime=240;return a.effect.getTiming().duration;});
  assert.equal(duration,480,'keep the existing page-turn animation');
  assert.match(await page.locator('.turn-leaf').evaluate(e=>getComputedStyle(e).transform),/matrix3d/);
  await page.locator('.turn-overlay').evaluate(e=>e.getAnimations({subtree:true}).forEach(a=>a.finish()));
  await page.waitForFunction(()=>!document.querySelector('.turn-overlay'));await fits(page);
  await setting(page,'font-size','24');await page.reload();await settle(page);
  assert.equal(await page.locator('#font-size').inputValue(),'24','saved font must not be forced down to 18px');await fits(page);
  assert.deepEqual(errors,[]);await page.close();console.log('PASS mobile reflow',width);
 }
 const desktop=await browser.newPage({viewport:{width:1440,height:900}});await desktop.goto(base);await settle(desktop);
 assert.equal(await desktop.locator('#font-size').inputValue(),'20');await desktop.close();
}finally{await browser.close();}
