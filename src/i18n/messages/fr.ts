import type { Messages } from "./en";

export const frMessages: Messages = {
  locale: "fr",
  common: {
    site: {
      name: "amilemia.dev",
      title: "Amilemia – Développeur web",
      description: "Développeur web full-stack spécialisé dans la création de sites et d'applications rapides et accessibles.",
      jobTitle: "Développeur web",
      openGraphLocale: "fr_FR",
    },
    brand: "amilemia.dev",
    skipLink: "Aller au contenu principal",
    nav: {
      items: [
        { key: "home", label: "Accueil", href: "/" },
        { key: "projects", label: "Projets", href: "/projects" },
        { key: "services", label: "Services", href: "/services" },
        { key: "about", label: "À propos", href: "/about" },
        { key: "contact", label: "Contact", href: "/contact" },
      ],
      cta: "Démarrer un projet",
      mobileCtaLabel: "Démarrer un projet",
      open: "Ouvrir le menu",
      close: "Fermer le menu",
    },
    footer: {
      rights: "Tous droits réservés.",
      tagline: "Création de sites rapides et accessibles qui convertissent. Disponible pour de nouveaux projets.",
      email: "contact@amilemia.dev",
      emailLabel: "E-mail",
      locationLabel: "Localisation",
      locationValue: "Télétravail (UTC+1)",
      connectLabel: "Me suivre",
      contactLabel: "Contact",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
    actions: {
      bookIntro: "Prendre rendez-vous",
      viewWork: "Voir mes réalisations",
      viewAllServices: "Découvrir les services",
      viewAllProjects: "Voir tous les projets",
      viewCaseStudies: "Consulter les études de cas",
      exploreServices: "Découvrir les offres",
      startProject: "Démarrer un projet",
      emailDirect: "M'envoyer un e-mail",
    },
    themeToggle: {
      ariaLabel: "Changer de thème",
      options: {
        light: "Clair",
        dark: "Sombre",
        system: "Système",
      },
    },
    languageToggle: {
      label: "Langue",
      english: "Anglais",
      french: "Français",
    },
    testimonials: {
      heading: "Témoignages",
      ariaLabel: "Témoignages",
      counter: "Témoignage {{current}} sur {{total}}",
      previous: "Voir le témoignage précédent",
      next: "Voir le témoignage suivant",
    },
    caseStudy: {
      label: "Étude de cas",
      impactMetrics: "Indicateurs d'impact",
      visitSite: "Voir le site en ligne",
      viewSource: "Voir le code",
      roleLabel: "Rôle : {{role}}",
      stackLabel: "Stack : {{item}}",
    },
    projectCard: {
      viewCaseStudy: "Voir l'étude de cas",
      coverAlt: "Image de couverture de {{title}}",
    },
    tagFilter: {
      all: "Tous",
    },
  },
  home: {
    hero: {
      availability: {
        srLabel: "Disponibilité actuelle :",
        template: "1 place disponible pour {{period}} – Télétravail (UTC+1)",
      },
      headline: "Lancez plus vite avec un développeur qui maîtrise stratégie, design et code.",
      description:
        "J'aide les fondateurs et petites équipes à lancer des sites et applications performants en quelques semaines. De la découverte au déploiement, vous travaillez avec un seul interlocuteur qui comprend vos objectifs et livre une qualité prête pour la production.",
      bulletPoints: [
        "Stratégie, design et développement full-stack (Next.js & Laravel)—sans transfert entre spécialistes.",
        "Points d'avancement hebdomadaires avec prévisualisations pour suivre les résultats en temps réel.",
        "Accessibilité, performance et SEO intégrés dès le départ, pas ajoutés après coup.",
      ],
      pricingPrompt: "Découvrir les offres",
      clientsIntro: "Projet partenaire",
      clients: ["Clinique Santé Plus"],
      trustIndicators: {
        wcagCompliant: "Conforme WCAG AA",
        lighthouse90Plus: "Scores Lighthouse 90+",
        postLaunchSupport: "Support 14 jours post-lancement",
      },
      insights: {
        title: "Notre méthode de travail",
        description:
          "Nous partons de votre objectif business, cartographions l'expérience utilisateur et livrons dans les délais. Vous vous concentrez sur la stratégie pendant que je m'occupe du design et du développement.",
        items: [
          {
            title: "Livraison rapide",
            description: "La plupart des projets sont en ligne en 2 à 6 semaines avec des jalons clairs et sans surprise.",
          },
          {
            title: "Qualité production",
            description: "Chaque livraison passe les audits d'accessibilité, les tests de performance et la QA avant la mise en ligne.",
          },
          {
            title: "Transparence totale",
            description: "Points hebdomadaires asynchrones, vidéos explicatives et tableau de tâches partagé pour rester informé sans réunions.",
          },
        ],
      },
    },
    servicesPreview: {
      heading: {
        title: "Des services qui livrent des résultats",
        description: "Forfaits à périmètre fixe conçus pour lancer rapidement avec des livrables, délais et résultats clairs.",
      },
      viewAll: "Découvrir les services",
    },
    recentProjects: {
      heading: {
        title: "Réalisations récentes",
        description: "Applications web de production et plateformes bilingues conçues avec Laravel, Next.js et tests automatisés.",
      },
      viewAll: "Voir tous les projets",
    },
    finalCta: {
      headline: "Prêt à lancer votre prochain projet ?",
      description: "Partagez vos objectifs et votre calendrier. Je réviserai votre brief et vous répondrai sous un jour ouvrable avec les prochaines étapes et ma disponibilité.",
      responseTime: "Réponse sous 1 jour ouvrable • Démarrage en 2-3 semaines",
    },
  },
  services: {
    labels: {
      bestFor: "Idéal pour {{audience}}",
      deliverablesHeading: "Ce qui est inclus",
      tiersHeading: "Choisissez votre formule",
      timeline: "Délai : {{timeline}}",
      cta: "Démarrer",
      startingAt: "À partir de",
    },
    packages: {
      launchEssentials: {
        name: "Lancement Express",
        pitch: "Passez du concept à une présence marketing prête à convertir en 3 semaines. Un processus focalisé qui gère stratégie, design et code pour que vous restiez concentré sur votre activité.",
        deliverables: [
          "Appel découverte pour définir votre offre, votre audience et vos indicateurs de succès",
          "Page d'accueil, page services et formulaire de contact responsive développés avec Next.js",
          "Configuration SEO, intégration analytics et conformité accessibilité",
          "Migration de contenu et révision de textes pour jusqu'à 5 sections",
          "Checklist de lancement, vidéo explicative et documentation de passation",
        ],
        timeline: "2 à 3 semaines après le démarrage",
        idealFor: "les fondateurs et petites équipes qui lancent leur premier site professionnel",
        badge: "Le plus populaire",
        tiers: {
          starter: {
            name: "Starter",
            description: "Site une page avec votre offre, vos preuves sociales et un parcours de contact clair.",
          },
          plus: {
            name: "Plus",
            description: "Site multi-pages avec capture de leads, contenu prêt pour CMS et réservation automatisée.",
          },
        },
      },
      conversionRefresh: {
        name: "Refonte Conversion",
        pitch: "Transformez votre site sous-performant en un actif à haut revenu. Nous auditons votre tunnel, optimisons vos performances et réécrivons votre message pour un impact maximal.",
        deliverables: [
          "Audit complet de la performance, de l'accessibilité et de l'efficacité du message",
          "Refonte des sections hero, services et preuves sociales optimisée pour la conversion",
          "Bibliothèque de composants réutilisables pour un design cohérent et maintenable",
          "Optimisation des performances avec rapport de métriques avant/après",
          "Revue analytics avec recommandations de tracking d'événements",
        ],
        timeline: "3 à 4 semaines, révisions incluses",
        idealFor: "les entreprises en croissance qui ont besoin de générer plus de leads",
        badge: "Meilleur rapport qualité-prix",
        tiers: {
          starter: {
            name: "Starter",
            description: "Refonte de 3 sections clés avec textes et design orientés conversion.",
          },
          plus: {
            name: "Plus",
            description: "Refonte complète avec bibliothèque de composants, optimisation de vitesse, configuration analytics et QA.",
          },
        },
      },
      growthSupport: {
        name: "Accompagnement Continu",
        pitch: "Continuez à livrer expérimentations, landing pages et améliorations produit sans embaucher à temps plein.",
        deliverables: [
          "Appel de planification mensuel pour prioriser les expérimentations et améliorations techniques",
          "Jusqu'à 20 heures de design et développement par mois",
          "Création de landing pages, itérations de fonctionnalités ou nettoyage de dette technique",
          "Points hebdomadaires asynchrones, vidéos explicatives et tableau de tâches partagé",
          "Les heures non utilisées sont reportées d'un mois—aucun budget gaspillé",
        ],
        timeline: "Mensuel, résiliable à tout moment",
        idealFor: "les équipes qui ont besoin d'un support développement continu sans embauche à temps plein",
        badge: "Flexible",
        tiers: {
          starter: {
            name: "Starter",
            billingSuffix: " / mois",
            description: "10 heures par mois pour itérations rapides, landing pages ou corrections de bugs.",
          },
          plus: {
            name: "Plus",
            billingSuffix: " / mois",
            description: "20 heures par mois avec support prioritaire, création d'expérimentations et report d'heures.",
          },
        },
      },
    },
    page: {
      meta: {
        title: "Services",
        description:
          "Forfaits à périmètre fixe pour lancer des sites, améliorer les conversions ou obtenir un support développement continu. Livrables clairs, délais précis et tarifs transparents—démarrez en quelques semaines, pas en mois.",
      },
      hero: {
        eyebrow: "Services",
        title: "Lancez plus vite, convertissez mieux.",
        description:
          "Forfaits à périmètre fixe pour lancer de nouveaux sites, rafraîchir l'existant ou réserver un accompagnement continu. Choisissez une formule, partagez vos objectifs et démarrez en quelques semaines.",
        highlights: [
          "Chaque projet inclut audits d'accessibilité, optimisation des performances et tests QA.",
          "Points d'avancement hebdomadaires avec vidéos explicatives—vous savez toujours où on en est.",
          "Tarifs et délais clairs pour obtenir l'approbation interne rapidement.",
        ],
      },
      packages: {
        title: "Choisissez votre formule",
        description: "Chaque formule inclut conformité accessibilité, configuration analytics et support post-lancement.",
      },
      differentiators: {
        title: "Pourquoi les équipes choisissent de travailler avec moi",
        items: [
          {
            title: "Focus sur les résultats",
            body: "Nous partons de votre objectif business—plus de leads, meilleures conversions, temps de chargement plus rapides—et construisons la solution autour de ce résultat.",
          },
          {
            title: "Un seul interlocuteur, du début à la fin",
            body: "Vous travaillez avec une seule personne de la découverte au lancement. Pas de transferts, pas de perte de contexte et accès direct à l'avancement.",
          },
          {
            title: "Toujours informé",
            body: "Points hebdomadaires, vidéos explicatives et tableau de tâches partagé pour toujours savoir ce qui est fait et ce qui vient.",
          },
        ],
      },
      process: {
        title: "Comment ça marche",
        steps: [
          {
            title: "Découverte",
            description:
              "Nous commençons par un appel de lancement pour clarifier votre audience, vos objectifs et vos indicateurs de succès. Vous obtenez un brief clair et un calendrier.",
          },
          {
            title: "Planification",
            description:
              "Je cartographie les structures de pages, les parcours utilisateurs et les jalons de livraison. Vous approuvez le périmètre et les exigences de lancement avant qu'on construise.",
          },
          {
            title: "Construction",
            description:
              "Design et développement avancent ensemble. Vous recevez des points hebdomadaires, des prévisualisations de staging et des checklists pour SEO, analytics et accessibilité.",
          },
          {
            title: "Lancement",
            description:
              "Nous déployons, vérifions le tracking et transférons la documentation. Vous bénéficiez de 14 jours de support post-lancement pour les corrections et questions.",
          },
        ],
      },
      faq: {
        title: "Questions fréquentes",
        items: [
          {
            id: "start",
            question: "Dans combien de temps peut-on démarrer ?",
            answer:
              "La plupart des projets démarrent sous 2 à 3 semaines. Partagez votre calendrier quand vous me contactez, et je confirme ma disponibilité sous un jour ouvré.",
          },
          {
            id: "brand-guidelines",
            question: "Pouvez-vous travailler avec notre charte graphique existante ?",
            answer:
              "Oui. Je travaille dans le cadre de vos guidelines et ne les étends que si nécessaire. Si vous n'avez pas encore de charte, je crée des patterns légers qui correspondent à votre vision.",
          },
          {
            id: "scope",
            question: "Et si nous avons besoin de modifications après le lancement ?",
            answer:
              "Tout est construit de manière modulaire et documenté pour faciliter les mises à jour. Vous pouvez continuer à travailler avec moi via l'Accompagnement Continu ou transférer à votre équipe interne.",
          },
          {
            id: "tools",
            question: "Comment restons-nous synchronisés ?",
            answer:
              "Vous recevez des points hebdomadaires asynchrones par e-mail ou Slack, des vidéos explicatives pour les jalons majeurs et un tableau de tâches partagé. Pas de surprises, pas de devinettes.",
          },
          {
            id: "post-launch",
            question: "Proposez-vous un support après le lancement ?",
            answer:
              "Oui. Chaque projet inclut 14 jours de support post-lancement pour les corrections de bugs et questions. Le travail continu peut se poursuivre via la formule Accompagnement Continu.",
          },
        ],
      },
      cta: {
        title: "Prêt à démarrer ?",
        description:
          "Partagez vos objectifs et votre calendrier. Je révise votre brief et vous réponds sous un jour ouvré avec les prochaines étapes et ma disponibilité.",
      },
    },
  },
  about: {
    heading: {
      title: "Créer des sites qui convertissent, pas seulement qui ont l'air bien",
      description: "Je suis Mohammed-Amine Madah (Amilemia)—développeur web full-stack alliant rigueur d'ingénierie logicielle, design multimédia et UX orientée conversion.",
    },
    introduction:
      "Titulaire d'un Bachelor Professionnel en Multimédia et Technologies du Web et formé à l'ingénierie logicielle, j'aborde chaque projet avec précision architecturale et sens du design centré utilisateur. De l'architecture de base de données et des backends sécurisés sous Laravel aux interfaces bilingues ultra-rapides sous Next.js, je livre des applications prêtes pour la production avec tests automatisés et documentation claire.",
    focusAreas: {
      title: "Mes spécialités",
      items: [
        "Applications web full-stack : tableaux de bord par rôles, systèmes de planification et génération de PDF",
        "Plateformes web orientées conversion : sites bilingues (EN/FR), catalogues de services et tunnels de prise de brief",
        "Design UI/UX & Multimédia : systèmes de composants propres, interfaces responsives et supports visuels",
        "Qualité production : accessibilité WCAG AA, performance statique/SSR et tests automatisés E2E/unitaires",
      ],
    },
    toolset: {
      title: "Stack technique",
      items: [
        "Frontend & UI : React, Next.js 15, TypeScript, JavaScript (ES6+), Tailwind CSS, Alpine.js, HTML5 & CSS3",
        "Backend & Bases de données : Laravel, PHP 8+, Node.js, APIs REST, PostgreSQL, MySQL, SQLite & Upstash Redis",
        "Tests & DevOps : Playwright (E2E), Vitest, Pest / PHPUnit, Git & GitHub Actions CI/CD, Linux/Bash, Vercel & Cloudflare",
        "Design & Multimédia : Figma, Adobe Photoshop, Adobe Illustrator, Prototypage UI/UX & Responsive Design",
      ],
    },
    experience: {
      title: "Formation & Parcours",
      roles: [
        {
          title: "Bachelor Professionnel en Multimédia et Technologies du Web",
          place: "Fédération Internationale des Établissements de Formation Professionnelle • Kénitra",
          timeframe: "2021 - 2024",
          summary:
            "Spécialisation en développement web full-stack, technologies multimédias interactives, design UI/UX et architecture d'applications web modernes.",
        },
        {
          title: "Programme d'Ingénierie Logicielle (Software Engineering)",
          place: "ALX Africa",
          timeframe: "2023 - 2024",
          summary:
            "Formation intensive par projets couvrant la programmation système, les environnements Linux/Bash, l'architecture backend, l'algorithmique et les workflows collaboratifs Git.",
        },
      ],
    },
  },
  projects: {
    heading: {
      title: "Projets",
      description:
        "Travail réel avec résultats réels. Chaque projet inclut des résultats mesurables, une QA approfondie et une documentation complète.",
    },
  },
  contact: {
    heading: {
      title: "Parlons de votre projet",
      description:
        "Partagez vos objectifs, votre calendrier et ce que vous souhaitez construire. Je révise votre brief et vous réponds sous un jour ouvré avec les prochaines étapes.",
    },
    steps: {
      title: "Prochaines étapes",
      items: [
        "Je révise votre brief et confirme si nous sommes alignés sur votre calendrier et vos objectifs.",
        "Nous planifions un appel d'introduction de 30 minutes pour discuter du périmètre, des indicateurs et de l'approche.",
        "Vous recevez une proposition avec les livrables, le tarif et une date de démarrage suggérée.",
      ],
    },
    form: {
      steps: {
        titles: ["Vos coordonnées", "Détails du projet", "Budget et calendrier", "Vérification et envoi"],
        descriptions: [
          "Comment puis-je vous contacter ?",
          "Que souhaitez-vous construire ?",
          "Quel est votre budget et votre calendrier ?",
          "Vérifiez avant d'envoyer.",
        ],
      },
      fields: {
        name: {
          label: "Nom",
          placeholder: "Votre nom",
          errors: { minLength: "Le nom doit contenir au moins 2 caractères" },
        },
        email: {
          label: "E-mail",
          placeholder: "votre.email@exemple.com",
          errors: { invalid: "Veuillez saisir une adresse e-mail valide" },
        },
        projectScope: {
          label: "De quoi avez-vous besoin ?",
          options: [
            { value: "launch-site", label: "Lancement de nouveau site" },
            { value: "conversion-refresh", label: "Optimisation de conversion" },
            { value: "growth-support", label: "Accompagnement continu" },
            { value: "custom-app", label: "Fonctionnalité sur mesure" },
          ],
          errors: { min: "Sélectionnez au moins une option" },
        },
        goals: {
          label: "Parlez-moi de votre projet",
          placeholder: "Qu'essayez-vous d'accomplir ? Qui est votre audience ? À quoi ressemble le succès ?",
          errors: {
            min: "Veuillez partager un peu plus de détails (au moins 10 caractères)",
            max: "Veuillez rester sous les 2000 caractères",
          },
        },
        budgetRange: {
          label: "Fourchette budgétaire",
          placeholder: "Sélectionnez un budget",
          options: [
            { value: "momentum", label: "1 500 $ - 3 000 $ (Standard)" },
            { value: "growth", label: "3 000 $ - 6 000 $ (Lancement complet)" },
            { value: "custom", label: "Plus de 6 000 $ (Sur mesure)" },
            { value: "consult", label: "Moins de 1 500 $ (Audit stratégique uniquement)" },
          ],
        },
        startDate: {
          label: "Quand souhaitez-vous démarrer ?",
          placeholder: "Choisissez une date",
          errors: {
            required: "Veuillez sélectionner une date de démarrage",
            invalid: "Veuillez sélectionner une date valide",
          },
        },
        timelineNotes: {
          label: "Contraintes de calendrier ?",
          placeholder: "Dates limites de lancement, événements ou autres détails sensibles au temps.",
          errors: { max: "Veuillez rester sous les 500 caractères" },
        },
      },
      review: {
        sectionTitles: {
          about: "Coordonnées",
          scope: "Détails du projet",
          budget: "Budget et calendrier",
        },
        edit: "Modifier",
        fields: {
          name: "Nom",
          email: "E-mail",
          scope: "Type",
          goals: "Détails",
          budget: "Budget",
          startDate: "Date de démarrage",
          notes: "Notes de calendrier",
        },
        notProvided: "Non fourni",
      },
      buttons: {
        back: "Retour",
        next: "Continuer",
        submit: "Envoyer le message",
        submitting: "Envoi...",
      },
      status: {
        sending: "Envoi...",
        step: "Étape {{current}} sur {{total}}",
      },
      notifications: {
        success: "Message envoyé ! Je vous réponds sous 1 jour ouvré.",
        error: "Une erreur s'est produite. Veuillez réessayer ou m'écrire à contact@amilemia.dev",
      },
      messageTemplate: {
        intro: "Nouvelle demande de projet via le formulaire de contact :",
        scope: "Type de projet : {{scope}}",
        goals: "Détails du projet : {{goals}}",
        budget: "Budget : {{budget}}",
        desiredStart: "Date de démarrage : {{start}}",
        timingNotes: "Notes de calendrier : {{notes}}",
        fallbackNotes: "Non fourni",
      },
      formatting: {
        dateNotSpecified: "Non spécifié",
      },
      successStep: {
        title: "Brief reçu !",
        description: "Les détails de votre projet sont dans ma boîte mail. Pour gagner du temps, planifions dès maintenant notre appel d'introduction.",
        bookingTitle: "Réservez votre appel",
        bookingDescription: "Choisissez le créneau qui vous convient. J'ai déjà votre brief, nous pourrons donc passer directement à la stratégie.",
        button: "Planifier sur Cal.com",
        fallback: "Ou attendez ma réponse par e-mail—je vous répondrai sous 1 jour ouvré.",
      },
    },
    info: {
      title: "Coordonnées",
      emailLabel: "E-mail",
      emailValue: "contact@amilemia.dev",
      locationLabel: "Localisation",
      locationValue: "Télétravail",
      connectTitle: "Restons en contact",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
  },
  project: {
    backToProjects: "Retourner aux projets",
    timeline: {
      present: "En cours",
    },
    cta: {
      heading: "Démarrez votre projet",
      description: "Prêt à obtenir des résultats similaires ? Discutons de la façon dont je peux vous aider à concrétiser votre vision.",
      button: "Contactez-moi",
    },
  },
  resources: {
    meta: {
      title: "Ressources gratuites",
      description: "Guides, checklists et templates gratuits pour vous aider à créer de meilleurs sites web. Téléchargement instantané, sans engagement.",
    },
    hero: {
      eyebrow: "Ressources gratuites",
      title: "Guides et outils pour créer de meilleurs sites",
      description: "Ressources pratiques pour fondateurs et développeurs. Téléchargement instantané—sans engagement.",
    },
    grid: {
      title: "Ressources disponibles",
      description: "Tout ce dont vous avez besoin pour créer des sites plus rapides, plus accessibles et plus performants.",
    },
    card: {
      downloadCount: "{{count}} téléchargements",
      rating: "Note {{rating}}/5",
      download: "Télécharger gratuitement",
      category: {
        checklist: "Checklist",
        guide: "Guide",
        template: "Template",
        toolkit: "Boîte à outils",
      },
    },
    contentUpgrade: {
      eyebrow: "Ressource gratuite",
      title: "Vous voulez le guide détaillé ?",
      description: "Obtenez le {{title}} complet avec des instructions étape par étape et des exemples de code.",
      cta: "Télécharger le guide gratuit",
    },
    featured: {
      eyebrow: "Ressource gratuite",
      title: "Obtenez le {{title}}",
      description: "{{description}}",
      cta: "Télécharger gratuitement",
      socialProof: "{{count}}+ téléchargements",
    },
  },
  notFound: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },
  shared: {
    testimonials: [
      {
        quote: "Le système de planification basé sur Laravel a complètement éliminé nos conflits de réservation, simplifié les paiements des patients et rationalisé la génération d'ordonnances. Un vrai changement pour notre clinique.",
        author: "Dr. Jean Martin",
        fullName: "Dr. Jean Martin",
        role: "Praticien Principal",
        company: "Clinique Santé Plus",
        companyLogo: "/images/clients/clinic-sante-plus-logo.png",
        avatarUrl: "/images/testimonials/dr-jean-martin.png",
        metric: "0 conflit de calendrier",
      },
    ],
  },
  ads: {
    headlines: {
      primary: "Lancez votre site en 3 semaines",
      secondary: "Développement web rapide",
      tertiary: "Sites qui convertissent",
      conversion: "+28% de conversions",
      speed: "Livraison en semaines",
      quality: "Qualité production",
    },
    descriptions: {
      short: "Développeur Next.js & Laravel. Lancements rapides, sites accessibles, résultats mesurables. Prenez rendez-vous.",
      medium: "Lancez votre site ou application en 2-3 semaines. Accessibilité, performance et SEO intégrés. Un seul développeur, du début à la fin.",
      long: "J'aide les fondateurs à lancer des sites performants rapidement. Stratégie, design et développement Next.js & Laravel avec un seul interlocuteur. Points hebdomadaires, prévisualisations et qualité production.",
      conversion: "Augmentez vos conversions avec des sites plus rapides. Audits d'accessibilité, optimisation des performances et design orienté conversion.",
      speed: "Lancez votre site en quelques semaines avec un développeur qui maîtrise stratégie, design et code. Pas de transferts, pas de retards.",
    },
    socialProof: {
      clientCount: "Conçu pour fondateurs et PME",
      projectCount: "Développement full-stack Next.js & Laravel",
      conversionStat: "Objectif 95+ sur Lighthouse",
      speedStat: "Lancement en 2 à 4 semaines",
      satisfactionStat: "14 jours de support QA post-lancement",
      clients: ["Clinique Santé Plus"],
    },
    urgency: {
      availability: "1 place disponible pour {{period}}",
      limitedSlots: "Seulement 2 projets par mois",
      bookingSoon: "Prochaine disponibilité : {{date}}",
      responseTime: "Réponse sous 1 jour ouvré",
      fastStart: "Démarrage sous 2-3 semaines",
    },
    metaDescriptions: {
      home: "Développeur web full-stack (Next.js, TypeScript, Laravel) créant des sites et applications rapides et accessibles. Lancez en quelques semaines avec stratégie, design et code.",
      services: "Forfaits de développement web à périmètre fixe. Lancez des sites en 2-3 semaines, optimisez pour les conversions ou réservez un accompagnement continu.",
      projects: "Applications web de production et études de cas réalisées avec Laravel, Next.js 15, TypeScript et PostgreSQL. Ingénierie full-stack, accessibilité et QA automatisée.",
      about: "Mohammed-Amine Madah (Amilemia)—développeur web full-stack titulaire d'un Bachelor en Multimédia et Technologies du Web, formé à l'ingénierie logicielle (ALX) et au commerce.",
      contact: "Prenez rendez-vous pour un appel découverte. Partagez vos objectifs et votre calendrier. Recevez une proposition avec livrables, tarif et date de démarrage sous 1 jour ouvré.",
    },
    callouts: {
      fastDelivery: "La plupart des projets lancent en 2-3 semaines",
      noHandoffs: "Un seul développeur, du début à la fin",
      weeklyUpdates: "Points d'avancement hebdomadaires inclus",
      accessibilityFirst: "Conformité WCAG AA garantie",
      performanceOptimized: "Scores Lighthouse 90+",
      seoReady: "Configuration SEO et analytics incluse",
      postLaunchSupport: "14 jours de support post-lancement",
      transparentPricing: "Tarifs fixes, pas de surprises",
    },
    valueProps: {
      speed: {
        headline: "Livraison rapide",
        body: "La plupart des projets lancent en 2-3 semaines avec des jalons clairs et sans retards.",
      },
      quality: {
        headline: "Qualité production",
        body: "Audits d'accessibilité, optimisation des performances et tests QA avant chaque livraison.",
      },
      results: {
        headline: "Résultats mesurables",
        body: "+28% de conversions en moyenne et chargements 74% plus rapides sur les projets clients.",
      },
      transparency: {
        headline: "Toujours informé",
        body: "Points hebdomadaires, prévisualisations et tableau de tâches partagé—vous savez toujours où on en est.",
      },
      expertise: {
        headline: "Expertise complète",
        body: "Stratégie, design et développement Next.js avec un seul interlocuteur qui comprend vos objectifs.",
      },
      support: {
        headline: "Support continu",
        body: "14 jours de support post-lancement inclus. Continuez avec des forfaits mensuels flexibles.",
      },
    },
  },
};
