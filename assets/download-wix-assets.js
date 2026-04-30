#!/usr/bin/env node
// download-wix-assets.js
//
// Rapatrie en local toutes les images hébergées chez Wix (logos clients,
// photos témoignages, photos éclaireurs, bannières de formation, fondateurs).
// But : ne plus dépendre de static.wixstatic.com après la migration.
//
// Usage : node assets/download-wix-assets.js   (depuis la racine du projet)

import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';

const ASSETS = [
  // === Logos de marque ===
  { url: 'https://static.wixstatic.com/media/d21a30_cea4b835b89947e195db3e1d141abd60~mv2.png', out: 'public/images/brand/logo-purple.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_0685d9e5d7784094a968139b402b7057~mv2.png', out: 'public/images/brand/logo.png' },

  // === Logos clients (carrousels) ===
  { url: 'https://static.wixstatic.com/media/d21a30_e4660338c8de41c2bce9bd117379ec56~mv2.png', out: 'public/images/logos/logo1.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_4f34951648ff4e09ab1df3643db6d1c8~mv2.png', out: 'public/images/logos/logo2.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_0d3eb4637f2a47599338ad73a82cc386~mv2.png', out: 'public/images/logos/logo3.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_e8c3237972f1429da5a104baee3494e4~mv2.png', out: 'public/images/logos/logo4.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_b0e7e57ce8c04f22b69d2709bca08a55~mv2.png', out: 'public/images/logos/logo5.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_4a5c7d41414642a999d00faf70af7241~mv2.png', out: 'public/images/logos/logo6.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_13554f584c964d538429d88f0b0c21be~mv2.png', out: 'public/images/logos/logo7.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_147fc548a9244785afdd29cbd5fe4486~mv2.png', out: 'public/images/logos/logo8.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_e810bfc22cee4b47b187de05546fe796~mv2.png', out: 'public/images/logos/logo9.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_30b41ef78a0e433b919489d20d9daae4~mv2.png', out: 'public/images/logos/logo10.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_8d81bf5f683840e083e48306026a7831~mv2.png', out: 'public/images/logos/logo11.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_f241fcba18b54854a2ecfcd29f493e22~mv2.png', out: 'public/images/logos/logo12.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_35d908adf71b4f9ba74cff5fcdbd8bab~mv2.png', out: 'public/images/logos/logo13.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_648d85f1d48940378fe35c67b67d593f~mv2.png', out: 'public/images/logos/logo14.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_807882b2c5d748feb401e64130624f7c~mv2.png', out: 'public/images/logos/logo15.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_325565417e4148689900d239dfc9de55~mv2.png', out: 'public/images/logos/logo16.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_399f6752cb5842fda28fa05c3248294d~mv2.png', out: 'public/images/logos/logo17.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_60b22535fd894d62b195a9cb32b45a4c~mv2.png', out: 'public/images/logos/logo18.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_cc83c39fa76e4a2a80586250b7803085~mv2.png', out: 'public/images/logos/logo19.png' },

  // === Photos témoignages ===
  { url: 'https://static.wixstatic.com/media/abd348_c42ef21a9b3c4f6286f4042442108e96~mv2.jpg',  out: 'public/images/testimonials/audeline-maire.jpg' },
  { url: 'https://static.wixstatic.com/media/d21a30_47d39934c2e14b7a971ea845102246c0~mv2.webp', out: 'public/images/testimonials/meriem-oheix.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_a135dbac0f0c49a5a815277fa6f836db~mv2.jpeg', out: 'public/images/testimonials/hassen-taourirt.jpeg' },
  { url: 'https://static.wixstatic.com/media/d21a30_9386f6baf4534c68a1b0bf747a8a190a~mv2.webp', out: 'public/images/testimonials/christophe-delalande.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_14674f1569bb4e67bdf5db996d32e096~mv2.webp', out: 'public/images/testimonials/eleonore-de-lusignan.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_b47281b135b044859bbbab9be293c624~mv2.webp', out: 'public/images/testimonials/joffrey-mougel.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_c5fe4240b86e43a6b31f6f2b65af0d6b~mv2.webp', out: 'public/images/testimonials/agathe-lecoq.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_d1570ffaa4cf49f4bf13333bb7362bcd~mv2.webp', out: 'public/images/testimonials/adrien-subitte.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_2dd3f840596f4845ae413e223e83505c~mv2.webp', out: 'public/images/testimonials/marion-hurel.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_ab54386b36504c6f91ec63b55c8691c7~mv2.webp', out: 'public/images/testimonials/camille-lehurt.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_a176e71506c544a9aa56dd0f2a6904e4~mv2.webp', out: 'public/images/testimonials/benoit-plomion.webp' },
  { url: 'https://static.wixstatic.com/media/d21a30_319a0d566a4d4517b88590d81e420770~mv2.webp', out: 'public/images/testimonials/patricia-marques.webp' },
  { url: 'https://static.wixstatic.com/media/abd348_3abe29c3668d49d9addf5125bb00c2d8~mv2.jpg',  out: 'public/images/testimonials/julien-clement.jpg' },

  // === Photos éclaireurs ===
  { url: 'https://static.wixstatic.com/media/abd348_7941654ff7ff40318e200944f7f44663~mv2.png', out: 'public/images/eclaireurs/marion-jachimski.png' },
  { url: 'https://static.wixstatic.com/media/abd348_879d9f8c22fb415d8a5ca7d506f3dfec~mv2.png', out: 'public/images/eclaireurs/geraldine-corrales.png' },
  { url: 'https://static.wixstatic.com/media/abd348_99b902bb0ab6435d8d4b4c4369e0fcdc~mv2.png', out: 'public/images/eclaireurs/vincent-gadanho.png' },
  { url: 'https://static.wixstatic.com/media/abd348_d4a0cc7b38d045a2a07170a8d1fe656b~mv2.png', out: 'public/images/eclaireurs/pantea-negui.png' },
  { url: 'https://static.wixstatic.com/media/abd348_13af4649b13b413f9131eafcaeaf343e~mv2.png', out: 'public/images/eclaireurs/katia-cadet.png' },
  { url: 'https://static.wixstatic.com/media/abd348_d488a0386423416e86029a4c90d87fa5~mv2.png', out: 'public/images/eclaireurs/nicola-carli.png' },
  { url: 'https://static.wixstatic.com/media/abd348_30cca4ea50a349ab81588686d1a23cad~mv2.png', out: 'public/images/eclaireurs/cecile-poulelaouen.png' },
  { url: 'https://static.wixstatic.com/media/abd348_b5cc4af2230840b78848670b48004fe3~mv2.png', out: 'public/images/eclaireurs/julie-robles.png' },
  { url: 'https://static.wixstatic.com/media/abd348_b12b2d6f727e4e9890fca14c9f656019~mv2.png', out: 'public/images/eclaireurs/laurent-billon.png' },
  { url: 'https://static.wixstatic.com/media/abd348_1152ea9a01ed4627b98d35a408f09f2a~mv2.png', out: 'public/images/eclaireurs/terry-michel.png' },
  { url: 'https://static.wixstatic.com/media/abd348_0d05b0687a1640f69b5fd73537e648d4~mv2.png', out: 'public/images/eclaireurs/hugo-huet-leroy.png' },
  { url: 'https://static.wixstatic.com/media/abd348_9b8f1b51153b4c53b1760abdd06c6b5c~mv2.png', out: 'public/images/eclaireurs/sebastien-merle.png' },
  { url: 'https://static.wixstatic.com/media/abd348_1846686c500d40bdbec49c281760be8f~mv2.png', out: 'public/images/eclaireurs/patricia-marques.png' },
  { url: 'https://static.wixstatic.com/media/abd348_22f2ac9c5d034a2d83ece3ee782b47c1~mv2.png', out: 'public/images/eclaireurs/yann-rapaport.png' },
  { url: 'https://static.wixstatic.com/media/abd348_1e297e137fef44ef8959d1376ac60172~mv2.png', out: 'public/images/eclaireurs/matthieu-willaime.png' },

  // === Bannières formations ===
  { url: 'https://static.wixstatic.com/media/abd348_072ab569594e45d5b2e80e2ae5d401ab~mv2.jpg', out: 'public/images/trainings/genai-for-product.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_ca346ca833a64fc68cb6fdfb8f387b4d~mv2.jpg', out: 'public/images/trainings/claude-code.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_de453af3e3a34e4ca2e1e842943f96c0~mv2.jpg', out: 'public/images/trainings/entretiens.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_468dcda5929a473bb903b0be1e4f08d6~mv2.jpg', out: 'public/images/trainings/veille.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_de3b2adf2bcf4bcba6cd6350d0245190~mv2.jpg', out: 'public/images/trainings/feedbacks.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_e4d417824687478d80ecaecb4dfc4ad4~mv2.jpg', out: 'public/images/trainings/specs.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_d120aec613a34b279d4245f2c0d05709~mv2.jpg', out: 'public/images/trainings/qa.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_0a49dfb717c14d40aa06931a6e47ef87~mv2.jpg', out: 'public/images/trainings/delivery.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_d598653d9fd7401d93040b82c162c092~mv2.jpg', out: 'public/images/trainings/guide-entretien.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_3a926ecce92e43caa5fa24017bdb37d5~mv2.jpg', out: 'public/images/trainings/figma.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_505d7e0ca85f4cf59f8d3d2c721e0f11~mv2.jpg', out: 'public/images/trainings/vibe-coding.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_faf1472217c543dc947dd5bf7bab0caa~mv2.jpg', out: 'public/images/trainings/prototypes-identite.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_766a7f3433d6403fb72410cdbff28b76~mv2.jpg', out: 'public/images/trainings/codebase.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_bad70b31cb3a43379fea5e569aa0f6bc~mv2.jpg', out: 'public/images/trainings/strategie.jpg' },
  { url: 'https://static.wixstatic.com/media/abd348_4f6c2e1ada1d4d67b93364599c681960~mv2.jpg', out: 'public/images/trainings/persona-ia.jpg' },

  // === Fondateurs et autres images de marque ===
  { url: 'https://static.wixstatic.com/media/abd348_574dc593647c4f99b7a4b2b94db269e4~mv2.png',  out: 'public/images/brand/fondateurs.png' },
  { url: 'https://static.wixstatic.com/media/abd348_dfaa65c9c1314474a5b1f9f0b3c75c1d~mv2.png',  out: 'public/images/brand/fondateurs-mobile.png' },
  { url: 'https://static.wixstatic.com/media/abd348_dc654861f10b40508404d7dedd20db90~mv2.png',  out: 'public/images/brand/cohort.png' },
  { url: 'https://static.wixstatic.com/media/abd348_9f4e577c1c474f19bb1591399d52c26d~mv2.png',  out: 'public/images/brand/genie.png' },
  { url: 'https://static.wixstatic.com/media/d21a30_d231219e32204c998ab854e9bf937ac5~mv2.jpeg', out: 'public/images/brand/communaute.jpeg' },
];

