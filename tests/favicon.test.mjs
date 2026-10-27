import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';

const sizes=new Map([[16,'favicon-16x16.png'],[32,'favicon-32x32.png'],[48,'favicon-48x48.png'],[180,'apple-touch-icon.png'],[192,'icon-192x192.png'],[512,'icon-512x512.png']]);
function pngSize(data){
 assert.deepEqual(data.subarray(0,8),Buffer.from([137,80,78,71,13,10,26,10]));
 assert.equal(data.toString('ascii',12,16),'IHDR');
 return [data.readUInt32BE(16),data.readUInt32BE(20)];
}
test('brand assets contain real RGB PNGs and all four D-version ICO frames',async()=>{
 for(const [size,name] of sizes){
  const data=await fs.readFile('web/assets/icons/'+name);
  assert.deepEqual(pngSize(data),[size,size]);assert.equal(data[24],8);assert.equal(data[25],2,'preserve the opaque RGB background');
 }
 const ico=await fs.readFile('web/assets/icons/favicon.ico');
 assert.equal(ico.readUInt16LE(0),0);assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),4);
 for(const [i,size] of [16,32,48,64].entries()){
  const entry=6+i*16,length=ico.readUInt32LE(entry+8),offset=ico.readUInt32LE(entry+12);
  assert.equal(ico[entry],size);assert.equal(ico[entry+1],size);assert.ok(offset>=70&&offset+length<=ico.length);
  assert.deepEqual(pngSize(ico.subarray(offset,offset+length)),[size,size]);
 }
});

test('public brand assets preserve approved bytes without depending on local design archives',async()=>{
 const inventory=JSON.parse(await fs.readFile('tests/fixtures/favicon-assets.json','utf8'));
 assert.equal(inventory.length,8);
 for(const item of inventory){
  const data=await fs.readFile(item.file);
  assert.equal(createHash('sha256').update(data).digest('hex'),item.sha256,item.file);
 }
 await assert.rejects(fs.access('Favicon'));
 await assert.rejects(fs.access('web/favicon.ico'));
});

test('all four page heads reference distinct size-qualified icons relative to the Pages subdirectory',async()=>{
 for(const name of ['index.html','work.html','reader.html','prototype.html']){
  const html=await fs.readFile('web/'+name,'utf8');
  const links=[...html.matchAll(/<link\b[^>]*\brel="(?:icon|apple-touch-icon)"[^>]*>/g)].map(m=>m[0]);
  assert.equal(links.length,4,name);assert.ok(!html.includes('href="data:,"'));
  const hrefs=links.map(link=>link.match(/href="([^"]+)"/)[1]);assert.equal(new Set(hrefs).size,4);
  for(const [i,href] of hrefs.entries()){
   assert.ok(!href.startsWith('/')&&!href.includes('://')&&!href.startsWith('data:'));
   assert.match(links[i],/\bsizes="[\dx ]+"/);await fs.access('web/'+href);
  }
 }
});
