import {loadCatalog,coverUrl,chapterUrl,progressStore,statusText} from './catalog.js';
import {availableCategories,workCategories,recentReading} from './library-model.js';
import {wireLanguage,translatePage,convertText} from './language.js';
const $=id=>document.getElementById(id);
const store=progressStore();
wireLanguage(()=>{translatePage();document.title=convertText('臆想書房 · Gary\'s Imaginary Library');});
try {
  const works=await loadCatalog();
  $('work-count').textContent=String(works.length).padStart(2,'0');
  if (!works.length) $('library-status').textContent='書房尚未上架作品。';
  for (const work of works) {
    const card=document.createElement('article');card.className='work-card';
    card.dataset.categories=workCategories(work).join(' ');
    const details=document.createElement('details');details.className='work-details';details.open=innerWidth>=600;
    const summary=document.createElement('summary');
    const link=document.createElement('a');link.href=`work.html?id=${encodeURIComponent(work.id)}`;link.className='work-card-link';
    const cover=document.createElement('div');cover.className='work-cover';
    if (coverUrl(work)) {const img=document.createElement('img');img.src=coverUrl(work);img.alt=`《${work.title}》封面`;img.loading='lazy';cover.append(img);} else {cover.classList.add('cover-placeholder');cover.textContent='臆';}
    const meta=document.createElement('div');meta.className='work-card-copy';
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`${statusText[work.status]} · ${work.genres.join(' / ')}`;
    const title=document.createElement('h3');title.textContent=work.title;
    const volume=document.createElement('p');volume.className='work-volume';volume.textContent=work.volume || work.author;
    const teaser=document.createElement('p');teaser.className='work-teaser';teaser.textContent=work.shortDescription || work.description;
    const hint=document.createElement('span');hint.className='work-card-cta';hint.textContent=work.chapters.length?'進入作品 ↗':'查看作品 · 待上稿 ↗';
    const toggle=document.createElement('span');toggle.className='work-details-toggle';toggle.innerHTML='<span class="when-closed">展開簡介 ＋</span><span class="when-open">收合簡介 −</span>';
    meta.append(eyebrow,title,volume,hint);link.append(cover,meta);summary.append(link,toggle);details.append(summary,teaser);card.append(details);$('work-list').append(card);
  }
  for(const {id,label} of availableCategories(works)){
    const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.category=id;button.setAttribute('aria-pressed',String(id==='all'));button.setAttribute('aria-controls','work-list');
    button.onclick=()=>{
      for(const control of $('category-filters').children)control.setAttribute('aria-pressed',String(control===button));
      let visible=0;
      for(const card of $('work-list').children){card.hidden=id!=='all'&&!card.dataset.categories.split(' ').includes(id);if(!card.hidden)visible++;}
      $('library-status').textContent=convertText(`${label} · ${visible} 部作品`);
    };
    $('category-filters').append(button);
  }
  recentReading(works,store).forEach(({work,chapter},index)=>{
    const a=document.createElement('a');a.className='continue-item';a.href=chapterUrl(work,chapter);a.textContent=`${work.title}　／　${chapter.title}　→`;
    $(index?'continue-others':'continue-list').append(a);$('continue-section').hidden=false;if(index)$('continue-more').hidden=false;
  });
} catch(error){$('library-status').textContent=error.message;}
translatePage();document.title=convertText('臆想書房 · Gary\'s Imaginary Library');
