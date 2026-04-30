# AI Discipline — site

Site officiel d'AI Discipline (marque commerciale de Discovery Discipline SAS),
organisme de formation IA pour les équipes Produit & Design.

Migration en cours depuis Wix vers une stack autonome
(Astro + Tailwind v4, déploiement Vercel).

---

## Stack

- **Framework** : [Astro 6](https://astro.build) (rendu statique)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com) via le plugin `@tailwindcss/vite`
- **Langage** : TypeScript (mode `strict`)
- **Hébergement** cible : Vercel
- **Données** : fichiers JSON dans `src/data/` (formations, éclaireurs, témoignages, FAQ)

## Commandes

| Commande           | Effet                                                     |
| ------------------ | --------------------------------------------------------- |
| `npm install`      | Installe les dépendances                                  |
| `npm run dev`      | Lance le serveur de dev sur `http://localhost:4321`       |
| `npm run build`    | `astro check` (typecheck) puis build statique dans `dist/`|
| `npm run preview`  | Sert le build local pour vérification avant déploiement    |
| `npm run astro …`  | Accès direct au CLI Astro (`astro add`, `astro info`, …)  |

> Sur certaines machines avec un cache npm corrompu, ajouter
> `--cache /tmp/npm-cache-aidiscipline` à `npm install`.

## Architecture

```
aidiscipline-site/
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── sections/    # Hero, OnlineSessions, Founders, FAQ, …
│   │   └── ui/          # Button, Card, LogoCarousel, …
│   ├── data/            # JSON : trainings, eclaireurs, testimonials, faq
│   ├── layouts/         # BaseLayout.astro (head, SEO, fonts)
│   ├── pages/           # Routage fichier (index.astro = "/")
│   └── styles/
│       └── global.css   # @import "tailwindcss" + @config + tokens CSS
├── public/
│   ├── images/
│   │   ├── brand/        # Logo AI Discipline (rose #FC037E, dark)
│   │   ├── logos/        # Logos clients (Carrefour, Decathlon, …)
│   │   ├── eclaireurs/   # Portraits des éclaireurs
│   │   ├── testimonials/ # Photos témoignages
│   │   └── trainings/    # Bannières formations
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.mjs   # Tokens design (couleurs, typo, animations)
├── tsconfig.json         # Étend astro/tsconfigs/strict
└── package.json
```

### Pages prévues (URLs préservées pour le SEO)

| URL                         | Fichier                                |
| --------------------------- | -------------------------------------- |
| `/`                         | `src/pages/index.astro`                |
| `/formation-ia`             | `src/pages/formation-ia.astro`         |
| `/formation-sur-mesure`     | `src/pages/formation-sur-mesure.astro` |
| `/terms-and-conditions`     | `src/pages/terms-and-conditions.astro` |

### Tailwind v4 — note de configuration

Le projet utilise Tailwind v4 via `@tailwindcss/vite`. Les tokens de design
(`brand`, `ink`, `surface`, `font-display`, animations…) sont définis dans
`tailwind.config.mjs` (style v3) et chargés via la directive `@config` au début
de `src/styles/global.css`. Cette approche permet de garder une source unique
pour la palette tant qu'on n'a pas migré vers la syntaxe `@theme` native v4.

## Ajouter une formation

1. Ouvrir `src/data/trainings.json`.
2. Dupliquer un objet existant et compléter les champs :
   - `id` : identifiant unique (kebab-case)
   - `title`, `description` : copywriting
   - `mavenUrl` : URL de la fiche sur `https://maven.com/aidiscipline/...`
   - `image` : nom de fichier dans `public/images/trainings/`
   - autres métadonnées (durée, prix, niveau…)
3. Déposer la bannière dans `public/images/trainings/`.
4. Vérifier avec `npm run dev` que la formation apparaît dans le catalogue.
5. Commit + push : Vercel redéploie automatiquement.

> Même logique pour les éclaireurs (`eclaireurs.json` + `public/images/eclaireurs/`),
> les témoignages (`testimonials.json` + `public/images/testimonials/`) et la FAQ.

## Intégrations externes

- **Inscription Slack** → <https://discovery-discipline.typeform.com/aidiscipline>
- **Rendez-vous Rémi** → <https://calendly.com/remi-guyot/30min>
- **Catalogue formations** → `https://maven.com/aidiscipline/...` (par formation)
- **LinkedIn** → <https://www.linkedin.com/company/ai-discipline/>

Le formulaire de contact (Resend ou Formspree) sera branché en V1 avec une
variable d'environnement `CONTACT_EMAIL_TO`.

## Déploiement (Vercel)

1. Pousser sur GitHub : `tcharvillat/aidiscipline-site`.
2. Sur Vercel, importer le repo. Build command : `npm run build`,
   output directory : `dist/`.
3. Le déploiement est automatique sur push `main` ; chaque PR génère un preview.
4. Le domaine `aidiscipline.com` sera transféré depuis Wix dans une étape
   ultérieure.

## Documentation interne

- `CLAUDE.md` — brief de migration (à destination de Claude Code)
- `docs/CHARTE-GRAPHIQUE.md` — palette, typo, composants, animations
- `docs/PROMPTS-CLAUDE-CODE.md` — prompts utilisés pour piloter la migration
