#!/usr/bin/env node
// download-wix-assets.js
//
// Script à exécuter une fois pour rapatrier en local toutes les images
// hébergées chez Wix (logos clients, photos témoignages, photos éclaireurs,
// bannières de formation, etc.). Le but : ne plus dépendre de static.wixstatic.com
// après la migration.
//
// Usage : node download-wix-assets.js
//
// Sortie : les fichiers sont rangés dans public/images/{logos,eclaireurs,testimonials,trainings,brand}/

import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';

// ---- À COMPLÉTER : map URL Wix → chemin local cible ----
// Récupérer les URLs originales en faisant clic droit > "Ouvrir l'image dans un nouvel onglet"
// sur chaque image du site Wix actuel. Garder l'URL SANS les paramètres /v1/fill/...
// (juste la partie .../media/d21a30_xxx~mv2.png)
const ASSETS = [
  // === Logo de marque ===
  {
    url: 'https://static.wixstatic.com/media/d21a30_cea4b835b89947e195db3e1d141abd60~mv2.png',
    out: 'public/images/brand/logo-purple.png',
  },
  {
    url: 'https://static.wixstatic.com/media/d21a30_0685d9e5d7784094a968139b402b7057~mv2.png',
    out: 'public/images/brand/logo.png',
  },

  // === Logos clients (à compléter manuellement) ===
  // Exemple :
  // { url: 'https://static.wixstatic.com/media/d21a30_e810bfc22cee4b47b187de05546fe796~mv2.png',
  //   out: 'public/images/logos/carrefour.png' },

  // === Photos éclaireurs (à compléter) ===
  // === Photos témoignages (à compléter) ===
  // === Bannières formations (à compléter) ===
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} on ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.writeFile(dest, Buffer.concat(chunks));
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Téléchargement de ${ASSETS.length} assets...`);
  for (const { url, out } of ASSETS) {
    try {
      await download(url, out);
      console.log(`  ✓ ${out}`);
    } catch (e) {
      console.error(`  ✗ ${out} — ${e.message}`);
    }
  }
  console.log('Terminé.');
}

main();
