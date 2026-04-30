# Charte graphique AI Discipline

Document de référence pour reproduire fidèlement l'identité visuelle du site Wix actuel.

## Couleurs

### Palette principale

La couleur de marque est un **rose/fuchsia** (et non un violet, contrairement à
ce qu'indiquaient les premières estimations). Source vérifiée par le fondateur :
le logo, les CTA et les accents utilisent `#FC037E`.

```css
:root {
  /* Rose/Fuchsia — couleur de marque dominante */
  --color-brand-primary: #FC037E;       /* Rose principal (logo, CTA) */
  --color-brand-primary-dark: #B10257;  /* Variante foncée pour hover */
  --color-brand-primary-light: #FFD6EA; /* Variante claire pour fonds */

  /* Noir / Gris (textes) */
  --color-text-primary: #0F0F1A;        /* Titres, textes principaux */
  --color-text-secondary: #4A4A5C;      /* Textes secondaires */
  --color-text-muted: #8A8A9E;          /* Légendes, métadonnées */

  /* Fonds */
  --color-bg-primary: #FFFFFF;          /* Fond principal */
  --color-bg-secondary: #FFF0F8;        /* Fond sections (très léger rose) */
  --color-bg-dark: #0F0F1A;             /* Fond sections sombres si besoin */

  /* Accents */
  --color-accent-yellow: #FFD93D;       /* Si présent dans l'identité */
  --color-border: #E5E5EE;              /* Bordures discrètes */
}
```

### Échelle Tailwind `brand` (50 → 900)

L'échelle est dérivée de `#FC037E` en faisant varier la luminosité HSL
(teinte 330°, saturation ~98%). Définie dans `tailwind.config.mjs` :

| Token        | Hex       | Usage type                                  |
| ------------ | --------- | ------------------------------------------- |
| `brand-50`   | `#FFF0F8` | Fonds de section très clairs                |
| `brand-100`  | `#FFD6EA` | Badges, surlignages doux                    |
| `brand-200`  | `#FEB1D7` | Bordures, séparateurs accentués             |
| `brand-300`  | `#FE80BC` | États hover sur fonds clairs                |
| `brand-400`  | `#FE45A0` | Accents secondaires                         |
| `brand-500`  | `#FC037E` | **CTA principaux, logo, liens**             |
| `brand-600`  | `#DA026B` | Hover de `brand-500`                        |
| `brand-700`  | `#B10257` | Texte sur fond clair (contraste AA)         |
| `brand-800`  | `#880143` | Texte sur fond très clair                   |
| `brand-900`  | `#5F002F` | Très foncé, rarement utilisé                |

## Typographie

Le site Wix utilise probablement une typographie sans-serif moderne. À confirmer via DevTools.

```css
:root {
  --font-display: 'Inter', 'Helvetica Neue', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

### Échelle typographique (approximative, à ajuster)

| Usage | Taille (desktop) | Taille (mobile) | Weight |
|---|---|---|---|
| Hero title (H1) | 56-64px | 36-40px | 700 |
| Section title (H2) | 40-48px | 28-32px | 700 |
| Subsection (H3) | 28-32px | 22-24px | 600 |
| Card title (H4) | 20-24px | 18-20px | 600 |
| Body | 16-18px | 16px | 400 |
| Small | 14px | 14px | 400 |

## Composants UI

### Boutons

**Bouton primaire** (CTA principal) — fond rose, texte blanc :
```html
<a class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
  Rejoindre la communauté
  <svg>→</svg>
</a>
```

**Bouton secondaire** — bordure rose, fond transparent :
```html
<a class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-500 text-brand-500 font-medium hover:bg-brand-50 transition-colors">
  Prendre rendez-vous
  <svg>→</svg>
</a>
```

> Les boutons sont **arrondis (pill-shaped)** sur le site actuel — utiliser `rounded-full`.

### Cards

**Card de formation** (catalogue) :
- Fond blanc
- Border-radius : ~16px (`rounded-2xl`)
- Ombre douce (`shadow-md` ou `shadow-lg`)
- Padding interne généreux
- Bannière/image en haut, badge prix, titre, description, bouton "Voir la formation"

**Card témoignage** :
- Fond blanc ou très léger rose (`bg-brand-50`)
- Photo ronde de l'auteur
- Citation en italique ou regular
- Nom + rôle + entreprise
- Logo entreprise discret

**Card éclaireur** :
- Photo ronde
- Nom
- Rôle (en rose `text-brand-500` ou couleur d'accent)
- Bio courte (2-3 lignes)

### Carrousels de logos clients

Le site actuel affiche **deux bandeaux de logos qui défilent** (auto-scroll horizontal) :
- Bandeau 1 : ~9 logos (Carrefour, Décathlon, Meetic, ADEO, PayFit, etc.)
- Bandeau 2 : ~10 logos (autres clients)

**Implémentation Astro** : utiliser une animation CSS `@keyframes` pour le défilement infini (technique du double-render).

## Iconographie

- Flèches : trait fin, style minimaliste (probablement Lucide ou Phosphor)
- Icônes de section : style outline, cohérent
- Recommandation : utiliser **lucide-icons** (compatible Astro via `astro-icon` ou intégration directe)

## Logo

- **Logo principal** : version rose `#FC037E` sur fond clair (header)
- **Logo secondaire** : version utilisée dans le footer ou sur fond clair

À télécharger depuis Wix et placer dans `public/images/brand/`. Les fichiers
récupérés depuis Wix peuvent encore s'appeler `Logo Purple.png` malgré la
couleur rose réelle — renommer en `logo-pink.svg` / `logo-pink-dark.svg` à la
volée pour éviter la confusion.

## Animations & micro-interactions

- **Carrousel logos** : défilement horizontal continu (~30-40s par cycle)
- **Carrousel témoignages** : navigation par flèches + auto-play optionnel
- **Hover sur cards** : élévation légère (`shadow-xl` au hover) + translation Y de -2px
- **Hover sur boutons** : assombrissement de la couleur de fond
- **Pas d'animations lourdes** : rester sobre et professionnel

## Layout & espacement

- **Container max-width** : `max-w-6xl` (~1152px) ou `max-w-7xl` (~1280px) selon section
- **Padding horizontal** : `px-6 md:px-8 lg:px-12`
- **Espacement vertical entre sections** : `py-16 md:py-24` (généreux)
- **Espacement entre éléments** : utiliser `space-y-*` et `gap-*` de Tailwind

## Méthode pour extraire les valeurs exactes restantes (typo, etc.)

La couleur de marque est figée à `#FC037E`. Reste à valider la typographie et
les valeurs précises de tailles/espacements via DevTools :

1. Ouvrir https://www.aidiscipline.com dans Chrome
2. F12 → Inspector
3. Sélectionner un titre H1 → relever `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
4. Sélectionner un paragraphe → idem
5. Mettre à jour `tailwind.config.mjs` (section `fontFamily` / `fontSize`) avec les valeurs exactes

> Alternative : analyser le CSS via fetch des assets Wix et extraire les valeurs automatiquement.
