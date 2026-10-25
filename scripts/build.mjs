import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
if (path.dirname(root) !== process.cwd()) throw new Error('Invalid build directory');
await fs.rm(root, {recursive:true,force:true});
await fs.mkdir(root, {recursive:true});
// Allowlist: no drafts, old assets, backups, credentials or development documents.
for (const name of ['index.html','prototype.html','css','js']) {
  await fs.cp(path.join('web',name), path.join(root,name), {recursive:true});
}
await fs.mkdir(path.join(root,'js/vendor'), {recursive:true});
await fs.copyFile('node_modules/marked/lib/marked.esm.js', path.join(root,'js/vendor/marked.js'));
await fs.copyFile('node_modules/dompurify/dist/purify.es.mjs', path.join(root,'js/vendor/purify.js'));
await fs.copyFile('node_modules/marked/LICENSE.md', path.join(root,'js/vendor/marked-LICENSE.txt'));
await fs.copyFile('node_modules/dompurify/LICENSE', path.join(root,'js/vendor/purify-LICENSE.txt'));
console.log('Built local visual prototype. Formal library remains empty.');
