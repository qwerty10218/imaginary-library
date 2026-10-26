// Categories are derived from the existing genres, never a second work list.
const categories = [
  {id:'youth',label:'青春／日常',matches:genre=>/青春|日常/.test(genre)},
  {id:'history',label:'歷史／架空',matches:genre=>/歷史|架空/.test(genre)},
  {id:'travel',label:'穿越／靈魂互換',matches:genre=>/穿越|靈魂互換/.test(genre)}
];
export function workCategories(work) {
  const ids=categories.filter(category=>(work.genres||[]).some(category.matches)).map(category=>category.id);
  return ids.length?ids:['other'];
}
export function availableCategories(works) {
  const used=new Set(works.flatMap(workCategories));
  return [{id:'all',label:'全部'},...categories.filter(category=>used.has(category.id)).map(({id,label})=>({id,label})),...(used.has('other')?[{id:'other',label:'其他'}]:[])];
}
export function recentReading(works,store) {
  return works.flatMap(work=>{
    const position=store.load(work.id);
    const chapter=work.chapters.find(chapter=>chapter.id===position?.chapterId);
    if(!chapter)return [];
    const complete=chapter===work.chapters.at(-1)&&position.percentage>=1;
    return complete?[]:[{work,chapter,position}];
  }).sort((a,b)=>(Date.parse(b.position.updatedAt)||0)-(Date.parse(a.position.updatedAt)||0));
}
