import {createReaderCore} from './reader/core.js';
import {createProgressStore} from './progress.js';
const $=id=>document.getElementById(id);
let storage; try {storage=window.localStorage;} catch { /* Memory-only reader. */ }
const store=createProgressStore(storage), core=createReaderCore();
const narrow=()=>window.innerWidth<960;
const params=new URLSearchParams(location.search);
const saved=store.read('prototype:settings') || {};
const defaults={theme:'dark',size:20,line:1.9,font:'serif',motion:'fold',mode:narrow()?'scroll':'page'};
let settings={...defaults,...saved};
for(const [key,options] of Object.entries({theme:['dark','light','warm'],font:['serif','sans'],motion:['fold','fade','none'],mode:['page','scroll']})) if(!options.includes(settings[key])) settings[key]=defaults[key];
if(![18,20,22,24].includes(settings.size)) settings.size=20;
if(![1.7,1.9,2.1].includes(settings.line)) settings.line=1.9;
if(['page','scroll'].includes(params.get('mode'))) settings.mode=params.get('mode');
if(['dark','light','warm'].includes(params.get('theme'))) settings.theme=params.get('theme');
const workId='prototype-reading-study', chapterId='01', revision='study-1';
const markdown=`# 把時間留給一頁書

閱讀，有時只是為自己留下一小段不受打擾的時間。不必急著翻到結尾，也不必記住每一句話。讓目光沿著文字走，停在一個逗點，再慢慢往下。<sup class="fn-ref">〔1〕</sup>

這裡是一份排版示範。文字用來觀察字距、行距與留白，並不屬於書庫中的正式作品。你可以切換紙頁的顏色，看看白天與夜晚各自適合什麼樣的光。

紙頁的邊界讓視線有了停靠的地方。中間的一道細線，輕輕分開左右兩頁；書的形狀仍在，卻不必模仿歲月留下的斑駁。

## 一種安靜的節奏

頁面不需要把每一個角落填滿。段落之間留一點空隙，讓長句有地方舒展，也讓短句有自己的重量。明體與黑體，各有不同的呼吸。

當字放大，行數會改變，頁數也會改變。閱讀的位置應該跟著文字走，而不是被一個固定的頁碼困住。重新打開時，仍能回到剛才停下的地方。

一段註解可以安靜地待在頁底。需要時，輕點註碼便能讀到；讀完，回到原來那一行。它應當幫助理解，而不奪走正文的聲音。<sup class="fn-ref">〔2〕</sup>

手機上的書頁窄一些，目光走過一行的距離也短一些。留白不必寬闊，卻必須恰當。手指可以輕滑翻頁，也可以選擇熟悉的向下滾動。

## 光落在字上

深色讓夜間的光柔和下來，淺色讓日間的輪廓更清楚。暖紙介於兩者之間，帶一點溫度，沒有刻意做舊的紋理。三種顏色，都把最重要的位置留給文字。

翻頁是短暫的停頓。頁角輕輕移開，下一頁從下面露出來。這個動作應當短到不讓人等待，又清楚到讓人知道：已經往前走了一點。

也可以不需要動畫。直接切換、立即看到下一句，同樣是一種完整的閱讀方式。工具應該配合讀者，而不是讓讀者配合工具。

你可以在這一頁停下，再調整字級，或把視窗變窄。留意文字是否仍然清楚、註解是否容易找到，以及手指是否能舒服地碰到翻頁按鈕。

## 在下一頁之前

書房可以容納很長的故事，也可以只放一篇短文。每部作品有自己的入口與目錄，每一次閱讀都有自己的位置。這裡不催促閱讀，也不替閱讀設定速度。

一頁讀完，還有下一頁。若此刻不想繼續，就把書放在這裡。等到願意的時候，再回來。

<section class="footnotes"><p>〔1〕本篇為介面驗收用的通用文字，不是正式小說。</p><p>〔2〕註釋示範：翻頁模式顯示頁底註，滾動模式保留章末註；點擊註碼可開啟完整內容。</p></section>`;
let model=core.parse(markdown), pages=[], current=0, busy=false, pending=0, saveTimer, resizeTimer, renderVersion=0;
let anchor=store.load(workId) || {chapterId,block:0,offset:0,percentage:0,contentVersion:revision};
const step=()=>narrow()?1:2;
function apply(){
 document.body.dataset.theme=settings.theme;document.body.dataset.mode=settings.mode;
 document.documentElement.style.setProperty('--reader-font-size',settings.size+'px');
 document.documentElement.style.setProperty('--reader-line-height',settings.line);
 document.documentElement.style.setProperty('--reader-font',`var(--font-${settings.font})`);
 for(const [id,k] of [['font-size','size'],['line-height','line'],['font-family','font'],['motion','motion']]) $(id).value=settings[k];
 document.querySelectorAll('[data-mode]').forEach(el=>{if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',el.dataset.mode===settings.mode);});
 document.querySelectorAll('button[data-theme]').forEach(el=>el.setAttribute('aria-pressed',el.dataset.theme===settings.theme));
}
function sheet(index){
 const p=pages[index];
 return `<section class="sheet" ${p?'':'aria-hidden="true"'}><div class="page-running"><span>在文字之間</span><span>臆想書房</span></div><div class="page-content"><div class="book-page-body prose">${p?.bodyHtml||''}</div>${p?core.pageNotes(p):''}</div><div class="page-number">${p?String(index+1).padStart(2,'0'):''}</div></section>`;
}
function spread(){return `<div class="spread">${sheet(current)}${narrow()?'':sheet(current+1)}</div>`;}
function paint(){
 $('book').innerHTML=spread();
 const end=Math.min(current+step(),pages.length);
 $('position').textContent=`${current+1}${end>current+1?' — '+end:''} / ${pages.length}`;
 $('progress').style.width=`${end/Math.max(1,pages.length)*100}%`;
 $('prev').disabled=current===0;$('next').disabled=end>=pages.length;
}
function textPoint(el,offset){
 const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node,last;
 while((node=walker.nextNode())){last=node;if(offset<=node.length)return [node,Math.max(0,offset)];offset-=node.length;}
 return last?[last,last.length]:[el,0];
}
function rangeAt(el,offset){const [n,o]=textPoint(el,offset);const r=document.createRange();r.setStart(n,o);r.setEnd(n,Math.min(o+1,n.length??0));return r;}
function capture(){
 const container=settings.mode==='page'?$('book'):$('scroll-content');
 const all=[...container.querySelectorAll('[data-idx]')];
 const el=settings.mode==='page'?all[0]:(all.find(e=>e.getBoundingClientRect().bottom>100)||all.at(-1));
 if(!el)return;
 let offset=Number(el.dataset.start||0);
 if(settings.mode==='scroll'){
  let low=0,high=el.textContent.length;
  while(low<high){const mid=(low+high)>>1;if(rangeAt(el,mid).getBoundingClientRect().top<100)low=mid+1;else high=mid;}
  offset+=low;
 }
 anchor={chapterId,block:Number(el.dataset.idx),offset,percentage:settings.mode==='page'?current/Math.max(1,pages.length-1):Math.max(0,Math.min(1,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))),contentVersion:revision};
}
function flush(){clearTimeout(saveTimer);store.save(workId,anchor);if(!store.available)$('storage-status').textContent='此瀏覽器無法保存進度；你仍可繼續閱讀。';}
function save(){clearTimeout(saveTimer);saveTimer=setTimeout(flush,450);}
function pageForAnchor(){
 let found=-1;
 pages.forEach((p,i)=>{const box=document.createElement('div');box.innerHTML=p.bodyHtml;const el=box.querySelector(`[data-idx="${anchor.block}"]`);if(el&&Number(el.dataset.start||0)<=anchor.offset)found=i;});
 if(found<0)found=Math.round((anchor.percentage||0)*Math.max(0,pages.length-1));
 return Math.floor(found/step())*step();
}
async function render(){
 const version=++renderVersion;apply();
 $('book').hidden=settings.mode!=='page';$('scroll-content').hidden=settings.mode!=='scroll';
 await document.fonts.ready;if(version!==renderVersion)return;
 if(settings.mode==='page'){
  $('scroll-content').replaceChildren();
  // Measure an actual sheet so CSS and pagination use the same dimensions.
  $('book').innerHTML='<div class="spread">'+sheet(-1)+(narrow()?'':sheet(-1))+'</div>';
  const box=$('book').querySelector('.page-content').getBoundingClientRect();
  try {pages=core.paginate(model,{availableH:box.height-8,availableW:box.width,fontVal:settings.size,fsVal:settings.size+'px',isMobile:narrow()});}
  catch {settings.mode='scroll';await render();$('storage-status').textContent='目前頁面無法容納此排版，已切換滾動閱讀。';return;}
  current=pageForAnchor();paint();window.scrollTo(0,0);
 }else{
  $('book').replaceChildren();
  $('scroll-content').innerHTML=model.bodyHtml+core.endnotes(model);
  const el=$('scroll-content').querySelector(`[data-idx="${anchor.block}"]`);
  if(anchor.block||anchor.offset){if(el){const r=rangeAt(el,Math.min(anchor.offset,el.textContent.length));window.scrollTo(0,Math.max(0,scrollY+r.getBoundingClientRect().top-100));}else window.scrollTo(0,(anchor.percentage||0)*(document.documentElement.scrollHeight-innerHeight));}
  else window.scrollTo(0,0);
  $('position').textContent='向下閱讀';$('progress').style.width=`${(anchor.percentage||0)*100}%`;$('prev').disabled=true;$('next').disabled=true;
 }
 document.body.dataset.ready='true';
}
async function turn(direction){
 if(settings.mode!=='page'||getSelection()?.toString()||document.querySelector('dialog[open]'))return;
 if(busy){pending=direction;return;}
 const next=current+direction*step();if(next<0||next>=pages.length)return;
 const old=$('book').innerHTML;current=next;paint();capture();save();
 if(settings.motion==='none'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 busy=true;const overlay=document.createElement('div');overlay.className='turn-overlay'+(direction<0?' is-back':'');overlay.setAttribute('aria-hidden','true');overlay.inert=true;
 overlay.innerHTML=`<div class="turn-leaf">${old}<div class="turn-fold"></div></div>`;$('book').append(overlay);
 const leaf=overlay.firstElementChild,fold=leaf.lastElementChild;
 const animations=[];
 if(settings.motion==='fold'){
  // Compositor-only motion. The diagonal ribbon suggests a curled page without a mesh/3D engine.
  const sign=direction>0?-1:1;
  animations.push(leaf.animate([{transform:'translateX(0) skewX(0deg)',opacity:1},{transform:`translateX(${sign*40}%) skewX(${sign*3}deg)`,opacity:1,offset:.55},{transform:`translateX(${sign*110}%) skewX(${sign*5}deg)`,opacity:1}],{duration:220,easing:'cubic-bezier(.3,.4,.3,1)'}));
  animations.push(fold.animate([{transform:`rotate(${direction*17}deg) translateX(${direction*100}%)`,opacity:0},{transform:`rotate(${direction*17}deg) translateX(0)`,opacity:1,offset:.3},{transform:`rotate(${direction*17}deg) translateX(0)`,opacity:1}],{duration:220,easing:'ease-out'}));
 }else animations.push(leaf.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${direction*-10}px)`}],{duration:180,easing:'ease-out'}));
 try{await Promise.all(animations.map(a=>a.finished));}catch{/* Interrupted transition. */}finally{overlay.remove();busy=false;}
 if(pending){const d=pending;pending=0;turn(d);}
}
$('prev').onclick=()=>turn(-1);$('next').onclick=()=>turn(1);
for(const [button,id] of [['settings-button','settings'],['contents-button','contents']]) $(button).onclick=()=>$(id).showModal();
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
document.addEventListener('click',e=>{const ref=e.target.closest('.fn-ref');if(ref){const note=model.footnotesById.get(ref.dataset.fnId);if(note){$('note-text').textContent=note.marker+' '+note.text;$('note').showModal();}}});
async function change(key,value){capture();flush();settings[key]=value;store.write('prototype:settings',settings);await render();}
document.querySelectorAll('button[data-mode]').forEach(b=>b.onclick=()=>change('mode',b.dataset.mode));
document.querySelectorAll('button[data-theme]').forEach(b=>b.onclick=()=>change('theme',b.dataset.theme));
for(const [id,key] of [['font-size','size'],['line-height','line'],['font-family','font'],['motion','motion']]) $(id).onchange=e=>change(key,['size','line'].includes(key)?Number(e.target.value):e.target.value);
$('chapter-start').onclick=()=>{anchor={chapterId,block:0,offset:0,percentage:0,contentVersion:revision};$('contents').close();render();save();};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('button,input,select,textarea,[contenteditable]'))return;if(settings.mode==='page'&&['ArrowRight','PageDown','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();turn(['ArrowRight','PageDown'].includes(e.key)?1:-1);}});
let start;
$('book').addEventListener('touchstart',e=>{if(e.target.closest('button,a')||e.touches.length!==1){start=null;return;}start={x:e.touches[0].clientX,y:e.touches[0].clientY,t:Date.now()};},{passive:true});
$('book').addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5&&Date.now()-start.t<600&&!getSelection()?.toString())turn(dx<0?1:-1);start=null;},{passive:true});
window.addEventListener('scroll',()=>{if(settings.mode==='scroll'){capture();save();$('progress').style.width=`${anchor.percentage*100}%`;}},{passive:true});
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{capture();render();},160);});
window.addEventListener('pagehide',()=>{capture();flush();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){capture();flush();}});
await render();
