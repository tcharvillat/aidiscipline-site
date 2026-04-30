# Prompt de démarrage pour Claude Code

Voici le prompt à coller à Claude Code après avoir créé un dossier `aidiscipline-site/` vide et y avoir copié les fichiers `CLAUDE.md`, `docs/CHARTE-GRAPHIQUE.md` et le dossier `assets/` du kit.

---

## PROMPT 1 — Setup initial du projet

```
Lis d'abord les fichiers `CLAUDE.md` et `docs/CHARTE-GRAPHIQUE.md` à la racine du projet.

Ils contiennent le brief complet pour la migration du site aidiscipline.com depuis Wix vers Astro.

Une fois lus, exécute la phase d'initialisation :

1. Initialise un projet Astro avec TypeScript strict + Tailwind CSS v4 (utilise `npm create astro@latest .` avec les bons flags ; je t'autorise à installer les dépendances).
2. Configure Tailwind en réutilisant le contenu de `assets/tailwind.config.mjs` que je te fournis.
3. Crée la structure de dossiers décrite dans CLAUDE.md (src/components/{layout,sections,ui}, src/data, src/pages, src/layouts, public/images/{brand,logos,eclaireurs,testimonials,trainings}).
4. Copie les fichiers JSON de `assets/` (trainings.json, eclaireurs.json, testimonials.json, faq.json) dans `src/data/`.
5. Crée un README.md à la racine avec : commandes (dev, build, preview), architecture, comment ajouter une formation, comment déployer.
6. Initialise un repo Git avec un .gitignore Astro standard et fais un premier commit "chore: initial Astro setup".

À la fin, donne-moi un résumé de ce qui a été créé et dis-moi quoi faire ensuite.
```

---

## PROMPT 2 — Extraction de la charte graphique réelle

À lancer après le PROMPT 1, pour avoir des couleurs/typo exactes et pas estimées.

```
On va maintenant calibrer la charte graphique sur le site Wix actuel pour avoir une fidélité parfaite.

Récupère les valeurs réelles depuis https://www.aidiscipline.com :

1. Fetch la page d'accueil et extrais :
   - Toutes les couleurs hex apparaissant dans le CSS inline et les feuilles de style chargées
   - La/les `font-family` réellement utilisée(s) pour les titres et le corps
   - Les tailles de police des H1, H2, H3 et du body
   - Les border-radius des boutons et des cards
2. Identifie les 3-5 couleurs dominantes (violet de marque, gris de texte, blanc de fond, etc.)
3. Mets à jour `tailwind.config.mjs` et `src/styles/global.css` avec ces valeurs exactes
4. Crée un fichier `docs/design-tokens.md` qui documente les valeurs trouvées et leur source

Si tu n'arrives pas à extraire automatiquement certaines valeurs (par exemple à cause du CSS minifié de Wix), liste-moi les valeurs manquantes et je te les fournirai en pixel-pickant moi-même.
```

---

## PROMPT 3 — Construction des composants de base

```
Construis les composants de layout et UI réutilisables :

1. `src/layouts/BaseLayout.astro` :
   - Props : title, description, ogImage, canonicalURL
   - Inclut <head> complet (meta, OG, favicon, fonts)
   - Slot pour le contenu

2. `src/components/layout/Header.astro` :
   - Logo violet à gauche (lien vers /)
   - Nav : Accueil, Formations en ligne, Formations sur mesure
   - CTA "Rejoindre la communauté" (pill, violet) → typeform
   - Version mobile : menu hamburger

3. `src/components/layout/Footer.astro` :
   - Logo + tagline "Formation IA et communauté Slack"
   - Liens nav (Accueil, Formations IA, Mentions légales)
   - Icônes LinkedIn + Slack
   - Mention légale : "© 2026 AI Discipline — Discovery Discipline SAS — SIRET 912 638 533 00014 — Déclaration d'activité n°11756928875 auprès du préfet de la région Île-de-France."

4. `src/components/ui/Button.astro` :
   - Variants : primary (fond violet, texte blanc), secondary (bordure violette, fond transparent)
   - Sizes : md, lg
   - Pill-shaped (rounded-full)
   - Icône flèche optionnelle à droite

5. `src/components/ui/TestimonialCard.astro` :
   - Photo ronde, citation, nom, rôle, entreprise, logo entreprise

6. `src/components/ui/EclaireurCard.astro` :
   - Photo ronde, nom, rôle, bio courte

7. `src/components/ui/TrainingCard.astro` :
   - Bannière, badge prix, note (4.7 étoiles), titre, format, description, bouton "Voir la formation"

8. `src/components/ui/LogoCarousel.astro` :
   - Défilement horizontal infini en CSS pur (animation @keyframes scroll-x)
   - Props : logos (array d'objets {src, alt}), speed (default 40s)

Pas encore besoin de mettre les vraies images. Utilise des placeholders.
```

---

## PROMPT 4 — Page d'accueil

