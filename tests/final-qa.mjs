import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const out='.local/final-qa';await fs.mkdir(out,{recursive:true});
const results=[];const settle=p=>p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
const position=p=>p.locator('#position').innerText();
async function ready(p){await p.waitForSelector('body[data-ready=true]');}
async function select(p){await p.locator('#book p').first().evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r);});}
async function settings(p,id,value){await p.locator('#settings-button').click();await p.locator('#'+id).selectOption(value);await p.locator('#settings .panel-head button').click();}
try{
 for(const [width,height] of [[1920,1080],[1720,864],[1440,900],[390,844],[375,667]]){
  const c=await browser.newContext({viewport:{width,height},hasTouch:width<600});
  await c.addInitScript(()=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'page',motion:'fold',theme:'warm',font:'serif',size:20,line:1.9})));
  const p=await c.newPage(),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url())});
  await p.goto(base);await p.locator('.work-card').waitFor();
  const cover=p.locator('.work-cover').first();assert.ok((await cover.boundingBox()).y<height-60,'cover should appear above fold');await p.screenshot({path:`${out}/home-${width}.png`});
  await p.goto(base+'work.html?id=zhen-du-chuanyue');await p.locator('#work-action a').waitFor();assert.ok((await p.locator('#work-action').boundingBox()).y<height,'reading CTA above fold');await p.screenshot({path:`${out}/work-${width}.png`});
  await p.goto(base+'reader.html?work=zhen-du-chuanyue&chapter=002');await ready(p);
  const initial=await position(p);
  const paragraph=await p.locator('#book p').first().boundingBox();
  await p.mouse.move(paragraph.x+45,paragraph.y+12);await p.mouse.down();await p.mouse.move(paragraph.x+170,paragraph.y+12,{steps:8});await p.mouse.up();
  assert.ok(await p.evaluate(()=>getSelection().toString().length>0),'drag selection should work');assert.equal(await position(p),initial);
  await c.grantPermissions(['clipboard-read','clipboard-write']);await p.keyboard.press('Control+c');assert.ok((await p.evaluate(()=>navigator.clipboard.readText())).length>0,'copy should work');
  await select(p);assert.ok(await p.evaluate(()=>getSelection().toString().length>0));
  await p.keyboard.press('Shift+ArrowRight');assert.equal(await position(p),initial);
  await select(p);await p.locator('#book').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:300,clientY:300}]});await p.locator('#book').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:100,clientY:300}]});assert.equal(await position(p),initial);
  await p.locator('#next').click();await settle(p);assert.notEqual(await position(p),initial,'selected text must not block explicit button');
  await select(p);await p.keyboard.press('ArrowLeft');await settle(p);assert.equal(await position(p),initial,'selected text must not block keyboard');
  // Keep the cleanup watchdog out of the paused, manually sampled animation only.
  await p.evaluate(()=>{window.__nativeTimeout=window.setTimeout;window.setTimeout=(fn,ms,...args)=>window.__nativeTimeout(fn,ms===680?10000:ms,...args)});
  await p.locator('#next').evaluate(e=>e.click());
  await p.locator('.turn-overlay').evaluate(e=>e.getAnimations({subtree:true}).forEach(a=>a.pause()));
  for(const time of [0,120,240,360,480]){
   await p.locator('.turn-overlay').evaluate((e,t)=>e.getAnimations({subtree:true}).forEach(a=>a.currentTime=t),time===480?479.9:time);
   assert.equal(await p.locator('.turn-overlay').count(),1);
   const leaf=await p.locator('.turn-leaf').evaluate(e=>({transform:getComputedStyle(e).transform,duration:e.getAnimations()[0].effect.getTiming().duration}));assert.equal(leaf.duration,480);if(time===240)assert.match(leaf.transform,/matrix3d/);
   await p.screenshot({path:`${out}/fold-${width}-${time}.png`});
  }
  await p.locator('.turn-overlay').evaluate(e=>e.getAnimations({subtree:true}).forEach(a=>a.finish()));await settle(p);await p.evaluate(()=>{window.setTimeout=window.__nativeTimeout});
  await p.locator('#prev').click();await p.locator('#next').evaluate(e=>{for(let i=0;i<10;i++)e.click()});await p.waitForTimeout(1100);await settle(p);assert.equal(await p.locator('.turn-overlay').count(),0);
  await p.locator('#prev').click();await p.setViewportSize({width:width-2,height});await settle(p);await p.waitForTimeout(250);await p.setViewportSize({width,height});await p.waitForTimeout(250);
  const fonts=[];const client=await c.newCDPSession(p);await client.send('DOM.enable');await client.send('CSS.enable');
  async function font(label){const {root}=await client.send('DOM.getDocument');const {nodeId}=await client.send('DOM.querySelector',{nodeId:root.nodeId,selector:'#book .book-page-body p'});const data=await client.send('CSS.getPlatformFontsForNode',{nodeId});fonts.push({label,fonts:data.fonts});}
  await font('Traditional serif');const before=await p.locator('#book [data-idx]').first().getAttribute('data-idx');
  await p.locator('[data-language-toggle]').click();assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');assert.equal(await p.locator('#book [data-idx]').first().getAttribute('data-idx'),before);await font('Simplified serif');
  const check=await p.evaluate(async()=>{const l=await import('./js/language.js');return {name:l.convertText('乾隆'),html:l.convertHtml('<a id="乾隆" href="/乾隆">御花園</a><code>御花園</code>')};});assert.equal(check.name,'乾隆');assert.match(check.html,/id="乾隆" href="\/乾隆">御花园/);assert.match(check.html,/<code>御花園<\/code>/);
  await settings(p,'font-family','sans');await font('Simplified sans');await settings(p,'font-family','serif');
  await p.reload();await ready(p);assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');await p.locator('[data-language-toggle]').click();
  await settings(p,'motion','none');
  for(const chapter of ['001','002','003']){
   await p.goto(base+'reader.html?work=zhen-du-chuanyue&chapter='+chapter);await ready(p);
   let total;for(let i=0;i<80;i++){
    const scan=await p.evaluate(()=>{const pos=document.querySelector('#position').textContent;const nums=pos.match(/\d+/g).map(Number);const overflow=[...document.querySelectorAll('#book > .spread .page-content')].some(box=>{const end=box.querySelector('.page-footnotes')?.getBoundingClientRect().top??box.getBoundingClientRect().bottom;return [...box.querySelector('.book-page-body').children].some(e=>e.getBoundingClientRect().bottom>end+2)});return {pos,overflow,last:nums.at(-2)>=nums.at(-1),total:nums.at(-1)}});
    assert.equal(scan.overflow,false,`${width} chapter ${chapter} ${scan.pos} overflows`);total=scan.total;if(scan.last)break;assert.ok(i<79);await p.locator('#next').click();await settle(p);
   }
   assert.ok(await p.locator('#book').getByText('本章完',{exact:true}).isVisible());assert.equal(Number((await position(p)).match(/\d+/g).at(-1)),total);
   const link=p.locator('#book a').last();assert.match(await link.getAttribute('href'),chapter==='003'?/work.html/:new RegExp('chapter='+String(Number(chapter)+1).padStart(3,'0')));
   await p.screenshot({path:`${out}/end-${width}-${chapter}.png`});
  }
  await p.locator('#settings-button').click();await p.locator('button[data-mode=scroll]').click();await p.locator('#settings .panel-head button').click();assert.equal(await p.locator('#next').isVisible(),false);assert.ok((await p.locator('#scroll-content').innerText()).includes('本章完'));
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);results.push({width,height,fonts,selection:'pass',animation:'pass',chapters:'pass',language:'pass'});await c.close();console.log('PASS',width,height);
 }
 const c=await browser.newContext({reducedMotion:'reduce'});await c.addInitScript(()=>{localStorage.setItem('imaginary-library:v1:language','cn');const observer=new MutationObserver(()=>{if(document.querySelector('.reader-measure-rig')){window.measuredLanguage=document.documentElement.lang;observer.disconnect()}});observer.observe(document,{childList:true,subtree:true})});const p=await c.newPage();await p.goto(base+'reader.html?work=zhen-du-chuanyue&chapter=001');await ready(p);assert.equal(await p.evaluate(()=>window.measuredLanguage),'zh-CN');await p.locator('#next').click();assert.equal(await p.locator('.turn-overlay').count(),0);await c.close();
 await fs.writeFile(out+'/results.json',JSON.stringify(results,null,2));
}finally{await browser.close()}
