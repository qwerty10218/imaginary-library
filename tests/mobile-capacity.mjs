import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const phase=process.env.CAPACITY_PHASE||'after';
const fontSize=Number(process.env.CAPACITY_FONT||18);
const out='.local/mobile-capacity';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'});
const base='http://127.0.0.1:4173/imaginary-library/';
const results=[];
const settle=async page=>{await page.locator('body[data-ready=true]').waitFor();await page.waitForTimeout(220);};
const numbers=async page=>(await page.locator('#position').innerText()).match(/\d+/g).map(Number);
try{
 for(const [width,height] of [[375,667],[390,844],[430,932]])for(const theme of ['dark','light']){
  const page=await browser.newPage({viewport:{width,height},hasTouch:true});
  await page.addInitScript(({theme,fontSize})=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'page',size:fontSize,line:1.9,theme,motion:'none',font:'serif',floating:'always'})),{theme,fontSize});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await settle(page);
  const expected=await page.evaluate(async()=>{
   const {createReaderCore}=await import('./js/reader/core.js');
   const model=createReaderCore().parse(await (await fetch('./content/tainan-youth-wind/ep01.md')).text());
   const div=document.createElement('div');div.innerHTML=model.bodyHtml;
   return {blocks:[...div.querySelectorAll('[data-idx]')].map(e=>({id:e.dataset.idx,text:e.textContent})),hrs:div.querySelectorAll('hr').length,notes:model.footnotes.length};
  });
  const initial=await page.evaluate(()=>{
   const rect=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {width:r.width,height:r.height,top:r.top,bottom:r.bottom};};
   return {viewport:{width:innerWidth,height:innerHeight,visualHeight:visualViewport?.height},book:rect('#book'),body:rect('.page-content'),running:rect('.page-running'),footer:rect('.page-number'),nav:rect('.reading-navigation'),dock:rect('#reader-dock'),font:getComputedStyle(document.querySelector('.book-page-body')).fontSize,line:getComputedStyle(document.querySelector('.book-page-body')).lineHeight};
  });
  assert.equal(initial.font,`${fontSize}px`);assert.ok(Math.abs(parseFloat(initial.line)-fontSize*1.9)<.01);
  const total=(await numbers(page)).at(-1),texts=new Map(),counts=[],samples={};let hrs=0;const notes=new Set();
  for(let index=1;index<=total;index++){
   assert.equal((await numbers(page))[0],index,'page must advance exactly once');
   const scan=await page.evaluate(()=>{
    const body=document.querySelector('#book > .spread .book-page-body'),box=body.parentElement;
    const note=box.querySelector('.page-footnotes'),end=note?.getBoundingClientRect().top??box.getBoundingClientRect().bottom;
    return {blocks:[...body.querySelectorAll('[data-idx]')].map(e=>({id:e.dataset.idx,start:Number(e.dataset.start||0),text:e.textContent})),hrs:body.querySelectorAll('hr').length,notes:[...body.querySelectorAll('[data-fn-id]')].map(e=>e.dataset.fnId),heading:!!body.querySelector('h1'),overflow:[...body.children].some(e=>e.getBoundingClientRect().bottom>end+2)||(note&&note.getBoundingClientRect().bottom>box.getBoundingClientRect().bottom+2),viewportOverflow:document.documentElement.scrollWidth>innerWidth};
   });
   assert.equal(!!scan.overflow,false,`${width} ${theme} page ${index} clips`);assert.equal(scan.viewportOverflow,false);
   for(const block of scan.blocks){
    const seen=texts.get(block.id)||'';assert.equal(block.start,seen.length,`gap or duplicate in block ${block.id}`);
    texts.set(block.id,seen+block.text);
   }
   counts.push(scan.blocks.reduce((n,b)=>n+[...b.text.replace(/\s/g,'')].length,0));
   hrs+=scan.hrs;scan.notes.forEach(id=>notes.add(id));
   for(const [name,condition] of [['first',index===1],['body',!scan.heading&&!scan.notes.length&&scan.blocks.length>0],['notes',scan.notes.length>0],['scene',scan.hrs>0]]){
    if(condition&&!samples[name]){samples[name]={page:index,characters:counts.at(-1)};await page.screenshot({path:`${out}/${phase}-${width}-${theme}-${name}.png`});}
   }
   if(index<total)await page.locator('#next').click();
  }
  for(const block of expected.blocks)assert.equal(texts.get(block.id),block.text,`lost or repeated text ${block.id}`);
  assert.equal(texts.size,expected.blocks.length);assert.equal(hrs,expected.hrs);assert.equal(notes.size,expected.notes);
  assert.deepEqual(errors,[]);
  results.push({width,height,theme,font:fontSize,line:1.9,total,initial,totalCharacters:counts.reduce((a,b)=>a+b,0),meanCharacters:counts.reduce((a,b)=>a+b,0)/total,samples,footnotes:notes.size,sceneBreaks:hrs,allTextVerified:true});
  await page.close();console.log('PASS capacity',phase,width,theme,total);
 }
 for(const theme of ['dark','light']){
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.addInitScript(theme=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'page',size:20,line:1.9,theme,motion:'none'})),theme);
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await settle(page);
  await page.screenshot({path:`${out}/${phase}-desktop-${theme}.png`});await page.close();
 }
 await fs.writeFile(`${out}/${phase}.json`,JSON.stringify(results,null,2));
}finally{await browser.close();}
