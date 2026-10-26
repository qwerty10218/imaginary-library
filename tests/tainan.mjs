import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173/imaginary-library/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
await fs.mkdir('.local/tainan',{recursive:true});
try {
 const works=JSON.parse(await fs.readFile('dist/data/works.json','utf8')).works;
 assert.equal(works.length,3);
 assert.deepEqual(works.find(work=>work.id==='tainan-youth-wind').chapters.map(chapter=>chapter.songId),['summer-night-wind','embrace','anping-light']);
 for(const [id,title] of [['ep01','夏夜晚風'],['ep02','擁抱'],['ep03','安平之光']]){
  const markdown=await fs.readFile(`dist/content/tainan-youth-wind/${id}.md`,'utf8');
  assert.ok(markdown.startsWith(`# ${id.replace('ep','EP.')}｜${title}\n\n`));
  assert.doesNotMatch(markdown,/> 延伸聆聽：/);
  assert.ok(markdown.lastIndexOf('## 延伸聆聽')>markdown.indexOf('<sup class="fn-ref">'));
  assert.ok(markdown.lastIndexOf('## 延伸聆聽')<markdown.indexOf('<section class="footnotes">'));
 }
 const files=await fs.readdir('dist',{recursive:true});
 assert.deepEqual(files.filter(file=>/\.mp3$/i.test(file)).map(file=>file.split(/[\\/]/).at(-1)).sort(),['anping-light.mp3','embrace.mp3','summer-night-wind.mp3']);
 for(const [width,height] of [[1440,900],[390,844]]){
  const context=await browser.newContext({viewport:{width,height}});
  await context.addInitScript(()=>localStorage.setItem('imaginary-library:v1:reader:settings',JSON.stringify({theme:'warm',mode:'page',size:20,line:1.9,font:'serif',motion:'none'})));
  const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base);
  const cover=page.locator('a[href="work.html?id=tainan-youth-wind"] img');
  assert.ok(await cover.evaluate(async img=>{await img.decode();return img.naturalWidth>0&&img.naturalHeight>0&&getComputedStyle(img).objectFit==='contain';}));
  await page.screenshot({path:`.local/tainan/home-publish-${width}.png`,fullPage:true});
  await page.locator('a[href="work.html?id=tainan-youth-wind"]').first().click();
  await page.locator('#work-description').getByText(/失戀怎麼辦？去漁光島吹風啊！/).waitFor();
  assert.match(await page.locator('#work-description').innerText(),/失戀怎麼辦？去漁光島吹風啊！/);
  assert.ok(await page.locator('#work-cover img').evaluate(async img=>{await img.decode();return img.naturalWidth>0&&img.naturalHeight>0;}));
  await page.screenshot({path:`.local/tainan/work-publish-${width}.png`,fullPage:true});
  await page.locator('a[href*="chapter=ep01"]').first().click();
  await page.locator('body[data-ready=true]').waitFor();
  for(let turn=0;turn<5&&await page.locator('.fn-ref').count()===0;turn++)await page.locator('#next').click();
  assert.ok(await page.locator('.fn-ref').count()>0,'page mode has no clickable note');
  await page.locator('.fn-ref').first().click();
  assert.match(await page.locator('#note-text').innerText(),/北七/);
  await page.locator('#note .panel-head button').click();
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,bookHeight:document.querySelector('#book').getBoundingClientRect().height}));
  assert.equal(layout.overflow,false);assert.ok(layout.bookHeight>400);
  await page.locator('#music-panel summary').click();
  assert.match(await page.locator('#music-chapter-song').innerText(),/伍佰.*夏夜晚風/);
  await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.locator('#music-panel[open]').waitFor();
  await page.locator('#music-panel summary').click();
  await page.locator('#music-panel:not([open])').waitFor();
  await page.locator('#music-panel summary').click();
  assert.equal(await page.locator('#music-vinyl').evaluate(el=>el.classList.contains('is-playing')),true);
  assert.equal(await page.locator('#music-needle').evaluate(el=>el.classList.contains('needle-on')),true);
  const before=await page.locator('#music-audio').evaluate(el=>el.currentTime);
  await page.locator('#music-volume').fill('35');
  assert.equal(await page.locator('#music-audio').evaluate(el=>el.volume),.35);
  await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(1).click();
  await page.waitForURL(/chapter=ep02/);
  assert.match(await page.locator('#music-chapter-song').innerText(),/五月天.*擁抱/);
  assert.match(await page.locator('#music-summary').innerText(),/伍佰.*夏夜晚風/);
  assert.equal(await page.locator('#music-audio').evaluate(el=>el.paused),false);
  assert.ok(await page.locator('#music-audio').evaluate(el=>el.currentTime)>=before);
  await page.locator('#music-switch').click();await page.locator('#music-play').click();
  await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  await page.locator('#music-panel[open]').waitFor();
  await page.locator('#music-panel summary').click();
  await page.locator('#music-panel:not([open])').waitFor();
  await page.locator('#music-panel summary').click();
  await page.waitForFunction(()=>document.querySelector('#music-audio').duration>0);
  await page.locator('#music-seek').fill('200');
  await page.waitForFunction(()=>document.querySelector('#music-audio').currentTime>1);
  await page.locator('#music-play').click();
  await page.waitForFunction(()=>document.querySelector('#music-audio').paused);
  await page.waitForFunction(()=>!document.querySelector('#music-vinyl').classList.contains('is-playing'));
  assert.equal(await page.locator('#music-needle').evaluate(el=>el.classList.contains('needle-on')),false);
  assert.equal(await page.locator('#music-vinyl').evaluate(el=>el.classList.contains('is-playing')),false);
  for(const [index,id,artist,title,count] of [[0,'ep01','伍佰','夏夜晚風',11],[1,'ep02','五月天','擁抱',10],[2,'ep03','海豚刑警','安平之光',5]]){
   await page.locator('#contents-button').click();await page.locator('#contents-chapters a').nth(index).click();await page.waitForURL(new RegExp(`chapter=${id}`));
   assert.match(await page.locator('#music-chapter-song').innerText(),new RegExp(`${artist}.*${title}`));
   if(id==='ep03'){
    await page.locator('#music-switch').click();await page.locator('#music-play').click();
    await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
    assert.match(await page.locator('#music-audio').getAttribute('src'),/anping-light\.mp3$/);
    await page.locator('#music-panel[open]').waitFor();
  await page.locator('#music-panel summary').click();
  await page.locator('#music-panel:not([open])').waitFor();
   }
   await page.locator('#settings-button').click();await page.locator('button[data-mode=scroll]').click();await page.locator('#settings .panel-head button').click();
   assert.equal(await page.locator('#scroll-content h1').innerText(),`${id.replace('ep','EP.')}｜${title}`);
   assert.equal(await page.locator('#scroll-content blockquote').count(),0);
   assert.equal(await page.locator('#scroll-content > h2').last().innerText(),'延伸聆聽');
   assert.match(await page.locator('#scroll-content > h2').last().locator('xpath=following-sibling::p[1]').innerText(),new RegExp(`${artist}.*${title}`));
   assert.equal(await page.locator('#scroll-content > h2').last().evaluate(el=>el.previousElementSibling?.classList.contains('chapter-endnotes')),true);
   assert.equal(await page.locator('#scroll-content .fn-ref').count(),count);
   await page.locator('#scroll-content .fn-ref').first().click();assert.ok((await page.locator('#note-text').innerText()).length>10);await page.locator('#note .panel-head button').click();
   await page.locator('#settings-button').click();await page.locator('button[data-mode=page]').click();await page.locator('#settings .panel-head button').click();
   // An expanded dock leaves less page height; derive the bound from pagination.
   const maximumTurns=Number((await page.locator('#position').innerText()).match(/\d+/g).at(-1))+1;
   let previousPage=0;
   for(let turn=0;turn<maximumTurns;turn++){
    const spread=await page.evaluate(()=>{
     const sheets=[...document.querySelectorAll('.sheet:not([aria-hidden="true"])')];
     const overflow=sheets.some(sheet=>{const body=sheet.querySelector('.book-page-body'),notes=sheet.querySelector('.page-footnotes'),content=sheet.querySelector('.page-content');return [...body.children].some(child=>child.getBoundingClientRect().bottom>(notes?.getBoundingClientRect().top??content.getBoundingClientRect().bottom)+2);});
     const match=document.querySelector('#position').textContent.match(/^(\d+)(?: — (\d+))? \/ (\d+)$/);
     return {empty:sheets.some(sheet=>!sheet.querySelector('.book-page-body').textContent.trim()),overflow,current:match&&Number(match[1]),last:match&&Number(match[2]||match[1])>=Number(match[3])};
    });
    assert.equal(spread.empty,false,`${id} has an empty page`);assert.equal(spread.overflow,false,`${id} overflows a page`);
    if(spread.last)break;
    assert.ok(spread.current>previousPage,`${id} pagination must advance`);previousPage=spread.current;
    assert.ok(turn<maximumTurns-1,`${id} did not reach its final page`);await page.locator('#next').click();
   }
  }
  await page.goto(base+'reader.html?work=zhen-du-chuanyue&chapter=001');await page.locator('body[data-ready=true]').waitFor();
  assert.equal(await page.locator('#music-panel').isVisible(),false);
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#music-panel summary').click();
  await page.locator('#music-file').setInputFiles('台南少年追風記_MP3唱盤整合版新版/台南少年追風記_首發包/music/夏夜晚風.mp3');
  await page.locator('#music-play').click();await page.waitForFunction(()=>!document.querySelector('#music-audio').paused);
  assert.match(await page.locator('#music-audio').getAttribute('src'),/^blob:/);
  await page.route('**/assets/music/summer-night-wind.mp3',route=>route.fulfill({status:404,body:'Missing audio'}));
  await page.goto(base+'reader.html?work=tainan-youth-wind&chapter=ep01');await page.locator('body[data-ready=true]').waitFor();
  await page.locator('#music-panel summary').click();await page.locator('#music-play').click();
  await page.getByText(/音檔不存在或無法播放/).waitFor();
  assert.deepEqual(errors,[]);
  await context.close();
 }
 console.log('Tainan series, 26 footnotes, local MP3 playback and chapter persistence passed at 390px and 1440px.');
} finally {await browser.close();}
