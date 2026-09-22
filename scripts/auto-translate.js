#!/usr/bin/env node
// Auto-translate <target state="new"> entries in .xlf files using Google Translate (no API key needed)
// Usage: node scripts/auto-translate.js
// Translates all state="new" targets in messages.en.xlf and messages.it.xlf

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOCALE_DIR = path.join(__dirname, '..', 'src', 'locale');
const TARGETS = [
  { file: 'messages.en.xlf', lang: 'en' },
  { file: 'messages.it.xlf', lang: 'it' },
];

// Extract text nodes and <x .../> placeholders from xliff source content
// Returns { text: string for translation, map: fn to restore placeholders }
function xliffToText(content) {
  const placeholders = [];
  // Replace <x .../> tags with tokens so Google Translate doesn't mangle them
  const text = content.replace(/<x [^/]*\/>/g, (match) => {
    const token = `__PH${placeholders.length}__`;
    placeholders.push({ token, tag: match });
    return token;
  });
  const restore = (translated) =>
    placeholders.reduce((s, p) => s.replace(p.token, p.tag), translated);
  return { text, restore };
}

function googleTranslate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encoded}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const translated = parsed[0].map((part) => part[0]).join('');
          resolve(translated);
        } catch {
          reject(new Error(`Failed to parse response: ${data.slice(0, 200)}`));
        }
      });
    }).on('error', reject);
  });
}

async function processFile(filename, lang) {
  const filePath = path.join(LOCALE_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Match all <target state="new">...</target>
  const regex = /(<target state="new">)([\s\S]*?)(<\/target>)/g;
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) {
    console.log(`[${lang}] No pending translations. ✓`);
    return;
  }

  console.log(`[${lang}] Translating ${matches.length} string(s)...`);

  for (const match of matches) {
    const [full, open, sourceContent, close] = match;
    const { text, restore } = xliffToText(sourceContent.trim());

    if (!text) continue;

    try {
      const translated = await googleTranslate(text, lang);
      const restored = restore(translated);
      // Replace state="new" with state="translated" and set translation
      const replacement = `<target>${restored}</target>`;
      content = content.replace(full, replacement);
      console.log(`  ✓ "${text.slice(0, 50)}${text.length > 50 ? '…' : ''}" → "${restored.slice(0, 50)}${restored.length > 50 ? '…' : ''}"`);
      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 150));
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[${lang}] Done.\n`);
}

(async () => {
  for (const { file, lang } of TARGETS) {
    await processFile(file, lang);
  }
  console.log('Auto-translation complete. Review the results before committing.');
})();
