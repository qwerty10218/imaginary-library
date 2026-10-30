import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {marked} from 'marked';

const root = path.resolve('dist');
const source = path.resolve('content/works');
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fail = message => { throw new Error(`作品資料錯誤：${message}`); };
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function withCulturalNotes(markdown, notes, label, chapter) {
  const appendix = markdown.match(/\n---\s*\n\s*## 文化註解\s*\n([\s\S]*?)\n## 延伸聆聽\s*\n[\s\S]*$/);
  if (!appendix) fail(`${label} 缺少文化註解與延伸聆聽段落`);
  const listed = [...appendix[1].matchAll(/^- \*\*註(\d+)｜([^*]+)\*\*：(.+)$/gm)];
  const ids = Object.keys(notes);
  if (listed.length !== ids.length) fail(`${label} 註解數量不符`);
  for (const [,id,term,explanation] of listed) {
    if (notes[id]?.term !== term || notes[id]?.explanation !== explanation) fail(`${label} 註${id} 與資料檔不一致`);
  }
  const refs = [...markdown.slice(0,appendix.index).matchAll(/\[註(\d+)\]/g)].map(match=>match[1]);
  if (refs.length !== ids.length || ids.some(id=>refs.filter(ref=>ref===id).length!==1)) fail(`${label} 正文註碼與資料檔不一致`);
  const originalBody = markdown.slice(0,appendix.index);
  const opening = originalBody.match(/^# ([^\n]+)\n\n> ([^\n]+)\n>\n> 延伸聆聽：([^\n]+)\n\n/);
  if (!opening || !chapter.title.endsWith(`｜${opening[1]}`)) fail(`${label} 章節標題或開篇資訊不符`);
  const body = (`# ${chapter.title}\n\n` + originalBody.slice(opening[0].length)).replace(/\[註(\d+)\]/g,(_,id)=>`<sup class="fn-ref">〔${id}〕</sup>`);
  const footnotes = ids.map(id=>`<p>〔${id}〕${escapeHtml(notes[id].term)}：${escapeHtml(notes[id].explanation)}</p>`).join('\n');
  return `${body.trimEnd()}\n\n## 延伸聆聽\n\n${opening[3]}\n\n<section class="footnotes">\n${footnotes}\n</section>\n`;
}
if (path.dirname(root) !== process.cwd()) throw new Error('Invalid build directory');

const works = [];
const illustrations = new Set();
for (const entry of await fs.readdir(source, {withFileTypes:true})) {
  if (!entry.isDirectory() || !slug.test(entry.name)) fail(`非法作品資料夾 ${entry.name}`);
  const dir = path.join(source, entry.name);
  const work = JSON.parse(await fs.readFile(path.join(dir, 'metadata.json'), 'utf8'));
  const notes = work.culturalNotes ? JSON.parse(await fs.readFile(path.join(dir, work.culturalNotes), 'utf8')) : null;
  if (work.id !== entry.name || !work.title || !work.author || !work.description || !Array.isArray(work.chapters)) fail(`${entry.name}/metadata.json 缺少必要欄位`);
  if (!['upcoming','serializing','complete'].includes(work.status)) fail(`${work.id} 狀態無效`);
  if (!Array.isArray(work.genres) || !Array.isArray(work.tags)) fail(`${work.id} 類型或標籤無效`);
  if (work.cover && !/^assets\/covers\/[a-z0-9_-]+\.(?:webp|png|jpe?g)$/.test(work.cover)) fail(`${work.id} 封面路徑無效`);
  if (work.songs) {
    if (!Array.isArray(work.songs)) fail(`${work.id} 音樂資料無效`);
    for (const song of work.songs) {
      if (!slug.test(song.id) || !song.title || !song.artist || !/^assets\/music\/[a-z0-9-]+\.mp3$/.test(song.audio || '')) fail(`${work.id} 歌曲資料或音檔路徑無效`);
      await fs.access(path.join('web',song.audio));
    }
  }
  const ids = new Set();
  work.chapters = await Promise.all(work.chapters.map(async chapter => {
    if (!slug.test(chapter.id) || ids.has(chapter.id) || !chapter.title || chapter.published !== true) fail(`${work.id} 章節 ID、標題或發布狀態無效`);
    ids.add(chapter.id);
    const filename = `${chapter.id}.md`;
    const original = await fs.readFile(path.join(dir, 'chapters', filename), 'utf8');
    const markdown = notes ? withCulturalNotes(original, notes[chapter.id], `${work.id}/${filename}`, chapter) : original;
    if (!markdown.trim()) fail(`${work.id}/${filename} 是空檔案`);
    // Publish only images referenced by a registered chapter in its own asset directory.
    for (const [,src] of marked.parse(markdown).matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)) {
      if (!new RegExp(`^assets/illustrations/${work.id}/[a-z0-9_-]+\\.(?:webp|png|jpe?g)$`).test(src)) fail(`${work.id}/${filename} 插圖路徑無效：${src}`);
      await fs.access(path.join('web',src));
      illustrations.add(src);
    }
    return {id:chapter.id,title:chapter.title,volume:chapter.volume || '',songId:chapter.songId || null,file:`content/${work.id}/${filename}`,version:createHash('sha256').update(markdown).digest('hex').slice(0,16)};
  }));
  if (work.cover) await fs.access(path.join('web', work.cover));
  works.push(work);
}
works.sort((a,b)=>a.id.localeCompare(b.id));
await fs.rm(root, {recursive:true,force:true});
await fs.mkdir(root, {recursive:true});
for (const name of ['index.html','work.html','reader.html','prototype.html','css','js']) {
  await fs.cp(path.join('web',name), path.join(root,name), {recursive:true});
}
await fs.cp('web/assets/icons',path.join(root,'assets/icons'),{recursive:true});
// Only the page logo is public; masters, previews and provenance stay private.
await fs.mkdir(path.join(root,'assets/branding'),{recursive:true});
await fs.copyFile('web/assets/branding/brand-logo.png',path.join(root,'assets/branding/brand-logo.png'));
for (const src of illustrations) {
  await fs.mkdir(path.dirname(path.join(root,src)),{recursive:true});
  await fs.copyFile(path.join('web',src),path.join(root,src));
}
const assetHash=createHash('sha256');
for (const file of ['web/css/reader.css',...(await fs.readdir('web/js',{recursive:true})).filter(name=>name.endsWith('.js')).sort().map(name=>path.join('web/js',name))]) assetHash.update(await fs.readFile(file));
const assetVersion=assetHash.digest('hex').slice(0,12);
for (const name of ['index.html','work.html','reader.html','prototype.html']) {
  const file=path.join(root,name);
  const html=await fs.readFile(file,'utf8');
  await fs.writeFile(file,html.replace(/(href|src)="((?:css|js)\/[^"?]+)"/g,`$1="$2?v=${assetVersion}"`));
}
await fs.mkdir(path.join(root,'data'), {recursive:true});
await fs.writeFile(path.join(root,'data/works.json'),JSON.stringify({schemaVersion:1,works},null,2)+'\n');
for (const work of works) {
  const dest = path.join(root,'content',work.id);
  await fs.mkdir(dest,{recursive:true});
  const dir = path.join(source,work.id);
  if (work.cover) {
    const target=path.join(root,work.cover);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.copyFile(path.join('web',work.cover),target);
  }
  for (const song of work.songs || []) {
    const target=path.join(root,song.audio);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.copyFile(path.join('web',song.audio),target);
  }
  const notes = work.culturalNotes ? JSON.parse(await fs.readFile(path.join(dir, work.culturalNotes), 'utf8')) : null;
  for (const chapter of work.chapters) {
    const original=await fs.readFile(path.join(dir,'chapters',`${chapter.id}.md`),'utf8');
    await fs.writeFile(path.join(dest,`${chapter.id}.md`),notes?withCulturalNotes(original,notes[chapter.id],`${work.id}/${chapter.id}.md`,chapter):original);
  }
}
await fs.mkdir(path.join(root,'js/vendor'), {recursive:true});
await fs.copyFile('node_modules/marked/lib/marked.esm.js', path.join(root,'js/vendor/marked.js'));
await fs.copyFile('node_modules/dompurify/dist/purify.es.mjs', path.join(root,'js/vendor/purify.js'));
await fs.copyFile('node_modules/marked/LICENSE.md', path.join(root,'js/vendor/marked-LICENSE.txt'));
await fs.copyFile('node_modules/dompurify/LICENSE', path.join(root,'js/vendor/purify-LICENSE.txt'));
console.log(`Built ${works.length} works and ${works.reduce((n,w)=>n+w.chapters.length,0)} published chapters.`);
