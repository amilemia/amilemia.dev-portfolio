import type { Messages } from "./en";

export const frMessages: Messages = {
  locale: "fr",
  common: {
    site: {
      name: "amilemia.dev",
      title: "Amilemia – Développeuse web",
      description: "Développeuse web freelance qui crée des expériences web rapides et accessibles.",
      jobTitle: "Développeuse web",
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
      cta: "Réserver un appel découverte",
      mobileCtaLabel: "Réserver un appel projet",
      open: "Ouvrir la navigation",
      close: "Fermer la navigation",
    },
    footer: {
      rights: "Tous droits réservés.",
      email: "hi@amilemia.dev",
      emailLabel: "E-mail",
      locationLabel: "Localisation",
      locationValue: "À distance",
      connectLabel: "Réseaux",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
    actions: {
      bookIntro: "Réserver un appel projet",
      viewWork: "Voir les projets",
      viewAllServices: "Voir tous les services",
      viewAllProjects: "Voir tous les projets",
      viewCaseStudies: "Voir les études de cas",
      exploreServices: "Découvrir les offres de services",
      startProject: "Lancer un projet",
      emailDirect: "Envoyer un e-mail à hi@amilemia.dev",
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
        template: "1 créneau projet ouvert pour {{period}} – À distance (UTC+1)",
      },
      headline: "Lancez et améliorez votre site avec une partenaire solo fiable.",
      description:
        "J'accompagne les fondatrices et petites équipes pour planifier, concevoir et livrer des expériences web rapides et accessibles — sans ralentir votre cadence ni perdre le contexte.",
      bulletPoints: [
        "Stratégie, design et développement Next.js gérés de bout en bout par une seule personne.",
        "Mises à jour asynchrones chaque semaine, préproductions et objectifs clairs à chaque sprint.",
        "Accessibilité, performance et tests anticipés avant la mise en ligne.",
      ],
      pricingPrompt: "Envie de connaître les tarifs ?",
      clientsIntro: "De la confiance chez",
      clients: ["Relay CRM", "Launchpad Studio", "Stellar Labs"],
      insights: {
        title: "Comment se déroule la collaboration",
        description:
          "Nous alignons l'objectif, cadrons l'expérience et livrons selon un planning sans intermédiaires. Vous restez concentré·e sur la stratégie pendant que je gère l'exécution.",
        items: [
          {
            title: "Fenêtre de livraison",
            description: "Mise en ligne pilote en 2 à 6 semaines selon la préparation du périmètre.",
          },
          {
            title: "Scorecard de lancement",
            description: "Accessibilité, performance, QA et analytics contrôlés avant la mise en production.",
          },
          {
            title: "Collaboration",
            description: "Mises à jour asynchrones, vidéos Loom et backlog partagé pour garder tout le monde aligné.",
          },
        ],
      },
    },
    servicesPreview: {
      heading: {
        title: "Des services pensés pour le lancement",
        description: "Des offres packagées pour passer du cadrage à la mise en ligne sans surprises.",
      },
      viewAll: "Voir tous les services",
    },
    recentProjects: {
      heading: {
        title: "Projets récents",
        description: "Des études de cas mêlant UX soignée et gains mesurables en conversion, activation et rétention.",
      },
      viewAll: "Voir tous les projets",
    },
  },
  services: {
    labels: {
      bestFor: "Idéal pour {{audience}}",
      deliverablesHeading: "Ce que vous obtenez",
      tiersHeading: "Options Starter et Plus",
      timeline: "Durée typique du projet : {{timeline}}",
      cta: "Lancer un projet",
    },
    packages: {
      launchEssentials: {
        name: "Lancement essentiel",
        pitch: "Concevoir et livrer un site marketing soigné qui inspire confiance dès le premier jour.",
        deliverables: [
          "Atelier de cadrage pour clarifier l'offre, la cible et le critère de succès",
          "Page d'accueil, services et parcours de contact responsives construits avec Next.js",
          "Fondations SEO, analytics et vérifications d'accessibilité",
          "Saisie de contenu et relecture pour jusqu'à cinq sections",
          "Checklist de mise en ligne, walkthrough vidéo et notes de passation",
        ],
        timeline: "2 à 3 semaines après le démarrage",
        idealFor: "Fondatrices ou petites équipes qui lancent leur premier site",
        badge: "Accessible",
        tiers: {
          starter: {
            name: "Starter",
            description: "Site monopage couvrant votre offre, vos preuves et un parcours de contact clair.",
          },
          plus: {
            name: "Plus",
            description: "Jusqu'à cinq sections avec capture de leads, prise de rendez-vous et emplacements prêts pour un CMS.",
          },
        },
      },
      conversionRefresh: {
        name: "Relance conversion",
        pitch: "Haussez le niveau d'un site existant avec un message plus clair, des performances accrues et des CTA plus forts.",
        deliverables: [
          "Audit de la performance actuelle, de l'accessibilité et du contenu",
          "Refonte du hero, des services et des preuves centrée sur la conversion",
          "Bibliothèque de composants légère pour des sections réutilisables",
          "Améliorations de performance et d'accessibilité avec rapport avant/après",
          "Revue des événements analytics et recommandations",
        ],
        timeline: "3 à 4 semaines, itérations incluses",
        idealFor: "PME en croissance qui veulent un site plus performant",
        badge: "Le plus populaire",
        tiers: {
          starter: {
            name: "Starter",
            description: "Refresh orienté conversion pour trois sections clés avec mise à jour du copywriting.",
          },
          plus: {
            name: "Plus",
            description: "Inclut amélioration des composants, optimisation des temps de chargement, refonte des événements analytics et support QA pour la mise en ligne.",
          },
        },
      },
      growthSupport: {
        name: "Support croissance",
        pitch: "Un accompagnement continu en design et dev pour continuer à expédier pages et améliorations.",
        deliverables: [
          "Session de planification mensuelle pour prioriser expériences et correctifs",
          "Jusqu'à 20 heures de design + développement par mois",
          "Itérations de landing pages, polish de fonctionnalités ou dette technique",
          "Mises à jour asynchrones, walkthroughs Loom et backlog partagé",
          "Les heures non utilisées sont reportées un mois de plus pour ne rien perdre",
        ],
        timeline: "Engagement mensuel renouvelable",
        idealFor: "Petites équipes qui veulent un renfort flexible sans recruter",
        badge: "Meilleur ratio",
        tiers: {
          starter: {
            name: "Starter",
            billingSuffix: " / mois",
            description: "Jusqu'à 10 heures pour des itérations rapides, des ajustements de landing ou des correctifs.",
          },
          plus: {
            name: "Plus",
            billingSuffix: " / mois",
            description: "Jusqu'à 20 heures avec priorité de réponse, support d'expérimentations et heures reportées.",
          },
        },
      },
    },
    page: {
      meta: {
        title: "Services",
        description:
          "Des offres claires pour lancer un nouveau site, revitaliser l'existant ou sécuriser un accompagnement continu. Partagez vos objectifs, choisissez l'option adaptée et nous démarrons rapidement.",
      },
      hero: {
        eyebrow: "Services",
        title: "Des projets qui sortent vraiment.",
        description:
          "Des offres claires pour lancer un nouveau site, revitaliser l'existant ou sécuriser un accompagnement continu. Partagez vos objectifs, choisissez l'option adaptée et nous démarrons rapidement.",
        highlights: [
          "Livrables prêts pour la mise en ligne avec accessibilité, performance et tests intégrés.",
          "Collaboration asynchrone : walkthroughs Loom hebdomadaires et backlog partagé.",
          "Tarifs, délais et prochaines étapes transparents pour valider rapidement.",
        ],
      },
      packages: {
        title: "Des forfaits pensés pour garder l'élan",
        description: "Chaque mission inclut accessibilité, analytics et support de mise en ligne.",
      },
      differentiators: {
        title: "Pourquoi les équipes font appel à moi",
        items: [
          {
            title: "Orienté résultats",
            body: "Nous commençons par l'objectif à atteindre — plus de demandes, un message plus clair ou de meilleures performances — et tout le travail s'aligne dessus.",
          },
          {
            title: "Partenaire impliquée",
            body: "Vous travaillez avec une seule personne du cadrage à la mise en ligne. Moins de friction, pas de perte d'information et une vision claire de l'avancement.",
          },
          {
            title: "Livraison transparente",
            body: "Updates asynchrones, walkthroughs Loom et backlog partagé pour que tout le monde sache ce qui vient de sortir et ce qui arrive.",
          },
        ],
      },
      process: {
        title: "La démarche",
        steps: [
          {
            title: "Découvrir",
            description:
              "Des ateliers de lancement pour clarifier la cible, le message et le KPI visé. Vous repartez avec un brief concret et des critères de réussite.",
          },
          {
            title: "Planifier",
            description:
              "Je traduis le cadrage en wireflows, planning de livraison et jalons. Vous validez le périmètre, les checkpoints et les exigences de mise en ligne.",
          },
          {
            title: "Construire",
            description:
              "Design et développement avancent en parallèle. Walkthroughs vidéo, préproductions et checklists pour analytics, SEO et accessibilité.",
          },
          {
            title: "Lancer",
            description:
              "Déploiement, vérification du tracking et documentation pour garder l'élan. Le support post-lancement couvre correctifs, expérimentations et prochaine itération.",
          },
        ],
      },
      faq: {
        title: "Questions fréquentes",
        items: [
          {
            id: "start",
            question: "Quand pouvons-nous démarrer ?",
            answer:
              "La plupart des projets démarrent sous deux à trois semaines. Indiquez votre échéance dans le brief et je confirme la première date de lancement disponible sous un jour ouvré.",
          },
          {
            id: "brand-guidelines",
            question: "Pouvez-vous travailler avec nos guidelines et notre design system ?",
            answer:
              "Oui. Je commence par auditer vos bases et ne les étends que si nécessaire. S'il manque des briques, je propose des patterns légers qui s'intègrent à votre système.",
          },
          {
            id: "scope",
            question: "Et si nous avons besoin de plus de pages ou d'itérations après la mise en ligne ?",
            answer:
              "Tout est livré de manière modulaire, documenté et prêt pour les évolutions. Vous pouvez poursuivre avec moi en forfait ou confier les mises à jour à votre équipe interne.",
          },
          {
            id: "tools",
            question: "Comment travaille-t-on au quotidien ?",
            answer:
              "Updates asynchrones dans Notion, walkthroughs Loom pour les jalons importants et fil Slack ou e-mail partagé pour les décisions rapides. Vous savez toujours ce qui est en cours.",
          },
          {
            id: "post-launch",
            question: "Proposez-vous un support après le lancement ?",
            answer:
              "Oui. Chaque projet inclut 14 jours de support post-lancement pour les correctifs et questions. Les expérimentations et optimisations continues basculent sur la formule d'accompagnement.",
          },
        ],
      },
      cta: {
        title: "Prêt·e pour la prochaine mise en ligne ?",
        description:
          "Parlez-moi de votre planning et de vos objectifs. Je vous réponds sous un jour ouvré avec les prochaines étapes et une date de démarrage proposée.",
      },
    },
  },
  about: {
    heading: {
      title: "Des livraisons intentionnelles, des résultats mesurés",
      description: "Je suis Amilemia – partenaire produit full-stack qui transforme la stratégie en lancements qui bougent les bons indicateurs.",
    },
    introduction:
      "De la première visio jusqu'à la mise en production, je cadre le succès selon vos objectifs. UX réfléchie, ingénierie pragmatique, audits d'accessibilité et de performance avant lancement, puis la documentation pour que votre équipe puisse continuer sans friction.",
    focusAreas: {
      title: "Ce sur quoi je me concentre",
      items: [
        "UX orientée revenu : onboarding, tarification, lifecycle et tunnels de conversion",
        "Mécanique marketing : landing pages orientées conversion et hubs de contenus modulaires",
        "Design systems et bibliothèques de composants scalables",
        "Accessibilité, performance et tests intégrés à chaque livraison",
      ],
    },
    toolset: {
      title: "Des outils qui gardent le rythme",
      items: [
        "React, Next.js, TypeScript et runtimes Edge",
        "Contentlayer, MDX et intégrations CMS modernes",
        "Playwright, Vitest et pipelines de QA automatisés",
        "Upstash, Resend et analytics comme Plausible",
      ],
    },
    experience: {
      title: "Expériences",
      roles: [
        {
          title: "Senior Frontend Developer",
          place: "Relay CRM",
          timeframe: "2022 - Aujourd'hui",
          summary:
            "Pilotage des parcours onboarding, tarification et reporting critiques revenus (+28 % de conversion essai → payant) tout en standardisant accessibilité et tests.",
        },
        {
          title: "Product Engineer",
          place: "Launchpad Studio",
          timeframe: "2019 - 2022",
          summary:
            "Collaboration avec marketing et produit pour accélérer l'expérimentation à haut volume, faisant passer le time-to-launch de plusieurs semaines à quelques jours.",
        },
      ],
    },
  },
  projects: {
    heading: {
      title: "Projets",
      description:
        "Sélection de lancements produit, marketing et expérimentation. Chaque projet associe résultats mesurables, QA rigoureux et passation claire.",
    },
  },
  contact: {
    heading: {
      title: "Entrons en contact",
      description:
        "Partagez les objectifs, la cible et votre échéance pour le prochain lancement. Je relis votre brief sous un jour ouvré et vous réponds avec mes disponibilités et les prochaines étapes.",
    },
    steps: {
      title: "Ce qui se passe après l'envoi",
      items: [
        "Je relis votre brief et confirme l'adéquation, le planning et les questions ouvertes.",
        "Nous planifions un appel d'introduction de 30 minutes pour aligner métriques, parties prenantes et périmètre.",
        "Vous recevez une proposition détaillant livrables, investissement et date de démarrage.",
      ],
    },
    form: {
      steps: {
        titles: ["À propos de vous", "Périmètre du projet", "Budget et planning", "Relire et envoyer"],
        descriptions: [
          "Dites-moi comment vous joindre.",
          "Sélectionnez ce dont vous avez besoin et partagez vos objectifs.",
          "Précisez budget et attentes de planning.",
          "Vérifiez tout avant l'envoi.",
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
          placeholder: "votre.email@example.com",
          errors: { invalid: "Merci d'indiquer une adresse e-mail valide" },
        },
        projectScope: {
          label: "Périmètre du projet",
          options: [
            { value: "portfolio-site", label: "Site portfolio" },
            { value: "marketing-site", label: "Site marketing" },
            { value: "app-features", label: "Fonctionnalités d'application" },
          ],
          errors: { min: "Sélectionnez au moins un périmètre" },
        },
        goals: {
          label: "Objectifs du projet",
          placeholder: "Partagez objectifs, métriques, audience ou tout contexte utile.",
          errors: {
            min: "Merci d'ajouter un peu plus de détails (10 caractères minimum)",
            max: "Les objectifs doivent faire moins de 2000 caractères",
          },
        },
        budgetRange: {
          label: "Budget estimé",
          placeholder: "Sélectionnez un budget",
          options: [
            { value: "under-5k", label: "Moins de 5 k$" },
            { value: "5k-10k", label: "5 k$ - 10 k$" },
            { value: "10k-25k", label: "10 k$ - 25 k$" },
            { value: "25k-plus", label: "25 k$ et plus" },
          ],
        },
        startDate: {
          label: "Date de démarrage souhaitée",
          placeholder: "Choisissez une date",
          errors: {
            required: "Indiquez une date de démarrage",
            invalid: "Merci de saisir une date valide",
          },
        },
        timelineNotes: {
          label: "Contraintes de planning",
          placeholder: "Indiquez les jalons, dates de lancement ou tout contexte timing.",
          errors: { max: "Merci de rester sous les 500 caractères" },
        },
      },
      review: {
        sectionTitles: {
          about: "À propos de vous",
          scope: "Périmètre du projet",
          budget: "Budget et planning",
        },
        edit: "Modifier",
        fields: {
          name: "Nom",
          email: "E-mail",
          scope: "Périmètre",
          goals: "Objectifs",
          budget: "Budget",
          startDate: "Démarrage souhaité",
          notes: "Notes de planning",
        },
        notProvided: "Non renseigné",
      },
      buttons: {
        back: "Retour",
        next: "Suivant",
        submit: "Envoyer le brief",
        submitting: "Envoi en cours...",
      },
      status: {
        sending: "Envoi de votre brief...",
        step: "Étape {{current}} sur {{total}}",
      },
      notifications: {
        success: "Brief envoyé !",
        error: "Échec de l'envoi du message. Merci de réessayer.",
      },
      messageTemplate: {
        intro: "Nouveau brief projet envoyé via l'assistant de contact :",
        scope: "Périmètre du projet : {{scope}}",
        goals: "Objectifs : {{goals}}",
        budget: "Budget estimé : {{budget}}",
        desiredStart: "Démarrage souhaité : {{start}}",
        timingNotes: "Notes de planning : {{notes}}",
        fallbackNotes: "Non précisé",
      },
      formatting: {
        dateNotSpecified: "Non renseigné",
      },
    },
    info: {
      title: "Informations de contact",
      emailLabel: "E-mail",
      emailValue: "hi@amilemia.dev",
      locationLabel: "Localisation",
      locationValue: "À distance",
      connectTitle: "On reste en contact",
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
  },
  notFound: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },
  shared: {
    testimonials: [
      {
        quote: "Amina a transformé des demandes produit floues en une version impeccable, et ses revues d'accessibilité nous ont évité plusieurs cycles de QA.",
        author: "Lisa Dunn",
        role: "Head of Product, Relay CRM",
      },
      {
        quote: "Elle a livré notre site marketing en trois semaines avec l'analytics branché et une documentation que l'équipe utilise encore.",
        author: "Carlos Mendes",
        role: "Fondateur, Launchpad Studio",
      },
      {
        quote: "Attendez-vous à des questions pertinentes, des décisions pragmatiques et des points d'avancement avant même de devoir les demander.",
        author: "Naomi Chen",
        role: "COO, Stellar Labs",
      },
    ],
  },
};
