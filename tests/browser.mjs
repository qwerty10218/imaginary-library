import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const base='http://127.0.0.1:4173/imaginary-library/prototype.html';
await fs.mkdir('.local',{recursive:true});
const results=[];
try {
 for(const width of [360,375,390,430,1440]){
  const context=await browser.newContext({viewport:{width,height:width===1440?1000:844}});
  const p=await context.newPage();const errors=[],external=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173'))external.push(r.url());});
  for(const theme of ['dark','light','warm']){
   await p.goto(`${base}?mode=page&theme=${theme}`);await p.waitForSelector('body[data-ready=true]');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   const n=await p.locator('#position').innerText();assert.match(n,/\d+.*\/ \d+/);
   let count=0;
   do {
    const overflow=await p.locator('.page-content').evaluateAll(els=>els.map(e=>({body:e.querySelector('.book-page-body').getBoundingClientRect(),notes:e.querySelector('.page-footnotes')?.getBoundingClientRect(),box:e.getBoundingClientRect(),children:[...e.querySelector('.book-page-body').children].map(x=>x.getBoundingClientRect())})).filter(x=>x.children.some(c=>c.bottom>(x.notes?.top??x.box.bottom)+1)||x.children.some(c=>c.right>x.box.right+1)).length);
    assert.equal(overflow,0,`${width}/${theme}, page ${count}: content overlaps`);
    count++;
    if(await p.locator('#next').isDisabled())break;
    await p.locator('#next').click();await p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
   }while(count<30);
   assert.ok(count<30);
   results.push({width,theme,pagesViewed:count,overflow:false});
   // Return to start using the actual contents control.
   await p.locator('#contents-button').click();await p.locator('#chapter-start').click();
   await p.screenshot({path:`.local/${width}-${theme}.png`,fullPage:true});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  await context.close();
 }
 const c=await browser.newContext({viewport:{width:390,height:844}}),p=await c.newPage();
 await p.goto(base);await p.waitForSelector('body[data-ready=true]');assert.equal(await p.locator('body').getAttribute('data-mode'),'scroll');
 await p.locator('.fn-ref').first().click();assert.equal(await p.locator('#note').evaluate(d=>d.open),true);await p.keyboard.press('Escape');
 assert.equal(await p.locator('#note').evaluate(d=>d.open),false);
 await p.locator('#settings-button').click();await p.locator('button[data-mode=page]').click();await p.locator('[aria-label="關閉閱讀設定"]').click();
 await p.locator('#next').click();await p.waitForFunction(()=>!document.querySelector('.turn-overlay'));await p.waitForTimeout(550);
 const before=await p.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:prototype-reading-study')));
 await p.reload();await p.waitForSelector('body[data-ready=true]');
 const after=await p.locator('#book [data-idx]').first().getAttribute('data-idx');assert.equal(Number(after),before.block);
 await p.locator('#settings-button').click();await p.locator('#font-size').selectOption('24');await p.locator('button[data-mode=scroll]').click();await p.locator('[aria-label="關閉閱讀設定"]').click();
 assert.equal(await p.locator('body').getAttribute('data-mode'),'scroll');
 assert.ok(await p.locator(`#scroll-content [data-idx="${before.block}"]`).evaluate(e=>e.getBoundingClientRect().top<400));
 await p.locator('#settings-button').click();await p.locator('button[data-mode=page]').click();await p.locator('[aria-label="關閉閱讀設定"]').click();
 const selectionPage=await p.locator('#position').innerText();
 await p.locator('#book p').first().evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);const s=getSelection();s.removeAllRanges();s.addRange(range);});
 await p.keyboard.press('ArrowRight');assert.equal(await p.locator('#position').innerText(),selectionPage);
 await p.evaluate(()=>getSelection().removeAllRanges());
 // Capture the actual live animation at its midpoint, never alter site assets.
 await p.locator('#contents-button').click();await p.locator('#chapter-start').click();
 await p.locator('#next').click();await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=110;}));
 await p.screenshot({path:'.local/mobile-fold.png'});await p.evaluate(()=>document.getAnimations().forEach(a=>a.finish()));
 // Regression: short phone viewport, largest type and line-height, including annotated paragraphs.
 await p.setViewportSize({width:375,height:667});
 await p.locator('#settings-button').click();await p.locator('#line-height').selectOption('2.1');await p.locator('[aria-label="關閉閱讀設定"]').click();
 await p.locator('#contents-button').click();await p.locator('#chapter-start').click();
 let checked=0;
 do{
  const collisions=await p.locator('.page-content').evaluateAll(es=>es.filter(e=>[...e.querySelector('.book-page-body').children].some(x=>x.getBoundingClientRect().bottom>(e.querySelector('.page-footnotes')?.getBoundingClientRect().top??e.getBoundingClientRect().bottom)+1)).length);
  assert.equal(collisions,0,'Short viewport large-font footnote overlap');checked++;
  if(await p.locator('#next').isDisabled())break;
  await p.locator('#next').click();await p.waitForFunction(()=>!document.querySelector('.turn-overlay'));
 }while(checked<45);
 assert.ok(checked<45);
 const coreCheck=await p.evaluate(async()=>{
  const {createReaderCore}=await import('./js/reader/core.js');const core=createReaderCore();
  const md='前文'.repeat(80)+' **粗體文字** [連結](https://example.com) <sup class="fn-ref">〔1〕</sup>'+'後文'.repeat(80)+'\n\n<section class="footnotes"><p>〔1〕註釋內容。</p></section>';
  const model=core.parse(md);const source=document.createElement('div');source.innerHTML=model.bodyHtml;
  const pages=core.paginate(model,{availableH:250,availableW:260,fontVal:24,fsVal:'24px',isMobile:true});
  const joined=document.createElement('div');joined.innerHTML=pages.map(x=>x.bodyHtml).join('');
  // Compare exact rendered block text, excluding marked's inter-block formatting newline.
  const originalText=[...source.children].map(e=>e.textContent).join('');
  const result={sameText:originalText===joined.textContent,strong:!!joined.querySelector('strong'),link:!!joined.querySelector('a'),notes:joined.querySelectorAll('[data-fn-id]').length,pages:pages.length};
  const clean=core.parse('<img src=x onerror="alert(1)"><script>alert(1)</script>');result.sanitized=!/onerror|<script/i.test(clean.bodyHtml);core.dispose();return result;
 });
 assert.equal(coreCheck.sameText,true);assert.equal(coreCheck.strong,true);assert.equal(coreCheck.link,true);assert.equal(coreCheck.notes,1);assert.ok(coreCheck.pages>1);assert.equal(coreCheck.sanitized,true);
 await c.close();
 const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),r=await reduced.newPage();
 await r.goto(base+'?mode=page');await r.waitForSelector('body[data-ready=true]');await r.locator('#next').click();assert.equal(await r.locator('.turn-overlay').count(),0);await reduced.close();
 const blocked=await browser.newContext({viewport:{width:390,height:844}});
 await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});
 const b=await blocked.newPage();await b.goto(base+'?mode=page');await b.waitForSelector('body[data-ready=true]');await b.locator('#next').click();await b.waitForTimeout(550);assert.match(await b.locator('#storage-status').innerText(),/仍可繼續/);await blocked.close();
 await fs.writeFile('.local/browser-results.json',JSON.stringify({matrix:results,interaction:'pass',reducedMotion:'pass',blockedStorage:'pass',externalRequests:0},null,2));
 console.log(`PASS: ${results.length} viewport/theme cases; all demo pages; footnotes, modes, restore, selection, reduced motion, blocked storage; no external requests.`);
}finally{await browser.close();}
