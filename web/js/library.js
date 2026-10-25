import {loadCatalog,coverUrl,chapterUrl,progressStore,validProgress,statusText} from './catalog.js';
const $=id=>document.getElementById(id);
const store=progressStore();
try {
  const works=await loadCatalog();
  $('work-count').textContent=String(works.length).padStart(2,'0');
  if (!works.length) $('library-status').textContent='書房尚未上架作品。';
  for (const work of works) {
    const card=document.createElement('article');card.className='work-card';
    const link=document.createElement('a');link.href=`work.html?id=${encodeURIComponent(work.id)}`;link.className='work-card-link';
    const cover=document.createElement('div');cover.className='work-cover';
    if (coverUrl(work)) {const img=document.createElement('img');img.src=coverUrl(work);img.alt=`《${work.title}》封面`;img.loading='lazy';cover.append(img);} else {cover.classList.add('cover-placeholder');cover.textContent='臆';}
    const meta=document.createElement('div');meta.className='work-card-copy';
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`${statusText[work.status]} · ${work.genres.join(' / ')}`;
    const title=document.createElement('h3');title.textContent=work.title;
    const volume=document.createElement('p');volume.className='work-volume';volume.textContent=work.volume || work.author;
    const teaser=document.createElement('p');teaser.className='work-teaser';teaser.textContent=work.shortDescription || work.description;
    const hint=document.createElement('span');hint.className='work-card-cta';hint.textContent=work.chapters.length?'進入作品 ↗':'查看作品 · 待上稿 ↗';
    meta.append(eyebrow,title,volume,teaser,hint);link.append(cover,meta);card.append(link);$('work-list').append(card);
    const position=validProgress(store,work);
    if(position){const chapter=work.chapters.find(c=>c.id===position.chapterId);const a=document.createElement('a');a.className='continue-item';a.href=chapterUrl(work,chapter);a.textContent=`${work.title}　／　${chapter.title}　→`;$('continue-list').append(a);$('continue-section').hidden=false;}
  }
} catch(error){$('library-status').textContent=error.message;}
