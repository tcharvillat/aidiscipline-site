# Charte graphique AI Discipline

Document de référence pour reproduire fidèlement l'identité visuelle du site Wix actuel.

## Couleurs

### Palette principale (à confirmer en pixel-pickant le site Wix actuel via l'inspecteur)

```css
:root {
  /* Violet/Mauve — couleur de marque dominante */
  --color-brand-primary: #6B4EFF;       /* Violet principal (à ajuster) */
  --color-brand-primary-dark: #4A2FE5;  /* Variante foncée pour hover */
  --color-brand-primary-light: #E8E2FF; /* Variante claire pour fonds */

  /* Noir / Gris (textes) */
  --color-text-primary: #0F0F1A;        /* Titres, textes principaux */
  --color-text-secondary: #4A4A5C;      /* Textes secondaires */
  --color-text-muted: #8A8A9E;          /* Légendes, métadonnées */

  /* Fonds */
  --color-bg-primary: #FFFFFF;          /* Fond principal */
  --color-bg-secondary: #F7F5FF;        /* Fond sections (très léger violet) */
  --color-bg-dark: #0F0F1A;             /* Fond sections sombres si besoin */

  /* Accents */
  --color-accent-yellow: #FFD93D;       /* Si présent dans l'identité */
  --color-border: #E5E5EE;              /* Bordures discrètes */
}
```

> **Action recommandée pour Claude Code :**
> Lance le site actuel dans Chrome → DevTools → utilise la pipette pour relever les couleurs exactes du logo violet, des CTA, des fonds. Mets à jour ce fichier avec les valeurs précises.

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

**Bouton primaire** (CTA principal) — fond violet, texte blanc :
```html
<a class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white font-medium hover:bg-brand-primary-dark transition-colors">
  Rejoindre la communauté
  <svg>→</svg>
</a>
```

**Bouton secondaire** — bordure violette, fond transparent :
```html
<a class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-primary text-brand-primary font-medium hover:bg-brand-primary-light transition-colors">
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
- Fond blanc ou très léger violet
- Photo ronde de l'auteur
- Citation en italique ou regular
- Nom + rôle + entreprise
- Logo entreprise discret

**Card éclaireur** :
- Photo ronde
- Nom
- Rôle (en violet ou couleur d'accent)
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

- **Logo principal** : `Logo Purple.png` — version violette sur fond clair (header)
- **Logo secondaire** : `Logo.png` — version utilisée dans le footer ou sur fond clair

À télécharger depuis Wix et placer dans `public/images/brand/`.

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

## Méthode pour extraire les valeurs exactes du site Wix

Pour avoir une fidélité maximale, je recommande à Claude Code d'utiliser cette procédure au démarrage :

1. Ouvrir https://www.aidiscipline.com dans Chrome
2. F12 → Inspector
3. Sélectionner le logo violet → relever la valeur RGB du premier pixel violet pur
4. Sélectionner un CTA principal → relever la couleur de fond exacte
5. Sélectionner un titre H1 → relever `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
6. Sélectionner un paragraphe → idem
7. Mettre à jour `tailwind.config.mjs` avec les valeurs exactes

> Alternative : Claude Code peut analyser le CSS via fetch des assets Wix et extraire les valeurs automatiquement. Demande-lui de le faire en première étape.
