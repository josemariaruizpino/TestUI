#!/usr/bin/env node
// Merge new trans-units from messages.xlf into messages.{lang}.xlf
// Usage: node scripts/merge-i18n.js
// To also auto-translate: node scripts/merge-i18n.js --translate

const fs = require('fs');
const path = require('path');

const LOCALE_DIR = path.join(__dirname, '..', 'src', 'locale');
const SOURCE_FILE = path.join(LOCALE_DIR, 'messages.xlf');
const LANGUAGES = ['en', 'it'];

function extractTransUnits(content) {
  const units = {};
  const regex = /<trans-unit id="([^"]+)"[\s\S]*?<\/trans-unit>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    units[match[1]] = match[0];
  }
  return units;
}

function extractSource(transUnit) {
  const match = transUnit.match(/<source>([\s\S]*?)<\/source>/);
  return match ? match[1] : '';
}

function mergeIntoTarget(sourcePath, targetPath, lang) {
  const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
  const sourceUnits = extractTransUnits(sourceContent);

  let targetContent;
  let targetUnits = {};

  if (fs.existsSync(targetPath)) {
    targetContent = fs.readFileSync(targetPath, 'utf-8');
    targetUnits = extractTransUnits(targetContent);
  } else {
    // Create a new file based on the source structure
    targetContent = sourceContent
      .replace(/source-language="[^"]*"/, `source-language="es" target-language="${lang}"`);
  }

  let added = 0;

  for (const [id, unit] of Object.entries(sourceUnits)) {
    if (targetUnits[id]) continue; // already translated

    const sourceText = extractSource(unit);
    const newUnit = unit
      .replace(/<\/source>/, `</source>\n        <target state="new">${sourceText}</target>`);

    // Insert before closing </body>
    targetContent = targetContent.replace('</body>', `  ${newUnit}\n    </body>`);
    added++;
    console.log(`  [${lang}] Added: "${sourceText.trim().slice(0, 60)}${sourceText.trim().length > 60 ? '…' : ''}"`);
  }

  // Fix target-language attribute if missing
  if (!targetContent.includes(`target-language="${lang}"`)) {
    targetContent = targetContent.replace(
      /source-language="[^"]*"/,
      `source-language="es" target-language="${lang}"`
    );
  }

  fs.writeFileSync(targetPath, targetContent, 'utf-8');
  return added;
}

console.log('Merging translations...\n');

for (const lang of LANGUAGES) {
  const targetPath = path.join(LOCALE_DIR, `messages.${lang}.xlf`);
  const added = mergeIntoTarget(SOURCE_FILE, targetPath, lang);
  console.log(`[${lang}] Done — ${added} new string(s) added.\n`);
}

console.log('Merge complete. Review <target state="new"> entries to add translations.');
