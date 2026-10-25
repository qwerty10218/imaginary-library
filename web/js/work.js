import {loadCatalog,findWork,coverUrl,chapterUrl,progressStore,validProgress,statusText} from './catalog.js';
const $=id=>document.getElementById(id);
try {
  const work=findWork(await loadCatalog(),new URLSearchParams(location.search).get('id'));
  if(!work) throw new Error('找不到這部作品。');
  document.title=`${work.title} · 臆想書房`;
  $('work-kicker').textContent=`${statusText[work.status]} / ${work.genres.join(' / ')}`;
  $('work-title').textContent=work.title;$('work-volume').textContent=work.volume?`第一卷　${work.volume}`:'';
  $('work-byline').textContent=`${work.author}　·　最近更新 ${work.updatedAt}`;
  $('work-description').textContent=work.description;
  if(coverUrl(work)){const img=document.createElement('img');img.src=coverUrl(work);img.alt=`《${work.title}》封面`;$('work-cover').append(img);}else{$('work-cover').classList.add('cover-placeholder');$('work-cover').textContent='臆';}
  for(const tag of [...work.genres,...work.tags]){const span=document.createElement('span');span.textContent=tag;$('work-tags').append(span);}
  if(!work.chapters.length){$('chapter-list').innerHTML='<p class="no-chapters">正式章節尚未上架。作者提供正文後，這裡會出現章節目錄。</p>';}
  else {
    const position=validProgress(progressStore(),work);const first=position?work.chapters.find(c=>c.id===position.chapterId):work.chapters[0];
    const action=document.createElement('a');action.className='primary-link';action.href=chapterUrl(work,first);action.textContent=position?'繼續閱讀 ↗':'開始閱讀 ↗';$('work-action').append(action);
    work.chapters.forEach((chapter,index)=>{const a=document.createElement('a');a.className='chapter-row';a.href=chapterUrl(work,chapter);const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');const title=document.createElement('strong');title.textContent=chapter.title;const arrow=document.createElement('span');arrow.textContent='↗';a.append(number,title,arrow);$('chapter-list').append(a);});
  }
} catch(error){$('work-status').textContent=error.message;}