```
Reproduis la page d'accueil (/) en suivant fidèlement la structure du site Wix actuel.

Sections dans l'ordre :

1. Hero
   - Tag "1,5K+ Communauté IA francophone n°1"
   - Titre H1 : "Formations IA & Communauté d'apprentissage"
   - Sous-titre : "Partage, savoir-faire et pratique l'IA au sein des équipes Produit."
   - 2 CTA : "Formations en ligne" (primary, → /formation-ia) + "Prendre rendez-vous" (secondary, → calendly)
   - Visuels (à droite ou en arrière-plan) : photos de membres de la communauté en mosaïque

2. OnlineSessions (Les sessions online)
   - Titre + paragraphe
   - CTA "Accéder au catalogue" → /formation-ia
   - Visuel cohort

3. CustomDays (Les journées sur mesure)
   - Titre + paragraphe
   - CTA "Prendre rendez-vous" → calendly

4. ClientLogos (Parmi les 1.500+ PM, PO, Designers...)
   - 2 carrousels infinis de logos clients (LogoCarousel)

5. Vision (Notre regard)
   - 2 versions du texte (longue + courte) — choisir la version courte pour mobile via media query

6. Founders (Les fondateurs)
   - Photo Rémi & Tristan
   - Bio commune

7. Eclaireurs (Les Éclaireurs)
   - Grille 3-4 colonnes desktop, 1 colonne mobile
   - Itère sur src/data/eclaireurs.json

8. TrainingDNA (L'ADN de nos formations)
   - 4 sous-sections avec icône + titre + texte :
     * Des cas d'usage concrets
     * Des Formateurs engagés
     * Une pédagogie individualisée
     * Une progression continue

9. Testimonials (Ils parlent de nos formations)
   - Carrousel ou grille de TestimonialCard depuis src/data/testimonials.json

10. Community (Rejoignez notre communauté IA)
    - Titre + paragraphe
    - 4 features : Apprentissage IA renforcé / Cas d'usage IA concrets / Accès à des experts / Ressources exclusives
    - Stats : 1300+ membres, 500 entreprises, 25 éclaireurs, 10 hubs
    - CTA "Rejoindre AI Discipline" → typeform

11. FAQ (Vos questions sur nos formations IA)
    - Accordéon depuis src/data/faq.json (utilise <details> + <summary> natif, stylé Tailwind)

12. ContactForm (Nous contacter)
    - Champs : Prénom*, Nom*, E-mail*, Société, Message*
    - Pour la V1 : action="https://formspree.io/f/XXXXX" method="POST" (à configurer plus tard)

Utilise les composants déjà créés. Espacement vertical généreux entre sections (py-16 md:py-24). 
Quand tu as fini, lance `npm run dev` et donne-moi l'URL pour vérifier visuellement.
```

---

## PROMPT 5 — Page Formations en ligne

```
Construis /formation-ia.

Structure :
1. Hero court : "Les savoir-faire en ligne AI Discipline" + "On ne forme pas à l'IA : on forme au savoir-faire de l'IA."

2. Bloc "Ce que vous obtenez" (5 features) :
   - 1 heure live chaque semaine
   - Replay et support de formation
   - Apprentissage en cohorte
   - Certificat de réussite
   - Garantie remboursement Maven (avec lien externe)

3. Liste des formations :
   - Itère sur src/data/trainings.json
   - Utilise TrainingCard
   - Layout : 1 colonne avec cards larges (alternance image gauche/droite optionnel) OU grille 2 colonnes

4. Testimonials (réutilise le composant)

5. ContactForm

6. Footer
```

---

## PROMPT 6 — Page Formations sur mesure + Mentions légales

```
1. Construis /formation-sur-mesure (récupère le contenu actuel via web fetch sur https://www.aidiscipline.com/formation-sur-mesure).

2. Construis /terms-and-conditions de la même façon.

3. Vérifie que toutes les ancres de navigation et CTA pointent correctement.
```

---

## PROMPT 7 — Téléchargement des assets

```
Maintenant on rapatrie les images depuis Wix.

1. Inspecte les pages /, /formation-ia, /formation-sur-mesure et liste toutes les URLs static.wixstatic.com utilisées.
2. Mets à jour `assets/download-wix-assets.js` avec la liste complète des assets et leurs chemins de destination dans public/images/.
3. Lance le script.
4. Optimise les images :
   - Convertis les PNG en WebP quand pertinent
   - Resize les photos > 800px de large
5. Mets à jour les chemins dans les fichiers JSON et les composants.
6. Vérifie qu'aucun lien ne pointe encore vers static.wixstatic.com.
```

---

## PROMPT 8 — Déploiement Vercel

```
Prépare le déploiement :

1. Crée un repo GitHub `tcharvillat/aidiscipline-site` et push.
2. Donne-moi les étapes manuelles pour :
   - Connecter le repo à Vercel
   - Configurer les variables d'environnement (CONTACT_EMAIL_TO si on utilise Resend)
   - Récupérer l'URL preview Vercel
3. Crée un fichier `vercel.json` minimal si nécessaire.
4. Vérifie que le build passe en local : `npm run build && npm run preview`.
5. Liste les checks finaux à faire avant la bascule DNS depuis Wix :
   - Lighthouse score
   - Vérification des redirections d'URLs
   - Test du formulaire de contact
   - Test des liens externes (Typeform, Calendly, Maven, Slack)
```

---

## Conseils d'utilisation

- **Itère lentement.** Lance les prompts un par un, vérifie le résultat avant de passer au suivant.
- **Vérifie visuellement.** Après chaque prompt majeur, ouvre `localhost:4321` et compare avec le site Wix actuel.
- **N'hésite pas à reformuler.** Si une section ne te plaît pas, dis simplement "Refais la section X en t'inspirant davantage de [élément précis]".
- **Garde le contrôle des couleurs.** Le PROMPT 2 est crucial pour la fidélité — n'hésite pas à pixel-picker toi-même les valeurs si Claude Code n'arrive pas à les extraire.
- **Pour la typo** : si Wix utilise une font particulière (à voir dans DevTools → Computed → font-family), il faudra peut-être l'acheter / la self-host. Sinon Inter (Google Font, gratuite) est un substitut très proche pour 95% des sites.
