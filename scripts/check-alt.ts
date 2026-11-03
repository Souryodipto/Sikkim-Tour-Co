import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/<img([^>]*?)>/gi)];
  for (const m of matches) {
    const attrs = m[1];
    if (!attrs.includes('alt=')) {
      console.log('MISSING ALT:', path.relative(rootDir, filePath), m[0].replace(/\s+/g, ' ').slice(0, 120));
    } else {
      const match = attrs.match(/alt=["'](.*?)["']/i);
      if (match && match[1].trim() === '') {
        console.log('EMPTY ALT STRING:', path.relative(rootDir, filePath), m[0].replace(/\s+/g, ' ').slice(0, 120));
      }
    }
  }
}

function scanDir(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        scanDir(full);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.html')) {
      checkFile(full);
    }
  }
}

scanDir(rootDir);
console.log('Check finished.');
