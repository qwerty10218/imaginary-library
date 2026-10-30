import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';

const id=`upload-check-${randomBytes(6).toString('hex')}`;
const dir=path.resolve('content/works',id);
const assets=path.resolve('web/assets/illustrations',id);
const build=()=>execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'pipe'});
try {
  await fs.mkdir(path.join(dir,'chapters'),{recursive:true});
  await fs.mkdir(assets,{recursive:true});
  const image=await fs.readFile('web/assets/icons/favicon-16x16.png');
  for(const name of ['published','unlisted'])await fs.writeFile(path.join(assets,`${name}.png`),image);
  await fs.writeFile(path.join(dir,'metadata.json'),JSON.stringify({id,title:'上稿測試',author:'Gary Lee',description:'只驗證建置流程。',volume:'測試卷',genres:['測試'],tags:[],status:'serializing',updatedAt:'2026-10-26',chapters:[{id:'chapter-one',title:'測試章節',published:true}]}));
  const chapter=`# 測試章節\n\n只驗證 Markdown 上稿流程。\n\n![測試插圖](assets/illustrations/${id}/published.png)\n`;
  await fs.writeFile(path.join(dir,'chapters/chapter-one.md'),chapter);
  await fs.writeFile(path.join(dir,'chapters/unlisted.md'),'私人草稿，不得複製到建置產物。\n');
  build();
  const catalog=JSON.parse(await fs.readFile('dist/data/works.json','utf8'));
  const work=catalog.works.find(item=>item.id===id);
  assert.equal(work.chapters.length,1);
  assert.equal(work.chapters[0].file,`content/${id}/chapter-one.md`);
  assert.match(await fs.readFile(`dist/${work.chapters[0].file}`,'utf8'),/測試章節/);
  await assert.rejects(fs.access(`dist/content/${id}/unlisted.md`));
  assert.deepEqual(await fs.readFile(`dist/assets/illustrations/${id}/published.png`),image);
  await assert.rejects(fs.access(`dist/assets/illustrations/${id}/unlisted.png`));
  await fs.writeFile(path.join(dir,'chapters/chapter-one.md'),chapter.replace('published.png','missing.png'));
  assert.throws(build,/ENOENT/);
  await fs.writeFile(path.join(dir,'chapters/chapter-one.md'),chapter.replace(`${id}/published.png`,`${id}/../private.png`));
  assert.throws(build,/插圖路徑無效/);
  await fs.writeFile(path.join(dir,'chapters/chapter-one.md'),chapter.replace(/!\[測試插圖\]\(([^)]+)\)/,'<img src="$1" width="16" height="16" loading="lazy">'));
  build();
  assert.deepEqual(await fs.readFile(`dist/assets/illustrations/${id}/published.png`),image);
  console.log('PASS: registered Markdown and HTML images publish identical bytes; unlisted assets, missing images and traversal are guarded.');
} finally {
  await fs.rm(dir,{recursive:true,force:true});
  await fs.rm(assets,{recursive:true,force:true});
  build();
}