const CONCURRENCY = 8;

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    https
      .get(url, { headers: { 'User-Agent': 'aidiscipline-asset-importer/1.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          res.resume();
          return download(res.headers.location, dest, redirects + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', async () => {
          const buf = Buffer.concat(chunks);
          if (buf.length === 0) return reject(new Error('empty body'));
          await fs.mkdir(path.dirname(dest), { recursive: true });
          await fs.writeFile(dest, buf);
          resolve(buf.length);
        });
      })
      .on('error', reject);
  });
}

async function runWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

async function main() {
  console.log(`Téléchargement de ${ASSETS.length} assets (concurrence ${CONCURRENCY})...\n`);

  const results = await runWithConcurrency(ASSETS, CONCURRENCY, async (asset) => {
    try {
      const size = await download(asset.url, asset.out);
      return { ok: true, size, ...asset };
    } catch (e) {
      return { ok: false, error: e.message, ...asset };
    }
  });

  const ok = results.filter((r) => r.ok);
  const ko = results.filter((r) => !r.ok);

  for (const r of results) {
    if (r.ok) console.log(`  ✓ ${r.out}  (${(r.size / 1024).toFixed(1)} KB)`);
    else      console.log(`  ✗ ${r.out}  — ${r.error}`);
  }

  console.log(`\nSuccès : ${ok.length}/${ASSETS.length}`);
  if (ko.length) {
    console.log(`Échecs  : ${ko.length}`);
    process.exitCode = 1;
  }
}

main();
