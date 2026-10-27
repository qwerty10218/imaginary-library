import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const out='.local/favicon';await fs.mkdir(out,{recursive:true});
const root=path.resolve('dist'),prefix='/imaginary-library/';
const types={'.ico':'image/x-icon','.png':'image/png','.webp':'image/webp','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.md':'text/plain; charset=utf-8','.mp3':'audio/mpeg'};
// A bounded test server avoids touching the user's running preview process.
const server=process.env.TEST_BASE?null:http.createServer(async(req,res)=>{
 try{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!pathname.startsWith(prefix)){res.writeHead(404);res.end();return;}
  const file=path.resolve(root,decodeURIComponent(pathname.slice(prefix.length))||'index.html');
  if(!file.startsWith(root+path.sep)){res.writeHead(404);res.end();return;}
  const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end();}
});
if(server)await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=process.env.TEST_BASE||`http://127.0.0.1:${server.address().port}${prefix}`;
let context;
const results=[];
try{
 context=await chromium.launchPersistentContext(out+'/chrome-profile',{channel:'chrome',headless:true});
 const page=await context.newPage();
 for(const path of ['index.html','work.html?id=tainan-youth-wind','reader.html?work=tainan-youth-wind&chapter=ep01','prototype.html']){
  await page.goto(base+path);
  const links=await page.locator('head link[rel="icon"],head link[rel="apple-touch-icon"]').evaluateAll(els=>els.map(e=>({rel:e.rel,href:e.href,sizes:e.getAttribute('sizes')})));
  assert.equal(links.length,4);assert.equal(new Set(links.map(e=>e.href)).size,4);
  for(const link of links){
   assert.ok(link.href.startsWith(base));
   const response=await context.request.get(link.href);assert.equal(response.status(),200);
   assert.match(response.headers()['content-type'],link.href.endsWith('.ico')?/image\/(?:x-icon|vnd.microsoft.icon)/:/image\/png/);
   const dimensions=await page.evaluate(async url=>{const img=new Image();img.src=url;await img.decode();return [img.naturalWidth,img.naturalHeight];},link.href);
   if(link.href.endsWith('.ico'))assert.ok([16,32,48,64].includes(dimensions[0])&&dimensions[0]===dimensions[1]);
   else assert.deepEqual(dimensions,link.sizes.split('x').map(Number));
  }
  await page.waitForTimeout(500);results.push({path,links});
 }
 for(const [size,name] of [[48,'favicon-48x48.png'],[192,'icon-192x192.png'],[512,'icon-512x512.png']]){
  const url=base+'assets/icons/'+name;const response=await context.request.get(url);assert.equal(response.status(),200);
  assert.deepEqual(await page.evaluate(async url=>{const img=new Image();img.src=url;await img.decode();return [img.naturalWidth,img.naturalHeight];},url),[size,size]);
 }
 const inventory=JSON.parse(await fs.readFile('tests/fixtures/favicon-assets.json','utf8'));
 for(const item of inventory){
  assert.deepEqual(await fs.readFile('dist/'+item.file.slice(4)),await fs.readFile(item.file));
 }
 for(const privatePath of ['assets/branding/favicon-master.png','assets/branding/favicon-source.jpg','assets/branding/favicon-preview.png','assets/branding/legacy/favicon.ico']){
  const response=await context.request.get(base+privatePath);assert.equal(response.status(),404);
 }
 assert.deepEqual(await fs.readdir('dist/assets/branding'),['brand-logo.png']);
 await fs.access('dist/assets/icons/favicon.ico');await assert.rejects(fs.access('dist/favicon.ico'));
 await page.goto(base+'index.html');await page.locator('.brand-logo').evaluate(img=>img.decode());
 await page.locator('.site-header').screenshot({path:out+'/d-header.png'});
 await fs.writeFile(out+'/browser-results.json',JSON.stringify(results,null,2));
 console.log('PASS: four page heads, Pages subdirectory URLs, ICO/PNG MIME and browser decoding; all six PNGs available; imported bytes preserved and design sources excluded from build.');
}finally{await context?.close();if(server)await new Promise(resolve=>server.close(resolve));}
