import test from 'node:test';
import assert from 'node:assert/strict';
import {createProgressStore,createSyncPort,PREFIX} from '../web/js/progress.js';
function storage() { const map=new Map([['last_chapter_id','9']]); return {map,getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)}; }
test('works with the same chapter ID retain independent positions and leave legacy storage untouched',()=>{
  const s=storage(),p=createProgressStore(s);
  p.save('a',{chapterId:'001',block:2,offset:5}); p.save('b',{chapterId:'001',block:8,offset:17});
  assert.equal(p.load('a').block,2); assert.equal(p.load('b').offset,17);
  assert.equal(s.map.get('last_chapter_id'),'9');
  assert.ok([...s.map.keys()].every(k=>k==='last_chapter_id'||k.startsWith(PREFIX)));
});
test('blocked storage remains readable in memory',()=>{
  const p=createProgressStore({getItem(){throw Error();},setItem(){throw Error();}});
  p.save('a',{chapterId:'001',block:2,offset:0}); assert.equal(p.load('a').block,2); assert.equal(p.available,false);
});
test('invalid or obsolete position fails safely',()=>{
  const s=storage(),p=createProgressStore(s);
  s.setItem(PREFIX+'progress:a','{'); assert.equal(p.load('a'),null);
  p.write('progress:a',{schemaVersion:0}); assert.equal(p.load('a'),null);
});
test('cloud port cannot contact any service',async()=>{
  const p=createSyncPort(); assert.equal(p.enabled,false); assert.deepEqual(await p.pull(),[]); assert.equal((await p.push()).status,'disabled');
});
