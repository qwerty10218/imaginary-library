import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const base='http://127.0.0.1:4173/imaginary-library/prototype.html?mode=page';
const artifacts='.local/page-turn';
await fs.mkdir(artifacts,{recursive:true});
const results=[];
const settle=p=>p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
const position=p=>p.locator('#position').innerText();
async function seek(p,time){
 await p.locator('.turn-overlay').evaluate((root,time)=>root.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time;}),time);
}
async function finish(p){
 await p.locator('.turn-overlay').evaluate(root=>root.getAnimations({subtree:true}).forEach(a=>a.finish()));
 await settle(p);
}
async function reset(p){await p.locator('#contents-button').click();await p.locator('#chapter-start').click();}
try{
 for(const width of [390,1440]){
  for(const theme of ['dark','light','warm']){
   const c=await browser.newContext({viewport:{width,height:width===390?844:1000}});
   const p=await c.newPage();const errors=[];let paginationCalls=0;
   p.on('pageerror',e=>errors.push(e.message));
   p.on('console',m=>{if(m.text().includes('[buildPages] 開始'))paginationCalls++;});
   await p.goto(base+'&theme='+theme);await p.waitForSelector('body[data-ready=true]');
   const initial=await position(p),n=Number(initial.split('/')[1]);
   const original=await p.locator('#book > .spread > .sheet').allTextContents();
   const callsBefore=paginationCalls;
   for(const direction of [1,-1]){
    const beforeTurn=await p.locator('#book > .spread > .sheet').allTextContents();
    await p.locator(direction>0?'#next':'#prev').click();
    const overlay=p.locator('.turn-overlay');
    assert.equal(await overlay.count(),1);
    assert.equal(await overlay.getAttribute('aria-hidden'),'true');
    assert.equal(await overlay.evaluate(e=>e.inert),true);
    assert.equal(await overlay.locator('[data-idx],[data-fn-id]').count(),0);
    const duration=await overlay.evaluate(e=>e.getAnimations({subtree:true})[0].effect.getTiming().duration);
    assert.equal(duration,480);
    // The moving sheet is old right -> target left, or old left -> target right.
    const front=await overlay.locator('.turn-front > .sheet').innerText();
    const back=width===1440?await overlay.locator('.turn-back > .sheet').innerText():null;
    if(width===1440){
     const target=await p.locator('#book > .spread > .sheet').allTextContents();
     const normalize=s=>s.replace(/\s+/g,'');
     assert.equal(normalize(front),normalize(beforeTurn[direction>0?1:0]));
     assert.equal(normalize(back),normalize(target[direction>0?0:1]));
    }
    await seek(p,240);
    const moving=await overlay.locator('.turn-leaf').evaluate(e=>({origin:getComputedStyle(e).transformOrigin,transform:getComputedStyle(e).transform,width:e.offsetWidth}));
    const matrix=moving.transform.match(/matrix3d\((.*)\)/)[1].split(',').map(Number);
    assert.ok(Math.abs(matrix[12])<.01,'Hinge must not translate horizontally');
    if(width===1440)assert.ok(direction>0?matrix[2]>0:matrix[2]<0,'Book leaf must rotate in the correct direction');
    if(theme==='warm')await p.screenshot({path:`${artifacts}/${width}-${direction>0?'forward':'back'}-turn.png`});
    await finish(p);
    assert.equal(await p.locator('.turn-overlay,.turn-stage,.turn-leaf').count(),0);
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   }
   assert.equal(await position(p),initial);
   assert.deepEqual(await p.locator('#book > .spread > .sheet').allTextContents(),original);
   assert.equal(paginationCalls,callsBefore,'Animation must not repaginate');
   // Native timing and repeated input: one active leaf, at most one queued action.
   await p.locator('#next').click();
   await p.locator('#next').evaluate(e=>{for(let i=0;i<12;i++)e.click();});
   assert.equal(await p.locator('.turn-overlay').count(),1);
   await p.waitForTimeout(1100);await settle(p);
   const rapidStart=Number((await position(p)).split(/[ —/]/)[0]);
   assert.equal(rapidStart,width===390?3:5);
   assert.equal(await p.locator('.turn-overlay').count(),0);
   await reset(p);await p.locator('#next').click();await p.locator('#prev').evaluate(e=>e.click());
   await p.waitForTimeout(1100);await settle(p);assert.equal(await position(p),initial);
   // Last / odd page remains stable; reverse can always leave the boundary.
   let count=0;
   while(!await p.locator('#next').isDisabled()&&count++<30){await p.locator('#next').click();await settle(p);}
   assert.ok(count<30);assert.ok((await position(p)).includes('/ '+n));
   const last=await position(p);await p.locator('#next').evaluate(e=>e.click());assert.equal(await position(p),last);
   if(width===1440&&n%2===1)assert.equal(await p.locator('#book > .spread > .sheet:nth-child(2)').getAttribute('aria-hidden'),'true');
   await p.locator('#prev').click();await settle(p);
   // Interrupt through settings / mode switch: no stale queued turn or leaked overlay.
   await reset(p);await p.locator('#next').click();await p.locator('#next').evaluate(e=>e.click());
   await p.locator('#settings-button').click();
   assert.equal(await p.locator('.turn-overlay').count(),0);
   await p.locator('button[data-mode=scroll]').click();await p.locator('button[data-mode=page]').click();
   await p.locator('[aria-label="關閉閱讀設定"]').click();
   await p.locator('#next').click();await settle(p);
   // Animation disabled / fade preference preserve page correctness.
   await reset(p);await p.locator('#settings-button').click();await p.locator('#motion').selectOption('none');await p.locator('[aria-label="關閉閱讀設定"]').click();
   await p.locator('#next').click();assert.equal(await p.locator('.turn-overlay').count(),0);
   await p.locator('#settings-button').click();await p.locator('#motion').selectOption('fade');await p.locator('[aria-label="關閉閱讀設定"]').click();
   await p.locator('#prev').click();assert.equal(await p.locator('.turn-overlay').evaluate(e=>e.getAnimations({subtree:true})[0].effect.getTiming().duration),180);await settle(p);
   assert.deepEqual(errors,[]);
   results.push({width,theme,duration:480,forwardBack:'pass',rapid:'pass',boundaries:'pass',interrupt:'pass',disabledFade:'pass',repagination:false});
   await c.close();
  }
 }
 // Reduced motion, absent animation API, absent 3D support all switch directly.
 for(const fallback of ['reduce','no-api','no-3d','no-css-api']){
  const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:fallback==='reduce'?'reduce':'no-preference'});
  if(fallback==='no-api')await c.addInitScript(()=>{Element.prototype.animate=undefined;});
  if(fallback==='no-3d')await c.addInitScript(()=>{const supports=CSS.supports.bind(CSS);CSS.supports=(...args)=>args[0]==='perspective'?false:supports(...args);});
  if(fallback==='no-css-api')await c.addInitScript(()=>{CSS.supports=undefined;});
  const p=await c.newPage();await p.goto(base);await p.waitForSelector('body[data-ready=true]');
  await p.locator('#next').click();assert.equal(await p.locator('.turn-overlay').count(),0);assert.match(await position(p),/^2 /);
  await p.locator('#prev').click();assert.match(await position(p),/^1 /);await c.close();
 }
 // Keyboard, touch, note clicks and selection retain their original behavior.
 const c=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),p=await c.newPage();
 await p.goto(base);await p.waitForSelector('body[data-ready=true]');
 await p.keyboard.press('ArrowRight');await settle(p);assert.match(await position(p),/^2 /);
 await p.keyboard.press('ArrowLeft');await settle(p);assert.match(await position(p),/^1 /);
 await p.locator('#book').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:300,clientY:400}]});
 await p.locator('#book').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:100,clientY:400}]});await settle(p);assert.match(await position(p),/^2 /);
 await p.locator('#book').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:100,clientY:400}]});
 await p.locator('#book').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:300,clientY:400}]});await settle(p);assert.match(await position(p),/^1 /);
 await p.locator('#book .fn-ref').click();assert.equal(await p.locator('#note').evaluate(d=>d.open),true);await p.keyboard.press('Escape');
 await p.locator('#book p').first().evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r);});
 await p.keyboard.press('ArrowRight');assert.match(await position(p),/^1 /);await p.evaluate(()=>getSelection().removeAllRanges());
 await p.locator('#next').click();await settle(p);await p.waitForTimeout(500);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:prototype-reading-study')));
 await p.reload();await p.waitForSelector('body[data-ready=true]');assert.equal(Number(await p.locator('#book > .spread [data-idx]').first().getAttribute('data-idx')),saved.block);
 await c.close();
 await fs.writeFile(`${artifacts}/results.json`,JSON.stringify({cases:results,fallbacks:'pass',keyboardTouch:'pass',notesSelection:'pass',progress:'pass'},null,2));
 console.log(`PASS: ${results.length} animation/theme/viewport cases; forward/back, single queued turn, odd boundary, mode interruption, fallbacks, keyboard/touch, notes/selection and progress.`);
}finally{await browser.close();}
