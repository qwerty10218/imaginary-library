import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const phase=process.env.BOTTOM_PHASE||'after',out='.local/mobile-bottom';await fs.mkdir(out,{recursive:true});
const base='http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
const settle=async p=>{await p.locator('body[data-ready=true]').waitFor();await p.waitForTimeout(450);};
const geometry=p=>p.evaluate(()=>{
 const r=s=>{const e=document.querySelector(s),b=e.getBoundingClientRect();return {width:b.width,height:b.height,left:b.left,right:b.right,top:b.top,bottom:b.bottom};};
 return {book:r('#book'),body:r('#book .page-content'),dock:r('#reader-dock'),music:r('#music-panel'),aa:!document.querySelector('#floating-settings').hidden,header:r('.site-header'),overflow:document.documentElement.scrollWidth>innerWidth,scrollHeight:document.documentElement.scrollHeight,viewportHeight:innerHeight};
});
try{
 for(const [width,height] of [[375,667],[390,844],[430,932],[1440,900]]){
  const p=await browser.newPage({viewport:{width,height},hasTouch:width<600}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(size=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'page',size,line:1.9,theme:'dark',motion:'none',floating:'always'})),width<600?18:20);
  await p.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await settle(p);
  const collapsed=await geometry(p);
  await p.screenshot({path:`${out}/${phase}-page-${width}.png`});await p.locator('.site-header').screenshot({path:`${out}/${phase}-header-${width}.png`});
  await p.locator('#music-panel summary').click();await settle(p);const expanded=await geometry(p);
  await p.screenshot({path:`${out}/${phase}-expanded-${width}.png`});
  if(phase==='after'&&width<600){
   assert.equal(collapsed.aa,false);assert.equal(expanded.aa,false);
   assert.ok(Math.abs(collapsed.music.width-Math.min(width*.82,320))<.5);
   assert.ok(collapsed.music.left>=width*.05&&width-collapsed.music.right>=width*.05);
   for(const g of [collapsed,expanded]){
    assert.equal(g.dock.height,g.music.height,'no empty Aa row');assert.equal(g.overflow,false);
    assert.ok(g.book.bottom<=g.dock.top);assert.ok(g.scrollHeight<=height+1);
   }
  }
  if(phase==='after'){
   await p.locator('#music-play').click();await p.waitForFunction(()=>document.querySelector('#music-vinyl').classList.contains('is-playing'));
   await p.locator('#music-volume').fill('35');assert.equal(await p.locator('#music-audio').evaluate(e=>e.volume),.35);
   await p.waitForFunction(()=>document.querySelector('#music-audio').duration>0);await p.locator('#music-seek').fill('200');await p.waitForFunction(()=>document.querySelector('#music-audio').currentTime>1);
   await p.locator('#music-play').click();await p.waitForFunction(()=>!document.querySelector('#music-vinyl').classList.contains('is-playing'));
  }
  await p.locator('#music-panel summary').click();await settle(p);
  await p.locator('#settings-button').click();await p.locator('#settings[open]').waitFor();await p.locator('#settings .panel-head button').click();
  if(phase==='after'){
   await p.locator('#next').click();await p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
   await p.locator('[data-language-toggle]').click();assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');await p.locator('[data-language-toggle]').click();
   await p.locator('#prev').click();await p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
   await p.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await settle(p);
  }
  await p.locator('#settings-button').click();await p.locator('button[data-mode=scroll]').click();await p.locator('#settings .panel-head button').click();await settle(p);await p.evaluate(()=>scrollTo(0,0));
  await p.screenshot({path:`${out}/${phase}-scroll-${width}.png`});
  assert.equal(await p.locator('#floating-settings').isVisible(),true);
  if(phase==='after'){await p.locator('#scroll-content .fn-ref').first().click();await p.locator('#note[open]').waitFor();await p.locator('#note .panel-head button').click();}
  await p.goto(base+'reader.html?work=zhen-du-chuanyue&chapter=001');await settle(p);
  await p.locator('#settings-button').click();await p.locator('button[data-mode=page]').click();await p.locator('#settings .panel-head button').click();await settle(p);
  const noMusic=await geometry(p);
  if(phase==='after'&&width<600){assert.equal(noMusic.dock.height,0);assert.equal(noMusic.aa,false);}
  assert.deepEqual(errors,[]);results.push({width,height,collapsed,expanded,noMusic});await p.close();console.log('PASS bottom layout',phase,width);
 }
 await fs.writeFile(`${out}/${phase}.json`,JSON.stringify(results,null,2));
}finally{await browser.close();}
