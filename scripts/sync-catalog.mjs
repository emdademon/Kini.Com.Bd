import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('public', { recursive: true });
copyFileSync('products.json', 'public/products.json');
console.log('Synced products.json into the Vite public assets.');
