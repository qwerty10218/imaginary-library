import http from 'node:http';
import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const prefix = '/imaginary-library/';
const musicRoot = path.resolve('web/assets/music');
const musicMap = JSON.parse(await fs.readFile(new URL('./local-music.json',import.meta.url),'utf8'));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.mp3':'audio/mpeg','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon'};
async function sendAudio(req,res,file){
 const {size}=await fs.stat(file);
 const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
 const start=range?Number(range[1]):0;
 const end=range&&range[2]?Math.min(Number(range[2]),size-1):size-1;
 if(start>=size||end<start){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
 res.writeHead(range?206:200,{'Content-Type':'audio/mpeg','Accept-Ranges':'bytes','Content-Length':end-start+1,'Cache-Control':'no-store',...(range?{'Content-Range':`bytes ${start}-${end}/${size}`}:{})});
 createReadStream(file,{start,end}).pipe(res);
}
const server=http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/') { res.writeHead(302, {Location: prefix}); res.end(); return; }
    if (!url.pathname.startsWith(prefix)) { res.writeHead(404); res.end(); return; }
    const songId = url.pathname.match(/^\/imaginary-library\/local-audio\/([a-z-]+)\.mp3$/)?.[1];
    if (songId) {
      const filename=musicMap[songId];
      if (!filename) {res.writeHead(404);res.end('Unknown song');return;}
      const file=path.resolve(musicRoot,filename);
      if (path.dirname(file)!==musicRoot) throw new Error('Invalid audio path');
      await sendAudio(req,res,file);return;
    }
    const file = path.resolve(root, decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html');
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if(path.extname(file)==='.mp3'){await sendAudio(req,res,file);return;}
    const data = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(Number(process.env.PREVIEW_PORT||4173),'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}/imaginary-library/`));
