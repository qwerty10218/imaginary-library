import {createReaderCore} from './reader/core.js';
import {createPageTurn} from './page-turn.js';
import {loadCatalog,findWork,chapterUrl,progressStore} from './catalog.js';

const $=id=>document.getElementById(id);
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const store=progressStore(), core=createReaderCore(), pageTurn=createPageTurn();
const narrow=()=>innerWidth<960;
const params=new URLSearchParams(location.search);
const defaults={theme:'dark',size:20,line:1.9,font:'serif',motion:'fold',mode:narrow()?'scroll':'page'};
let settings={...defaults,...store.read('reader:settings')};
for(const [key,options] of Object.entries({theme:['dark','light','warm'],font:['serif','sans'],motion:['fold','fade','none'],mode:['page','scroll']})) if(!options.includes(settings[key])) settings[key]=defaults[key];
if(![18,20,22,24].includes(settings.size)) settings.size=20;
if(![1.7,1.9,2.1].includes(settings.line)) settings.line=1.9;
let work,chapter,chapterIndex,chapterId,workId,revision,model,pages=[],current=0,anchor;
let busy=false,pending=0,saveTimer,resizeTimer,renderVersion=0,turnVersion=0,skipPagehideCapture=false;
const step=()=>narrow()?1:2;
const startAnchor=id=>({chapterId:id,block:0,offset:0,percentage:0,contentVersion:revision});
function cancelTurn(){turnVersion++;pending=0;busy=false;pageTurn.cancel();}
function apply(){
 document.body.dataset.theme=settings.theme;document.body.dataset.mode=settings.mode;
 document.documentElement.style.setProperty('--reader-font-size',settings.size+'px');
 document.documentElement.style.setProperty('--reader-line-height',settings.line);
 document.documentElement.style.setProperty('--reader-font',`var(--font-${settings.font})`);
 for(const [id,key] of [['font-size','size'],['line-height','line'],['font-family','font'],['motion','motion']]) $(id).value=settings[key];
 document.querySelectorAll('button[data-mode]').forEach(el=>el.setAttribute('aria-pressed',el.dataset.mode===settings.mode));
 document.querySelectorAll('button[data-theme]').forEach(el=>el.setAttribute('aria-pressed',el.dataset.theme===settings.theme));
}
function sheet(index){
 const page=pages[index];
 return `<section class="sheet" ${page?'':'aria-hidden="true"'}><div class="page-running"><span>${escapeHtml(chapter.title)}</span><span>臆想書房</span></div><div class="page-content"><div class="book-page-body prose">${page?.bodyHtml||''}</div>${page?core.pageNotes(page):''}</div><div class="page-number">${page?String(index+1).padStart(2,'0'):''}</div></section>`;
}
function paint(){
 $('book').innerHTML=`<div class="spread">${sheet(current)}${narrow()?'':sheet(current+1)}</div>`;
 const end=Math.min(current+step(),pages.length);
 $('position').textContent=`${current+1}${end>current+1?' — '+end:''} / ${pages.length}`;
 $('progress').style.width=`${end/Math.max(1,pages.length)*100}%`;
 $('prev').disabled=current===0&&chapterIndex===0;
 $('next').disabled=end>=pages.length&&chapterIndex===work.chapters.length-1;
}
function textPoint(el,offset){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node,last;while((node=walker.nextNode())){last=node;if(offset<=node.length)return [node,Math.max(0,offset)];offset-=node.length;}return last?[last,last.length]:[el,0];}
function rangeAt(el,offset){const [node,n]=textPoint(el,offset);const range=document.createRange();range.setStart(node,n);range.setEnd(node,Math.min(n+1,node.length??0));return range;}
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
 if(anchor.contentVersion===revision) pages.forEach((page,index)=>{const box=document.createElement('div');box.innerHTML=page.bodyHtml;const el=box.querySelector(`[data-idx="${anchor.block}"]`);if(el&&Number(el.dataset.start||0)<=anchor.offset)found=index;});
 if(found<0)found=Math.round((anchor.percentage||0)*Math.max(0,pages.length-1));
 return Math.floor(found/step())*step();
}
async function render(){
 cancelTurn();const version=++renderVersion;apply();
 $('book').hidden=settings.mode!=='page';$('scroll-content').hidden=settings.mode!=='scroll';
 await document.fonts.ready;if(version!==renderVersion)return;
 if(settings.mode==='page'){
  $('scroll-content').replaceChildren();
  $('book').innerHTML='<div class="spread">'+sheet(-1)+(narrow()?'':sheet(-1))+'</div>';
  const box=$('book').querySelector('.page-content').getBoundingClientRect();
  try{pages=core.paginate(model,{availableH:box.height-8,availableW:box.width,fontVal:settings.size,fsVal:settings.size+'px',isMobile:narrow()});}
  catch{settings.mode='scroll';await render();$('storage-status').textContent='目前頁面無法容納此排版，已切換滾動閱讀。';return;}
  current=pageForAnchor();paint();scrollTo(0,0);
 }else{
  $('book').replaceChildren();$('scroll-content').innerHTML=model.bodyHtml+core.endnotes(model);
  const el=$('scroll-content').querySelector(`[data-idx="${anchor.block}"]`);
  if(anchor.block||anchor.offset){if(el){const range=rangeAt(el,Math.min(anchor.offset,el.textContent.length));scrollTo(0,Math.max(0,scrollY+range.getBoundingClientRect().top-100));}else scrollTo(0,(anchor.percentage||0)*(document.documentElement.scrollHeight-innerHeight));}else scrollTo(0,0);
  $('position').textContent='向下閱讀';$('progress').style.width=`${(anchor.percentage||0)*100}%`;$('prev').disabled=true;$('next').disabled=true;
 }
 document.body.dataset.ready='true';
}
function goChapter(index){
 if(index<0||index>=work.chapters.length)return;
 capture();flush();
 const target=work.chapters[index];anchor=startAnchor(target.id);flush();skipPagehideCapture=true;
 location.href=chapterUrl(work,target);
}
async function turn(direction){
 if(settings.mode!=='page'||getSelection()?.toString()||document.querySelector('dialog[open]'))return;
 if(busy){pending=direction;return;}
 const next=current+direction*step();
 if(next<0){goChapter(chapterIndex-1);return;}
 if(next>=pages.length){goChapter(chapterIndex+1);return;}
 const from=$('book').querySelector(':scope > .spread').cloneNode(true);
 current=next;paint();capture();save();
 if(settings.motion==='none'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 busy=true;const version=++turnVersion;
 await pageTurn.play({book:$('book'),from,to:$('book').querySelector(':scope > .spread'),direction,single:narrow(),style:settings.motion});
 if(version!==turnVersion)return;
 busy=false;if(pending){const queued=pending;pending=0;turn(queued);}
}
function wire(){
 $('prev').onclick=()=>turn(-1);$('next').onclick=()=>turn(1);
 for(const [button,id] of [['settings-button','settings'],['contents-button','contents']]) $(button).onclick=()=>{cancelTurn();$(id).showModal();};
 document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
 document.addEventListener('click',event=>{const ref=event.target.closest('.fn-ref');if(ref){cancelTurn();const note=model.footnotesById.get(ref.dataset.fnId);if(note){$('note-text').textContent=note.marker+' '+note.text;$('note').showModal();}}});
 async function change(key,value){capture();flush();settings[key]=value;store.write('reader:settings',settings);await render();}
 document.querySelectorAll('button[data-mode]').forEach(button=>button.onclick=()=>change('mode',button.dataset.mode));
 document.querySelectorAll('button[data-theme]').forEach(button=>button.onclick=()=>change('theme',button.dataset.theme));
 for(const [id,key] of [['font-size','size'],['line-height','line'],['font-family','font'],['motion','motion']]) $(id).onchange=event=>change(key,['size','line'].includes(key)?Number(event.target.value):event.target.value);
 document.addEventListener('keydown',event=>{if(document.querySelector('dialog[open]')||event.target.closest('button,input,select,textarea,[contenteditable]'))return;if(settings.mode==='page'&&['ArrowRight','PageDown','ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();turn(['ArrowRight','PageDown'].includes(event.key)?1:-1);}});
 let touch;
 $('book').addEventListener('pointerdown',()=>{if(busy)cancelTurn();},{capture:true});
 $('book').addEventListener('touchstart',event=>{if(event.target.closest('button,a')||event.touches.length!==1){touch=null;return;}touch={x:event.touches[0].clientX,y:event.touches[0].clientY,t:Date.now()};},{passive:true});
 $('book').addEventListener('touchend',event=>{if(!touch)return;const dx=event.changedTouches[0].clientX-touch.x,dy=event.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5&&Date.now()-touch.t<600&&!getSelection()?.toString())turn(dx<0?1:-1);touch=null;},{passive:true});
 addEventListener('scroll',()=>{if(settings.mode==='scroll'){capture();save();$('progress').style.width=`${anchor.percentage*100}%`;}},{passive:true});
 addEventListener('resize',()=>{cancelTurn();clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{capture();render();},160);});
 addEventListener('pagehide',()=>{cancelTurn();if(!skipPagehideCapture)capture();flush();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelTurn();if(!skipPagehideCapture)capture();flush();}});
 const preference=matchMedia('(prefers-reduced-motion: reduce)');if(preference.addEventListener)preference.addEventListener('change',cancelTurn);else preference.addListener?.(cancelTurn);
}
try {
 workId=params.get('work');chapterId=params.get('chapter');
 work=findWork(await loadCatalog(),workId);chapterIndex=work?.chapters.findIndex(item=>item.id===chapterId)??-1;
 if(!work||chapterIndex<0)throw new Error('找不到這個章節。請從作品目錄重新進入。');
 chapter=work.chapters[chapterIndex];revision=chapter.version;
 const response=await fetch(new URL('../'+chapter.file,import.meta.url),{cache:'no-store'});if(!response.ok)throw new Error('章節正文暫時無法載入。');
 const markdown=await response.text();model=core.parse(markdown);
 const saved=store.load(workId);anchor=saved?.chapterId===chapterId?{...saved,contentVersion:revision}:startAnchor(chapterId);
 document.title=`${chapter.title} · ${work.title} · 臆想書房`;
 $('reader-title').textContent=chapter.title;$('reader-byline').textContent=`${work.title}　／　${work.author}`;
 $('back-to-work').href=`work.html?id=${encodeURIComponent(workId)}`;
 work.chapters.forEach((item,index)=>{const link=document.createElement('a');link.className='chapter-link';link.href=chapterUrl(work,item);link.textContent=`${String(index+1).padStart(2,'0')}　${item.title}　→`;link.onclick=()=>{capture();flush();anchor=startAnchor(item.id);flush();skipPagehideCapture=true;};$('contents-chapters').append(link);});
 $('contents-work').textContent=work.title;
 for(const [id,index,label] of [['previous-chapter',chapterIndex-1,'← 上一章'],['next-chapter',chapterIndex+1,'下一章 →']])if(index>=0&&index<work.chapters.length){const link=$(id);link.hidden=false;link.href=chapterUrl(work,work.chapters[index]);link.textContent=`${label} · ${work.chapters[index].title}`;link.onclick=()=>{capture();flush();anchor=startAnchor(work.chapters[index].id);flush();skipPagehideCapture=true;};}
 wire();await render();
} catch(error){$('reader-error').textContent=error.message;$('book').hidden=true;$('scroll-content').hidden=true;$('prev').disabled=true;$('next').disabled=true;}
