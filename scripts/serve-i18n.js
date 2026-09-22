#!/usr/bin/env node
// Local multi-locale dev server
// Usage: node scripts/serve-i18n.js
// Serves: http://localhost:4200/es/  http://localhost:4200/en/  http://localhost:4200/it/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4200;
const DIST = path.join(__dirname, '..', 'dist', 'rastreator-components', 'browser');
const LOCALES = ['es', 'en', 'it'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.json': 'application/json',
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(data);
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0]; // strip query string

  // Redirect root to default locale
  if (url === '/') {
    res.writeHead(302, { Location: '/es/' });
    res.end();
    return;
  }

  // Detect locale from URL
  const localeMatch = url.match(/^\/(es|en|it)(\/.*)?$/);
  if (!localeMatch) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const locale = localeMatch[1];
  const rest = localeMatch[2] || '/';
  const localeDir = path.join(DIST, locale);

  if (!fs.existsSync(localeDir)) {
    res.writeHead(503, { 'Content-Type': 'text/html' });
    res.end(`<h2>Locale "${locale}" not built yet.</h2><p>Run <code>npm run build:i18n</code> first.</p>`);
    return;
  }

  // Try to serve exact file, fallback to index.html for SPA routing
  let filePath = path.join(localeDir, rest);

  // Prevent path traversal
  if (!filePath.startsWith(localeDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
  } else {
    // SPA fallback: serve index.html
    serveFile(res, path.join(localeDir, 'index.html'));
  }
});

server.listen(PORT, () => {
  console.log(`\nMulti-locale server running at http://localhost:${PORT}\n`);
  LOCALES.forEach(l => console.log(`  ${l.toUpperCase()} → http://localhost:${PORT}/${l}/`));
  console.log('\nPress Ctrl+C to stop.\n');
});
