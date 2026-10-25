import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const results=[];
await fs.mkdir('.local/mvp',{recursive:true});
const chapterText=title=>`# ${title}\n\n`+Array.from({length:9},(_,i)=>`第 ${i+1} 段排版測試文字。這段文字只驗證換行、分頁、閱讀進度與章節跳轉，不包含小說劇情。`.repeat(3)+(i===2?' <sup class="fn-ref">〔1〕</sup>':'')).join('\n\n')+'\n\n<section class="footnotes"><p>〔1〕這是測試用註釋，不是正式小說內容。</p></section>';
const mockWorks=['test-one','test-two'].map((id,index)=>({id,title:`測試作品 ${index+1}`,author:'Gary Lee',description:'只用於瀏覽器驗證的佔位內容。',volume:'排版驗證',genres:['測試'],tags:[],status:'serializing',updatedAt:'2026-10-26',chapters:[{id:'chapter-one',title:'排版測試一',file:`content/${id}/chapter-one.md`},{id:'chapter-two',title:'排版測試二',file:`content/${id}/chapter-two.md`}]}));
try {
  for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:width===390?844:1000}});
    const page=await context.newPage(),errors=[],external=[],badResponses=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173'))external.push(r.url());});
    page.on('response',r=>{if(r.status()>=400)badResponses.push(`${r.status()} ${r.url()}`);});
    await page.goto(base);await page.locator('.work-card').waitFor();
    assert.equal(await page.locator('.work-card').count(),1);
    assert.deepEqual(await page.locator('.work-cover img').first().evaluate(img=>[img.naturalWidth,img.naturalHeight]),[1086,1448]);
    assert.equal(await page.locator('.continue-section').isVisible(),false);
    await page.screenshot({path:`.local/mvp/home-${width}.png`,fullPage:true});
    await page.locator('.work-card a').click();await page.waitForFunction(()=>Boolean(document.getElementById('work-title').textContent));
    assert.match(await page.locator('#work-title').innerText(),/朕都穿越了/);
    assert.deepEqual(await page.locator('#work-cover img').evaluate(img=>[img.naturalWidth,img.naturalHeight]),[1086,1448]);
    assert.match(await page.locator('#chapter-list').innerText(),/尚未上架/);
    assert.equal(await page.locator('#chapter-list a').count(),0);
    await page.screenshot({path:`.local/mvp/work-${width}.png`,fullPage:true});

    await page.route('**/data/works.json',route=>route.fulfill({json:{schemaVersion:1,works:mockWorks}}));
    await page.route('**/content/test-*/chapter-*.md',route=>route.fulfill({contentType:'text/plain; charset=utf-8',body:chapterText(route.request().url().includes('chapter-two')?'排版測試二':'排版測試一')}));
    await page.goto(`${base}reader.html?work=test-one&chapter=chapter-one`);await page.locator('body[data-ready=true]').waitFor();
    assert.equal(await page.locator('#reader-title').innerText(),'排版測試一');
    if(width===390){assert.equal(await page.locator('body').getAttribute('data-mode'),'scroll');await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('[aria-label="關閉閱讀設定"]').click();}
    assert.equal(await page.locator('body').getAttribute('data-mode'),'page');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.equal(await page.locator('.sheet').count(),width===390?1:2);
    await page.screenshot({path:`.local/mvp/reader-${width}.png`,fullPage:true});
    for(const theme of ['light','warm','dark']){
      await page.locator('#settings-button').click();await page.locator(`button[data-theme=${theme}]`).click();await page.locator('[aria-label="關閉閱讀設定"]').click();
      assert.equal(await page.locator('body').getAttribute('data-theme'),theme);
      const overflow=await page.locator('.page-content').evaluateAll(els=>els.some(el=>[...el.querySelector('.book-page-body').children].some(child=>child.getBoundingClientRect().bottom>(el.querySelector('.page-footnotes')?.getBoundingClientRect().top??el.getBoundingClientRect().bottom)+1)));
      assert.equal(overflow,false,`${width}/${theme} has a page collision`);
    }
    await page.locator('#next').click();await page.waitForFunction(()=>!document.querySelector('.turn-overlay'));
    // The next-page control crosses the last page into the next chapter.
    assert.equal(await page.locator('#next-chapter').isVisible(),true,`chapter link hidden: ${await page.locator('#reader-error').innerText()}`);
    await page.locator('#settings-button').click();await page.locator('#motion').selectOption('none');await page.locator('[aria-label="關閉閱讀設定"]').click();
    let pageTurns=0;
    while(pageTurns<30){
      const position=await page.locator('#position').innerText();
      const [,end,total]=position.match(/(?:\d+)(?: — (\d+))? \/ (\d+)/) || [];
      const last=Number(end||position.match(/^\d+/)?.[0]);
      if(last>=Number(total))break;
      await page.locator('#next').click();pageTurns++;
    }
    assert.ok(pageTurns<30,'chapter must have a finite final page');
    await page.locator('#next').click();await page.waitForURL('**chapter=chapter-two');await page.locator('body[data-ready=true]').waitFor();
    assert.equal(await page.locator('#reader-title').innerText(),'排版測試二');
    const position=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:test-one')));
    assert.equal(position.chapterId,'chapter-two');
    assert.equal(position.block,0);
    await page.reload();await page.locator('body[data-ready=true]').waitFor();
    assert.equal(await page.locator('#reader-title').innerText(),'排版測試二');
    await page.locator('#contents-button').click();assert.equal(await page.locator('#contents-chapters a').count(),2);
    await page.locator('[aria-label="關閉目錄"]').click();
    await page.locator('#settings-button').click();await page.locator('button[data-mode=scroll]').click();await page.locator('[aria-label="關閉閱讀設定"]').click();
    await page.locator('.fn-ref').first().click();assert.equal(await page.locator('#note').evaluate(d=>d.open),true);await page.keyboard.press('Escape');
    await page.goto(`${base}reader.html?work=test-two&chapter=chapter-one`);await page.locator('body[data-ready=true]').waitFor();
    await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('[aria-label="關閉閱讀設定"]').click();
    await page.locator('#next').click();await page.waitForFunction(()=>!document.querySelector('.turn-overlay'));await page.waitForTimeout(550);
    const other=await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:test-two')));
    assert.equal(other.chapterId,'chapter-one');
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('imaginary-library:v1:progress:test-one')).chapterId),'chapter-two');
    await page.goto(base);await page.locator('.continue-item').first().waitFor();assert.equal(await page.locator('.continue-item').count(),2);
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(badResponses,[]);
    results.push({width,chapterNavigation:true,independentProgress:true,errors});
    await context.close();
  }
  await fs.writeFile('.local/mvp/results.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results));
}finally{await browser.close();}
