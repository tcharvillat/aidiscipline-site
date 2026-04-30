# AI Discipline — Brief de migration vers Astro

Ce document est le brief principal pour Claude Code. Il décrit le projet, la stack, les règles de design et les contraintes à respecter.

## Contexte

AI Discipline (marque commerciale de Discovery Discipline SAS) est un organisme de formation IA pour équipes Produit & Design. Le site actuel est hébergé sur Wix (https://www.aidiscipline.com) et nous le migrons vers une stack autonome.

**Objectif de la migration :**
- Reproduire **fidèlement** le design et le contenu actuels (look identique)
- Gagner en performance (Lighthouse 95+ visé)
- Gagner en autonomie (déploiement Git + Vercel)
- Conserver les intégrations externes (Typeform, Calendly, Slack, Maven)

## Stack technique

- **Framework** : Astro 5+ (rendu statique, SEO natif)
- **Styling** : Tailwind CSS v4
- **Langage** : TypeScript
- **Composants** : Astro components (`.astro`) en priorité, React uniquement si interactivité complexe
- **Hébergement** : Vercel (déploiement automatique sur push `main`)
- **Versioning** : Git + GitHub (`tcharvillat/aidiscipline-site`)
- **Domaine** : `aidiscipline.com` (à transférer plus tard depuis Wix)

## Arborescence cible

```
aidiscipline-site/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Layout.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── OnlineSessions.astro
│   │   │   ├── CustomDays.astro
│   │   │   ├── ClientLogos.astro
│   │   │   ├── Vision.astro
│   │   │   ├── Founders.astro
│   │   │   ├── Eclaireurs.astro
│   │   │   ├── TrainingDNA.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── Community.astro
│   │   │   ├── FAQ.astro
│   │   │   └── ContactForm.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── TestimonialCard.astro
│   │       ├── EclaireurCard.astro
│   │       ├── TrainingCard.astro
│   │       └── LogoCarousel.astro
│   ├── data/
│   │   ├── trainings.json       # Catalogue des formations Maven
│   │   ├── eclaireurs.json      # Liste des éclaireurs avec photos/bio
│   │   ├── testimonials.json    # Témoignages clients
│   │   ├── client-logos.json    # Logos entreprises clientes
│   │   └── faq.json             # Questions/réponses
│   ├── pages/
│   │   ├── index.astro                 # Accueil
│   │   ├── formation-ia.astro          # Catalogue formations en ligne
│   │   ├── formation-sur-mesure.astro  # Formations sur mesure
│   │   └── terms-and-conditions.astro  # Mentions légales
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── images/
│   │   ├── logos/         # Logos clients (Carrefour, Decathlon, Betclic, etc.)
│   │   ├── eclaireurs/    # Portraits des éclaireurs
│   │   ├── testimonials/  # Photos témoignages
│   │   ├── trainings/     # Bannières formations
│   │   └── brand/         # Logo AI Discipline (rose #FC037E, dark)
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Pages à construire (préserver les URLs pour le SEO)

| URL actuelle | Page Astro | Statut |
|---|---|---|
| `/` | `src/pages/index.astro` | À reproduire |
| `/formation-ia` | `src/pages/formation-ia.astro` | À reproduire |
| `/formation-sur-mesure` | `src/pages/formation-sur-mesure.astro` | À reproduire |
| `/terms-and-conditions` | `src/pages/terms-and-conditions.astro` | À reproduire |

## Intégrations externes (à conserver tel quel)

- **Inscription communauté Slack** → `https://discovery-discipline.typeform.com/aidiscipline`
- **Prise de rendez-vous (Rémi)** → `https://calendly.com/remi-guyot/30min`
- **Catalogue formations** → `https://maven.com/aidiscipline/...` (URL par formation, voir `trainings.json`)
- **LinkedIn** → `https://www.linkedin.com/company/ai-discipline/`

## Formulaire de contact

Le site comporte un formulaire de contact en bas des pages (Prénom, Nom, Email, Société, Message).

**Solution recommandée** : utiliser [Resend](https://resend.com) ou [Formspree](https://formspree.io) en V1 (gratuit jusqu'à 100 envois/mois).

À configurer plus tard avec une variable d'environnement `CONTACT_EMAIL_TO`.

## Règles de qualité

1. **Sémantique HTML** : utiliser `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>` correctement.
2. **Accessibilité** : tous les `<img>` doivent avoir un `alt` descriptif. Les boutons doivent avoir un état `:focus` visible.
3. **Performance** : utiliser `<Image />` d'Astro pour optimiser les images (WebP, lazy loading).
4. **SEO** : chaque page doit avoir un `<title>`, une `<meta description>`, et des balises Open Graph.
5. **Mobile-first** : design responsive, breakpoints Tailwind par défaut (sm, md, lg, xl).
6. **Pas de lib lourde** : pas de framework UI imposant (pas de MUI, pas de Chakra). Tailwind suffit.
