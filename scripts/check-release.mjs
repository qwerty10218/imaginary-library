import fs from 'node:fs/promises';
import path from 'node:path';

const id='zhen-du-chuanyue';
const work=JSON.parse(await fs.readFile(path.join('content/works',id,'metadata.json'),'utf8'));
const required=['我穿越了。','退朝後，我一溜煙鑽進了御花園。','當晚，暢音閣。'];
if (!work.cover || work.chapters.length!==3 || work.status!=='serializing') throw new Error('正式發布需要封面及前三章。');
for(let index=0;index<3;index++){
  const chapter=work.chapters[index];
  if(!chapter?.published)throw new Error(`第 ${index+1} 章尚未標記發布。`);
  const text=(await fs.readFile(path.join('content/works',id,'chapters',`${chapter.id}.md`),'utf8')).trim().replace(/^# .+(?:\r?\n)+/,'');
  if(!text.startsWith(required[index]) || text.length<500)throw new Error(`第 ${index+1} 章全文或開頭未通過發布檢查。`);
}
await fs.access(path.join('dist',work.cover));
console.log('Release gate: cover and all three source chapters present.');
