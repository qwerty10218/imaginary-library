export const PREFIX = 'imaginary-library:v1:';
export function createProgressStore(storage) {
  let available = true;
  const memory = new Map();
  function read(key) {
    try {
      const raw = storage?.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : memory.get(key) ?? null;
    } catch { available = false; return memory.get(key) ?? null; }
  }
  function write(key, value) {
    memory.set(key, value);
    try { if (!storage) throw new Error('Storage unavailable'); storage.setItem(PREFIX+key,JSON.stringify(value)); }
    catch { available = false; }
  }
  return {
    read, write,
    load(workId) {
      const p=read('progress:'+workId);
      return p?.schemaVersion===1 && typeof p.chapterId==='string' && Number.isInteger(p.block) && p.block>=0 && Number.isFinite(p.offset) && p.offset>=0 ? p : null;
    },
    save(workId, position) { write('progress:'+workId,{...position,schemaVersion:1,updatedAt:new Date().toISOString()}); },
    get available() {return available;}
  };
}
// Cloud adapters must be explicitly injected later. No SDK, endpoint or network operation.
export function createSyncPort() {
  return Object.freeze({enabled:false, async pull(){return [];}, async push(){return {status:'disabled'};}});
}
