import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const out='.local/ux';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'});
const results=[];
const ready=p=>p.locator('body[data-ready=true]').waitFor();
const closeSettings=p=>p.locator('#settings .panel-head button').click();
async function mode(p,value){await p.locator('#settings-button').click();await p.locator(`button[data-mode=${value}]`).click();await closeSettings(p);}
const noOverflow=async p=>assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
try{
 for(const width of [375,390,430,1440]){
  const height=width===375?667:900;
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<600});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(base);await page.locator('.work-card').first().waitFor();
  assert.equal(await page.locator('#continue-section').isVisible(),false);
  const home=await page.evaluate(()=>({title:getComputedStyle(document.querySelector('.library-hero h1')).fontSize,collectionY:document.querySelector('.collection-head').getBoundingClientRect().top,firstWorkY:document.querySelector('.work-card').getBoundingClientRect().top}));
  assert.ok(home.firstWorkY<height-80);assert.ok(parseFloat(home.title)<=(width<600?44:68));
  await page.locator('.work-cover img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  await page.screenshot({path:`${out}/after-home-${width}.png`,fullPage:true});await noOverflow(page);
  await page.locator('[data-category=youth]').click();assert.equal(await page.locator('.work-card:visible').count(),1);assert.match(await page.locator('.work-card:visible').innerText(),/台南少年追風記/);
  const details=page.locator('.work-card:visible details');
  if(!await details.getAttribute('open').then(v=>v!==null))await details.locator('.work-details-toggle').click();
  await details.locator('.work-teaser').waitFor({state:'visible'});
  await details.locator('.work-details-toggle').click();assert.equal(await details.locator('.work-teaser').isVisible(),false);
  await page.locator('[data-category=history]').click();assert.equal(await page.locator('.work-card:visible').count(),1);
  await page.locator('[data-category=travel]').click();assert.equal(await page.locator('.work-card:visible').count(),2);
  await page.locator('[data-category=all]').click();assert.equal(await page.locator('.work-card:visible').count(),3);
  const saved=await page.evaluate(()=>{
   const ids=['jiao-wo-shen-zong','tainan-youth-wind','zhen-du-chuanyue'];
   ids.forEach((id,i)=>localStorage.setItem('imaginary-library:v1:progress:'+id,JSON.stringify({schemaVersion:1,chapterId:i===1?'ep02':'001',block:3,offset:2,percentage:.25,updatedAt:`2026-10-${24+i}T00:00:00Z`})));
   return ids.map(id=>localStorage.getItem('imaginary-library:v1:progress:'+id));
  });
  await page.reload();await page.locator('#continue-list a').waitFor();assert.match(await page.locator('#continue-list').innerText(),/朕都穿越了/);assert.equal(await page.locator('.continue-item:visible').count(),1);
  await page.locator('#continue-more summary').click();assert.equal(await page.locator('.continue-item:visible').count(),3);await page.locator('#continue-more summary').click();assert.equal(await page.locator('.continue-item:visible').count(),1);
  assert.deepEqual(await page.evaluate(()=>['jiao-wo-shen-zong','tainan-youth-wind','zhen-du-chuanyue'].map(id=>localStorage.getItem('imaginary-library:v1:progress:'+id))),saved);
  await page.screenshot({path:`${out}/after-continue-${width}.png`,fullPage:true});
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await ready(page);await mode(page,'scroll');
  const hr=page.locator('#scroll-content hr').first();
  assert.match(await hr.evaluate(e=>e.previousElementSibling.textContent),/真的是北七/);
  assert.match(await hr.evaluate(e=>e.nextElementSibling.textContent),/等嘉豪終於打完/);
  const themes=[];
  for(const theme of ['dark','light','warm']){
   await page.locator('#settings-button').click();await page.locator(`button[data-theme=${theme}]`).click();await closeSettings(page);
   const style=await hr.evaluate(e=>({style:getComputedStyle(e).borderTopStyle,width:getComputedStyle(e).borderTopWidth,color:getComputedStyle(e).borderTopColor}));
   assert.equal(style.style,'dashed');assert.equal(style.width,'1px');themes.push({theme,...style});
   await hr.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/after-scene-${width}-${theme}.png`});
  }
  await page.evaluate(()=>scrollTo(0,1800));await page.waitForTimeout(550);
  assert.ok(await page.locator('#floating-settings').isVisible());
  const tools=await page.evaluate(()=>{const a=document.querySelector('#floating-settings').getBoundingClientRect(),m=document.querySelector('#music-panel').getBoundingClientRect();return {overlap:a.left<m.right&&a.right>m.left&&a.top<m.bottom&&a.bottom>m.top,bottom:a.bottom,height:innerHeight};});assert.equal(tools.overlap,false);assert.ok(tools.bottom<=tools.height-9);
  await page.locator('#floating-settings').click();await page.locator('#font-size').selectOption('22');await closeSettings(page);assert.equal(await page.locator('#scroll-content').evaluate(e=>getComputedStyle(e).fontSize),'22px');assert.ok(await page.evaluate(()=>scrollY>500));
  await page.locator('#floating-settings').click();await page.locator('#floating-controls').selectOption('auto');await closeSettings(page);
  await page.evaluate(()=>scrollBy(0,500));await page.waitForTimeout(100);assert.equal(await page.locator('#floating-settings').isVisible(),false);
  await page.evaluate(()=>scrollBy(0,-200));await page.waitForTimeout(100);assert.equal(await page.locator('#floating-settings').isVisible(),true);
  await page.locator('#floating-settings').click();await page.locator('#floating-controls').selectOption('hidden');await closeSettings(page);assert.equal(await page.locator('#floating-settings').isVisible(),false);
  await page.reload();await ready(page);assert.equal(await page.locator('#floating-settings').isVisible(),false);
  await page.locator('#settings-button').click();assert.equal(await page.locator('#floating-controls').inputValue(),'hidden');await page.locator('#floating-controls').selectOption('always');await page.locator('#font-size').selectOption('20');await closeSettings(page);
  await page.locator('#scroll-content .fn-ref').first().click();await page.locator('#note[open]').waitFor();await page.locator('#note .panel-head button').click();assert.equal(await page.locator('#note').isVisible(),false);
  await page.locator('#music-panel summary').click();await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.waitForFunction(()=>/播放中.*夏夜晚風/.test(document.querySelector('#music-summary').textContent));
  assert.match(await page.locator('#music-summary').innerText(),/播放中.*夏夜晚風/);
  await page.locator('#music-panel[open]').waitFor();
  await page.locator('#music-panel summary').click();
  await page.locator('#music-panel:not([open])').waitFor();
  await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(1).click();await page.waitForURL(/chapter=ep02/);assert.match(await page.locator('#music-chapter-song').textContent(),/五月天.*擁抱/);assert.match(await page.locator('#music-summary').innerText(),/夏夜晚風/);assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),false);
  await page.locator('#music-panel summary').click();await page.locator('#music-play').click();
  await mode(page,'page');await page.waitForTimeout(300);
  for(const chapter of ['ep01','ep02','ep03']){
   await page.goto(base+`reader.html?work=tainan-youth-wind&chapter=${chapter}`);await ready(page);await page.waitForTimeout(200);
   await page.locator('#settings-button').click();await page.locator('#motion').selectOption('none');await closeSettings(page);
   let seenHr=0,previousPage=0;
   const maximumTurns=Number((await page.locator('#position').innerText()).match(/\d+/g).at(-1))+1;
   for(let n=0;n<maximumTurns;n++){
    const scan=await page.evaluate(()=>{const sheets=[...document.querySelectorAll('#book > .spread .sheet:not([aria-hidden="true"])')];const nums=document.querySelector('#position').textContent.match(/\d+/g).map(Number);return {overflow:sheets.some(s=>{const c=s.querySelector('.page-content'),end=s.querySelector('.page-footnotes')?.getBoundingClientRect().top??c.getBoundingClientRect().bottom;return [...s.querySelector('.book-page-body').children].some(e=>e.getBoundingClientRect().bottom>end+2);}),hr:document.querySelectorAll('#book > .spread hr').length,last:nums.at(-2)>=nums.at(-1)};});
    assert.equal(scan.overflow,false,`${width} ${chapter} overflow`);seenHr+=scan.hr;if(scan.last)break;
    const currentPage=Number((await page.locator('#position').innerText()).match(/\d+/)[0]);
    assert.ok(currentPage>previousPage,`${width} ${chapter} pagination must advance`);previousPage=currentPage;
    assert.ok(n<maximumTurns-1,`${width} ${chapter} did not reach its final page`);await page.locator('#next').click();
   }
   assert.ok(seenHr>0,'scene breaks must survive pagination');
  }
  // Expanded music must resize the page book, never cover its text.
  await page.locator('#music-panel summary').click();await page.waitForTimeout(400);
  assert.ok(await page.evaluate(()=>document.querySelector('#book').getBoundingClientRect().bottom<=document.querySelector('#reader-dock').getBoundingClientRect().top));
  await page.screenshot({path:`${out}/after-player-${width}.png`});
  await page.locator('#music-panel summary').click();await noOverflow(page);
  for(const [id,chapter] of [['zhen-du-chuanyue','002'],['jiao-wo-shen-zong','001']]){await page.goto(base+`reader.html?work=${id}&chapter=${chapter}`);await ready(page);assert.equal(await page.locator('#reader-error').innerText(),'');assert.ok(await page.locator('#book p').count()>0);}
  assert.deepEqual(errors,[]);results.push({width,height,home,themes,flows:'passed'});await context.close();console.log('PASS UX',width,height);
 }
 await fs.writeFile(out+'/results.json',JSON.stringify(results,null,2));
}finally{await browser.close();}
