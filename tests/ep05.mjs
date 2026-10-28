import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base=process.env.TEST_BASE||'http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];await fs.mkdir('.local/ep05',{recursive:true});
async function scanPages(page){
 await page.locator('#settings-button').click();await page.locator('#motion').selectOption('none');await page.locator('#settings .panel-head button').click();
 for(let turn=0;turn<150;turn++){
  const ref=page.locator('.sheet:not([aria-hidden="true"]) .fn-ref').first();
  if(await ref.count()){
   const marker=await ref.innerText();await ref.click();assert.ok((await page.locator('#note-text').innerText()).startsWith(marker));
   await page.locator('#note .panel-head button').click();assert.equal(await ref.evaluate(el=>document.activeElement===el),true);
  }
  const result=await page.evaluate(()=>{
   const sheets=[...document.querySelectorAll('.sheet:not([aria-hidden="true"])')];
   const overflow=sheets.some(sheet=>{const content=sheet.querySelector('.page-content'),body=sheet.querySelector('.book-page-body'),notes=sheet.querySelector('.page-footnotes');return [...body.children].some(child=>child.getBoundingClientRect().bottom>(notes?.getBoundingClientRect().top??content.getBoundingClientRect().bottom)+2);});
   const position=document.querySelector('#position').textContent;
   const match=position.match(/^(\d+)(?: — (\d+))? \/ (\d+)$/);
   return {nonempty:sheets.every(sheet=>sheet.querySelector('.book-page-body').textContent.trim()),overflow,last:match&&Number(match[2]||match[1])>=Number(match[3])};
  });
  assert.ok(result.nonempty,'published page is empty');assert.equal(result.overflow,false,'published page overflows');
  if(result.last)return;
  await page.locator('#next').click();
 }
 throw Error('Published chapter has too many or nonterminating pages');
}
try{
 for(const width of [375,390,430,1440]){
  const context=await browser.newContext({viewport:{width,height:width===375?667:width===430?932:900}});
  await context.addInitScript(()=>{
   if(!localStorage.getItem('imaginary-library:v1:reader:settings'))localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({mode:'scroll',size:18,line:1.9,motion:'none',theme:'dark'}));
   if(!localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind'))localStorage.setItem('imaginary-library:v1:progress:tainan-youth-wind',JSON.stringify({schemaVersion:1,chapterId:'ep04',block:2,offset:0,percentage:.1,updatedAt:new Date().toISOString()}));
  });
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'work.html?id=tainan-youth-wind');
  await page.locator('#chapter-list a').last().waitFor();
  assert.equal(await page.locator('#chapter-list a').count(),5);
  assert.match(await page.locator('#chapter-list a').last().getAttribute('href'),/chapter=ep05/);
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep04');
  await page.locator('body[data-ready=true]').waitFor();
  assert.match(await page.locator('#next-chapter').getAttribute('href'),/chapter=ep05/);
  await page.locator('#music-panel summary').click();await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.locator('#next-chapter').click();await page.waitForURL(/chapter=ep05/);
  assert.match(await page.locator('#music-chapter-song').innerText(),/夢醒時分/);
  assert.match(await page.locator('#music-summary').innerText(),/30CM/);
  assert.equal(await page.locator('#music-audio').evaluate(a=>a.paused),false);
  assert.equal(await page.locator('#next-chapter').evaluate(e=>e.hidden),true);
  assert.match(await page.locator('#previous-chapter').getAttribute('href'),/chapter=ep04/);
  const text=await page.locator('#scroll-content').innerText();
  for(const term of ['高雄巨蛋','嘉豪 & China Blue','明天誰有早八','樹枝孤鳥','你是我的花朵'])assert.ok(text.includes(term));
  assert.equal(await page.locator('#scroll-content .fn-ref').count(),10);
  const notes=JSON.parse(await fs.readFile('content/works/tainan-youth-wind/notes.json','utf8')).ep05;
  assert.deepEqual(await page.locator('#scroll-content .fn-ref').evaluateAll(refs=>refs.map(r=>r.dataset.fnId)),Object.keys(notes));
  for(const [id,note] of Object.entries(notes)){
   const ref=page.locator('#scroll-content .fn-ref').filter({hasText:'〔'+id+'〕'});
   await ref.click();if(id==='10')await page.screenshot({path:`.local/ep05/notes-${width}.png`});assert.equal(await page.locator('#note-text').innerText(),'〔'+id+'〕 '+note.term+'：'+note.explanation);
   await page.locator('#note .panel-head button').click();assert.equal(await page.locator('#note').evaluate(el=>el.open),false);
   assert.equal(await ref.evaluate(el=>document.activeElement===el),true);
  }
  await page.evaluate(()=>scrollTo(0,0));
  if(!await page.locator('#music-panel').evaluate(e=>e.open))await page.locator('#music-panel summary').click();
  await page.locator('#music-switch').click();await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused&&document.querySelector('#music-audio').duration>0);
  const duration=await page.locator('#music-audio').evaluate(a=>a.duration);assert.ok(duration>60);
  await page.locator('#music-volume').fill('40');assert.equal(await page.locator('#music-audio').evaluate(a=>a.volume),.4);
  await page.locator('#music-seek').fill('500');await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>30);
  await page.locator('#music-play').click();await page.waitForFunction(()=>document.querySelector('#music-audio').paused);
  await page.locator('#music-panel summary').click();
  await page.locator('[data-language-toggle]').click();assert.match(await page.locator('#scroll-content').innerText(),/梦醒时分/);
  await page.locator('#scroll-content .fn-ref').last().click();assert.match(await page.locator('#note-text').innerText(),/早上八点开始的课/);await page.locator('#note .panel-head button').click();
  await page.locator('[data-language-toggle]').click();
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);
  await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
  await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#next').click();await page.locator('#next').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind'))?.block>0);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind')));
  assert.equal(saved.chapterId,'ep05');assert.ok(saved.block>0);
  const position=await page.locator('#position').innerText();
  await page.reload();await page.locator('body[data-ready=true]').waitFor();
  assert.equal(await page.locator('#position').innerText(),position);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:tainan-youth-wind')).chapterId),'ep05');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await scanPages(page);
  await page.screenshot({path:`.local/ep05/reader-${width}.png`});assert.deepEqual(errors,[]);
  results.push({width,duration,notes:10,chapterNavigation:true,crossChapterMusic:true,progressRestored:true});
  await context.close();console.log('PASS EP.05',width,duration);
 }
 await fs.writeFile('.local/ep05/browser-results.json',JSON.stringify(results,null,2));
}finally{await browser.close();}
