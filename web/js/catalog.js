import {createProgressStore} from './progress.js';

export async function loadCatalog() {
  const response = await fetch(new URL('../data/works.json', import.meta.url));
  if (!response.ok) throw new Error('書庫資料暫時無法載入');
  const data = await response.json();
  if (data.schemaVersion !== 1 || !Array.isArray(data.works)) throw new Error('書庫資料格式無效');
  return data.works;
}
export function findWork(works,id) { return works.find(work => work.id === id); }
export function chapterUrl(work,chapter) { return `reader.html?work=${encodeURIComponent(work.id)}&chapter=${encodeURIComponent(chapter.id)}`; }
export function coverUrl(work) { return work.cover ? `content/${encodeURIComponent(work.id)}/${encodeURIComponent(work.cover)}` : null; }
export function progressStore() { let storage; try { storage=localStorage; } catch {} return createProgressStore(storage); }
export function validProgress(store,work) {
  const position=store.load(work.id);
  return work.chapters.some(chapter=>chapter.id===position?.chapterId) ? position : null;
}
export const statusText={upcoming:'即將上架',serializing:'連載中',complete:'已完結'};
