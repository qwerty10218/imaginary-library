import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const prefix = '/imaginary-library/';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/') { res.writeHead(302, {Location: prefix}); res.end(); return; }
    if (!url.pathname.startsWith(prefix)) { res.writeHead(404); res.end(); return; }
    const file = path.resolve(root, decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html');
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    const data = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173/imaginary-library/'));
