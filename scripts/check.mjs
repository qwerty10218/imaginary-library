import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
async function walk(dir) {
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await walk(file);
    else if (/\.(m?js)$/.test(file)) execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
  }
}
await walk('web/js'); await walk('scripts');
execFileSync(process.execPath,['--test','tests/progress.test.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
const forbidden = /novel-reader|https?:\/\/[^\s'"]+\.supabase\.co|sb_publishable_|service_role|彼岸仍是人間|顧清宇|audio-manager/;
async function audit(dir) {
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    const file=`${dir}/${entry.name}`;
    if(entry.isDirectory()) await audit(file);
    else if(forbidden.test(await fs.readFile(file,'utf8'))) throw new Error(`Old content or service reference: ${file}`);
  }
}
await audit('dist');
console.log('Syntax, progress tests, build and public-content audit passed.');
