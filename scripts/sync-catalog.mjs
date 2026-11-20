import { copyFileSync, mkdirSync } from 'node:fs';

// Root files are the source of truth; public/ holds the copies Vite ships as-is.
mkdirSync('public', { recursive: true });
for (const file of ['products.json', 'adminpanel.html']) {
  copyFileSync(file, `public/${file}`);
}
console.log('Synced products.json and adminpanel.html into the Vite public assets.');
