import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';

const id=`upload-check-${randomBytes(6).toString('hex')}`;
const dir=path.resolve('content/works',id);
const build=()=>execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'pipe'});
try {
  await fs.mkdir(path.join(dir,'chapters'),{recursive:true});
  await fs.writeFile(path.join(dir,'metadata.json'),JSON.stringify({id,title:'上稿測試',author:'Gary Lee',description:'只驗證建置流程。',volume:'測試卷',genres:['測試'],tags:[],status:'serializing',updatedAt:'2026-10-26',chapters:[{id:'chapter-one',title:'測試章節',published:true}]}));
  await fs.writeFile(path.join(dir,'chapters/chapter-one.md'),'# 測試章節\n\n只驗證 Markdown 上稿流程。\n');
  await fs.writeFile(path.join(dir,'chapters/unlisted.md'),'私人草稿，不得複製到建置產物。\n');
  build();
  const catalog=JSON.parse(await fs.readFile('dist/data/works.json','utf8'));
  const work=catalog.works.find(item=>item.id===id);
  assert.equal(work.chapters.length,1);
  assert.equal(work.chapters[0].file,`content/${id}/chapter-one.md`);
  assert.match(await fs.readFile(`dist/${work.chapters[0].file}`,'utf8'),/測試章節/);
  await assert.rejects(fs.access(`dist/content/${id}/unlisted.md`));
  console.log('PASS: new work and registered Markdown are built; unlisted draft is excluded.');
} finally {
  await fs.rm(dir,{recursive:true,force:true});
  build();
}
