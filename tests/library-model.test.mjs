import test from 'node:test';
import assert from 'node:assert/strict';
import {workCategories,availableCategories,recentReading} from '../web/js/library-model.js';
import {createProgressStore} from '../web/js/progress.js';

test('categories follow genres and allow a work in more than one filter',()=>{
  const history={genres:['架空歷史','穿越']},youth={genres:['青春小說','台灣日常']};
  assert.deepEqual(workCategories(history),['history','travel']);
  assert.deepEqual(workCategories(youth),['youth']);
  assert.deepEqual(workCategories({genres:['散文']}),['other']);
  assert.deepEqual(availableCategories([history,youth]).map(c=>c.id),['all','youth','history','travel']);
  assert.deepEqual(availableCategories([]).map(c=>c.id),['all']);
});

test('recent reading sorts timestamps, hides finished/stale entries and never writes progress',()=>{
  const saved=new Map();const storage={getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)};
  const store=createProgressStore(storage);
  const works=['older','newer','finished','stale'].map(id=>({id,chapters:[{id:'001'},{id:'002'}]}));
  for(const [index,work] of works.entries())storage.setItem('imaginary-library:v1:progress:'+work.id,JSON.stringify({schemaVersion:1,chapterId:index===3?'removed':index===2?'002':'001',block:2,offset:4,percentage:index===2?1:.4,updatedAt:`2026-10-${25+index}T00:00:00Z`}));
  const before=[...saved];
  assert.deepEqual(recentReading(works,store).map(p=>p.work.id),['newer','older']);
  assert.deepEqual([...saved],before);
});
