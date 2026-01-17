// Navbar scroll effect
function initNavbarScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (navMenu?.classList.contains("open")) {
      nav.style.transform = 'translateY(0)';
      lastScrollY = window.scrollY;
      return;
    }

    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScrollY = window.scrollY;
  });

}

function revealSections() {
  const els = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.85;

  els.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav nav");

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open"); // ← ADD THIS LINE
  });
}


window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/* ---------------------
   GSAP ENTRANCE ANIMATIONS
--------------------- */

function initGSAPAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations (for main page)
    const heroTitle = document.querySelector('.hero-title');
    const heroSub = document.querySelector('.hero-sub');
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    const heroLogo = document.querySelector('.hero-logo-image');
    if (heroLogo) {
      gsap.to(heroLogo, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out"
      });
    }


    if (heroTitle) {
      gsap.to(heroTitle, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });
    }

    if (heroSub) {
      gsap.to(heroSub, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
      });
    }

    if (heroBtns.length > 0) {
      gsap.to(heroBtns, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.9,
        stagger: 0.2,
        ease: "power3.out"
      });
    }

    // Tasting hero animations (for tasting page)
    const tastingTitle = document.querySelector('.tasting-hero-content h1');
    const tastingSubtitle = document.querySelector('.tasting-hero-content p');
    const tastingBtn = document.querySelector('.tasting-hero-content .btn');

    if (tastingTitle) {
      gsap.to(tastingTitle, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });
    }

    if (tastingSubtitle) {
      gsap.to(tastingSubtitle, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
      });
    }

    if (tastingBtn) {
      gsap.to(tastingBtn, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out"
      });
    }

    // Parallax effect for hero (main page)
    const hero = document.querySelector('.hero');
    if (hero) {
      gsap.to(hero, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Parallax effect for tasting hero
    const tastingHero = document.querySelector('.tasting-hero');
    if (tastingHero) {
      gsap.to(tastingHero, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: tastingHero,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Animate dishes on scroll (main page)
    const dishes = document.querySelectorAll('.dish');
    dishes.forEach(dish => {
      gsap.fromTo(dish, {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: dish,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate courses on scroll (tasting page)
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
      gsap.fromTo(course, {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: course,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      gsap.fromTo(item, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });

  } else {
    console.warn('GSAP or ScrollTrigger not loaded');
    // Fallback: Show elements immediately if GSAP fails
    document.querySelectorAll('.hero-title, .hero-sub, .hero-btn, .tasting-hero-content h1, .tasting-hero-content p, .tasting-hero-content .btn').forEach(el => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
}

/* ---------------------
   MENU TABS (Main page only)
--------------------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".menu-content");

  if (tabs.length === 0 || sections.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(m => m.classList.remove("active"));
      tab.classList.add("active");

      const targetSection = document.getElementById(tab.dataset.menu);
      if (targetSection) {
        targetSection.classList.add("active");

        // Add subtle animation when switching tabs
        gsap.fromTo(targetSection, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  });
}

/* ---------------------
   COMPLETE LANGUAGE SYSTEM FOR BELGISCH EETCAFÉ
--------------------- */
function initLanguageSystem() {
  const langData = {
    en: {
      // Navigation
      't-home': "Home",
      't-about': "About",
      't-menus': "Menus",
      't-gallery': "Gallery",
      't-tasting': "Tasting Menu",
      't-book': "Book",
      't-logo': "LIHANA EETCAFÉ",

      't-tab-alcohol': "Alcohol",
      't-aperitifs-title': "Aperitifs",
      't-cocktails-title': "Cocktails",
      't-beers-title': "Beers",
      't-spirits-title': "Spirits & Digestifs",
      't-starters-title': "Starters",
      't-mains-title': "Main Dishes",
      't-snacks-title': "Snacks",
      't-hotdrinks-title': "Hot Drinks",
      't-desserts-title': "Desserts",


      // Hero Section
      't-hero-title': "LIHANA Eetcafé",
      't-hero-sub': "Belgian dining • Artisan café",
      't-reserve-btn': "Reserve a Table",
      't-view-menus': "View Menus",

      // Café Intro
      't-cafe-intro-title': "Mornings at LIHANA",
      't-cafe-intro-text': "Start your day with artisan pastries, fresh-roasted coffee and a tranquil Parisian café atmosphere.",
      't-feature1-title': "Artisan Coffee",
      't-feature1-text': "Freshly roasted beans from Paris",
      't-feature2-title': "Belgian Pastries",
      't-feature2-text': "Baked fresh daily",
      't-feature3-title': "Relaxing Tea",
      't-feature3-text': "Perfect for Tea time",

      // About Section
      't-about-title': "Belgian Dining with cultural refinement",
      't-about-text': "LIHANA Eetcafé blends classic Belgian gastronomy with contemporary ambience. From morning espresso to evening dégustation, we craft memorable experiences that celebrate the art of Belgian cuisine.",
      't-stat1': "Years Experience",
      't-stat2': "Wine Selection",
      't-stat3': "Guest Rating",

      // Menus Section
      't-menu-pdf': "View full menu (PDF)",
      't-menus-title': "Our Menus",
      't-menus-subtitle': "Discover our carefully crafted culinary experiences",
      't-tab-dinner': "Dinner",
      't-tab-cafe': "Café",
      't-tab-dessert': "Desserts",
      't-tab-wine': "Wine List",

      // Dinner Menu
      't-dish1-title': "Coquilles Saint-Jacques",
      't-dish1-desc': "Seared scallops, beurre blanc, citrus emulsion, micro herbs",
      't-dish2-title': "Soupe à l'Oignon",
      't-dish2-desc': "Caramelised onions, rich beef broth, Gruyère crust, croutons",
      't-dish3-title': "Canard à l'Orange",
      't-dish3-desc': "Crispy duck breast, orange gastrique, seasonal vegetables, potato gratin",

      // Café Menu
      't-cafe1-title': "Croissant au Beurre",
      't-cafe1-desc': "Freshly baked every morning with Belgian butter, flaky and golden",
      't-cafe2-title': "Quiche Lorraine",
      't-cafe2-desc': "Smoked bacon, Gruyère cheese, crème fraîche in buttery pastry",

      // Dessert Menu
      't-dessert1-title': "Crème Brûlée",
      't-dessert1-desc': "Vanilla bean custard, caramelized sugar top, seasonal berries",

      // Wine List
      't-wine-white': "White Wines",
      't-wine-red': "Red Wines",
      't-wine-sparkling': "Sparkling",
      't-wine1-name': "Chablis Premier Cru",
      't-wine1-region': "Burgundy, France",
      't-wine2-name': "Sancerre",
      't-wine2-region': "Loire Valley, France",
      't-wine3-name': "Château Margaux",
      't-wine3-region': "Bordeaux, France",
      't-wine4-name': "Châteauneuf-du-Pape",
      't-wine4-region': "Rhône Valley, France",
      't-wine5-name': "Champagne Brut",
      't-wine5-region': "Champagne, France",

      // Gallery
      't-gallery-title': "Gallery",
      't-gallery-subtitle': "Step into our world of culinary excellence",
      't-gallery1': "Elegant Dining Room",
      't-gallery2': "Wine Cellar",
      't-gallery3': "Chef's Kitchen",
      't-gallery4': "Artisan Desserts",

      // Booking Form
      't-book-title': "Reserve Your Experience",
      't-book-subtitle': "Secure your table for an unforgettable dining experience",
      't-form-name': "Full Name",
      't-form-name-placeholder': "Enter your full name",
      't-form-email': "Email Address",
      't-form-phone': "Phone Number",
      't-form-phone-placeholder': "+1 (555) 123-4567",
      't-form-guests': "Number of Guests",
      't-form-guests-default': "Select number of guests",
      't-form-guests-1': "1 person",
      't-form-guests-2': "2 people",
      't-form-guests-3': "3 people",
      't-form-guests-4': "4 people",
      't-form-guests-5': "5 people",
      't-form-guests-6': "6 people",
      't-form-guests-7': "7+ people (special arrangement)",
      't-form-date': "Preferred Date",
      't-form-time': "Preferred Time",
      't-form-time-default': "Select preferred time",
      't-form-requests': "Special Requests",
      't-form-requests-placeholder': "Dietary restrictions, allergies, celebrations, or any special requirements...",
      't-submit-btn': "Reserve Now",
      't-submit-loading': "Processing...",
      't-confirm-title': "Reservation Confirmed!",
      't-confirm-message': "Thank you for choosing LIHANA Eetcafé. We've received your booking request and will send a confirmation email shortly.",
      't-confirm-steps': "Next Steps:",
      't-confirm-step1': "Check your email for confirmation",
      't-confirm-step2': "Arrive 15 minutes early",
      't-confirm-step3': "Present your confirmation at reception",
      't-new-booking': "Make Another Reservation",
      't-phone-alternative': "Prefer to book by phone? Call us directly:",

      // Contact Section
      't-contact-title': "Visit Us",
      't-contact-address-label': "Address",
      't-contact-address': "12 Rue Lumière, Mayfair<br>London W1K 4QU",
      't-contact-phone-label': "Phone",
      't-contact-phone': "+44 20 7123 4567",
      't-contact-email-label': "Email",
      't-contact-email': "reservations@LIHANAeetcafe.com",
      't-contact-hours-label': "Hours",
      't-contact-hours': "Monday - Sunday: 8am – 11pm<br>Weekend Brunch: 10am - 3pm",
      't-map-text': "📍 12 Rue Lumière, Mayfair, London",

      // Footer
      't-footer-logo': "LIHANA Eetcafé",
      't-footer-desc': "Belgian elegance meets modern refinement in the heart of London.",
      't-footer-links': "Quick Links",
      't-footer-home': "Home",
      't-footer-menus': "Menus",
      't-footer-gallery': "Gallery",
      't-footer-reservations': "Reservations",
      't-footer-connect': "Connect",
      't-footer-instagram': "Instagram",
      't-footer-facebook': "Facebook",
      't-footer-twitter': "Twitter",
      't-footer-newsletter': "Newsletter",
      't-footer-newsletter-desc': "Subscribe for exclusive offers and events",
      't-footer-email-placeholder': "Your email address",
      't-footer-subscribe': "Subscribe",
      't-footer-copyright': "© 2024 LIHANA Eetcafé — All rights reserved. Crafted with passion in London.",

      // Page Title
      't-page-title': "LIHANA Eetcafé | Belgian Dining & Artisan Café",



      // Tasting Menu Page
      't-tasting-title': "Chef's Tasting Menu",
      't-tasting-subtitle': "An exclusive seven-course journey through Belgian-French culinary excellence",
      't-tasting-duration-label': "Duration",
      't-tasting-duration': "2.5 - 3 hours",
      't-tasting-price-label': "Price",
      't-tasting-price': "€145 per person",
      't-tasting-wine-label': "Wine Pairing",
      't-tasting-wine': "+€75",
      't-tasting-reserve-btn': "Reserve Your Experience",
      't-tasting-journey-title': "A Culinary Journey",
      't-tasting-journey-text': "Our Chef's Tasting Menu is a carefully curated experience that takes you through the seasons and regions of Belgium and France. Each course tells a story, celebrating the finest ingredients and traditional techniques with modern flair.",
      't-wine-pairing-label': "Wine Pairing:",
      't-pairing-label': "Pairing:",

      // Courses
      't-course1-title': "Amuse-Bouche",
      't-course1-desc': "Goat's cheese mousse with honeycomb, fresh herbs, and edible flowers. A delicate start to awaken the palate.",
      't-course1-wine': "Champagne Brut Premier",

      't-course2-title': "Scallop Carpaccio",
      't-course2-desc': "Hand-dived scallops, lemon zest, truffle oil, micro herbs, and sea salt. A celebration of the ocean's purity.",
      't-course2-wine': "Chablis Premier Cru",

      't-course3-title': "Truffle Velouté",
      't-course3-desc': "Black truffle essence, wild mushroom duxelles, and chive oil. Earthy elegance in every spoonful.",
      't-course3-wine': "Meursault",

      't-course4-title': "Seared Duck Breast",
      't-course4-desc': "Crispy duck breast, orange gastrique, confit shallots, and seasonal vegetables. A classic reimagined.",
      't-course4-wine': "Pinot Noir, Burgundy",

      't-course5-title': "Fromage Course",
      't-course5-desc': "Selection of French and Belgian cheeses with fig compote, walnut bread, and honey from Provence.",
      't-course5-wine': "Sauternes",

      't-course6-title': "White Chocolate Parfait",
      't-course6-desc': "White chocolate parfait, raspberry coulis, mint essence, and gold leaf. A symphony of sweetness.",
      't-course6-wine': "Muscat de Beaumes-de-Venise",

      't-course7-title': "Petits Fours",
      't-course7-desc': "Selection of handmade chocolates, Belgian macarons, and canelés to conclude your journey.",
      't-course7-pairing': "Coffee or Tea Selection",

      // Tasting Notes
      't-notes-title': "Important Information",
      't-note1': "Advanced reservation required - 48 hours notice",
      't-note2': "Please inform us of any dietary restrictions when booking",
      't-note3': "Menu changes seasonally to showcase the finest ingredients",
      't-note4': "Wine pairing can be customized upon request",
      't-note5': "Vegetarian and pescatarian options available",
      't-cta-text': "Ready for an unforgettable culinary experience?",
      't-cta-btn': "Reserve Your Table",

      // Footer for tasting page
      't-footer-contact': "Contact"
    },
    fr: {
      // Navigation
      't-home': "Accueil",
      't-about': "À propos",
      't-menus': "Menus",
      't-gallery': "Galerie",
      't-tasting': "Menu Dégustation",
      't-book': "Réserver",
      't-logo': "LIHANA EETCAFÉ",

      // Hero Section
      't-hero-title': "LIHANA Eetcafé",
      't-hero-sub': "Restaurant belge • Café artisanal",
      't-reserve-btn': "Réserver une Table",
      't-view-menus': "Voir les Menus",

      // Café Intro
      't-cafe-intro-title': "Matinées chez LIHANA",
      't-cafe-intro-text': "Commencez votre journée avec des pâtisseries artisanales, du café fraîchement torréfié et une atmosphère paisible de café parisien.",
      't-feature1-title': "Café Artisanal",
      't-feature1-text': "Grains fraîchement torréfiés de Paris",
      't-feature2-title': "Pâtisseries Belges",
      't-feature2-text': "Cuites fraîches quotidiennement",
      't-feature3-title': "Thé Détente",
      't-feature3-text': "Parfait pour l'heure du thé",

      // About Section
      't-about-title': "Gastronomie Belge au Raffinement Moderne",
      't-about-text': "LIHANA Eetcafé allie la gastronomie belge classique à une ambiance contemporaine. De l'espresso du matin à la dégustation du soir, nous créons des expériences mémorables qui célèbrent l'art de la cuisine belge.",
      't-stat1': "Années d'Expérience",
      't-stat2': "Sélection de Vins",
      't-stat3': "Note des Clients",

      // Menus Section
      't-menu-pdf': "Voir le menu complet (PDF)",
      't-menus-title': "Nos Menus",
      't-menus-subtitle': "Découvrez nos expériences culinaires soigneusement élaborées",
      't-tab-dinner': "Dîner",
      't-tab-cafe': "Café",
      't-tab-dessert': "Desserts",
      't-tab-wine': "Carte des Vins",

      // Dinner Menu
      't-dish1-title': "Coquilles Saint-Jacques",
      't-dish1-desc': "Saint-jacques poêlées, beurre blanc, émulsion d'agrumes, micro-herbes",
      't-dish2-title': "Soupe à l'Oignon",
      't-dish2-desc': "Oignons caramélisés, riche bouillon de bœuf, croûte de Gruyère, croûtons",
      't-dish3-title': "Canard à l'Orange",
      't-dish3-desc': "Magret de canard croustillant, gastrique d'orange, légumes de saison, gratin de pommes de terre",

      // Café Menu
      't-cafe1-title': "Croissant au Beurre",
      't-cafe1-desc': "Cuit frais chaque matin avec du beurre belge, feuilleté et doré",
      't-cafe2-title': "Quiche Lorraine",
      't-cafe2-desc': "Lard fumé, fromage Gruyère, crème fraîche dans une pâte brisée",

      // Dessert Menu
      't-dessert1-title': "Crème Brûlée",
      't-dessert1-desc': "Crème à la vanille, dessus caramélisé, baies de saison",

      // Wine List
      't-wine-white': "Vins Blancs",
      't-wine-red': "Vins Rouges",
      't-wine-sparkling': "Vins Effervescents",
      't-wine1-name': "Chablis Premier Cru",
      't-wine1-region': "Bourgogne, France",
      't-wine2-name': "Sancerre",
      't-wine2-region': "Vallée de la Loire, France",
      't-wine3-name': "Château Margaux",
      't-wine3-region': "Bordeaux, France",
      't-wine4-name': "Châteauneuf-du-Pape",
      't-wine4-region': "Vallée du Rhône, France",
      't-wine5-name': "Champagne Brut",
      't-wine5-region': "Champagne, France",

      // Gallery
      't-gallery-title': "Galerie",
      't-gallery-subtitle': "Entrez dans notre monde d'excellence culinaire",
      't-gallery1': "Salle à Manger Élégante",
      't-gallery2': "Cave à Vin",
      't-gallery3': "Cuisine du Chef",
      't-gallery4': "Desserts Artisanaux",

      // Booking Form
      't-book-title': "Réservez Votre Expérience",
      't-book-subtitle': "Réservez votre table pour une expérience culinaire inoubliable",
      't-form-name': "Nom Complet",
      't-form-name-placeholder': "Entrez votre nom complet",
      't-form-email': "Adresse Email",
      't-form-phone': "Numéro de Téléphone",
      't-form-phone-placeholder': "+33 1 23 45 67 89",
      't-form-guests': "Nombre de Convives",
      't-form-guests-default': "Sélectionnez le nombre de convives",
      't-form-guests-1': "1 personne",
      't-form-guests-2': "2 personnes",
      't-form-guests-3': "3 personnes",
      't-form-guests-4': "4 personnes",
      't-form-guests-5': "5 personnes",
      't-form-guests-6': "6 personnes",
      't-form-guests-7': "7+ personnes (arrangement spécial)",
      't-form-date': "Date Préférée",
      't-form-time': "Heure Préférée",
      't-form-time-default': "Sélectionnez l'heure préférée",
      't-form-requests': "Demandes Spéciales",
      't-form-requests-placeholder': "Restrictions alimentaires, allergies, célébrations, ou toute exigence particulière...",
      't-submit-btn': "Réserver Maintenant",
      't-submit-loading': "Traitement en cours...",
      't-confirm-title': "Réservation Confirmée!",
      't-confirm-message': "Merci d'avoir choisi LIHANA Eetcafé. Nous avons reçu votre demande de réservation et vous enverrons un email de confirmation sous peu.",
      't-confirm-steps': "Prochaines Étapes:",
      't-confirm-step1': "Vérifiez votre email pour la confirmation",
      't-confirm-step2': "Arrivez 15 minutes à l'avance",
      't-confirm-step3': "Présentez votre confirmation à la réception",
      't-new-booking': "Faire une Autre Réservation",
      't-phone-alternative': "Préférez réserver par téléphone? Appelez-nous directement:",

      // Contact Section
      't-contact-title': "Visitez-Nous",
      't-contact-address-label': "Adresse",
      't-contact-address': "12 Rue Lumière, Mayfair<br>Londres W1K 4QU",
      't-contact-phone-label': "Téléphone",
      't-contact-phone': "+44 20 7123 4567",
      't-contact-email-label': "Email",
      't-contact-email': "reservations@LIHANAeetcafe.com",
      't-contact-hours-label': "Horaires",
      't-contact-hours': "Lundi - Dimanche: 8h – 23h<br>Brunch Weekend: 10h - 15h",
      't-map-text': "📍 12 Rue Lumière, Mayfair, Londres",

      // Footer
      't-footer-logo': "LIHANA Eetcafé",
      't-footer-desc': "L'élégance belge rencontre le raffinement moderne au cœur de Londres.",
      't-footer-links': "Liens Rapides",
      't-footer-home': "Accueil",
      't-footer-menus': "Menus",
      't-footer-gallery': "Galerie",
      't-footer-reservations': "Réservations",
      't-footer-connect': "Connecter",
      't-footer-instagram': "Instagram",
      't-footer-facebook': "Facebook",
      't-footer-twitter': "Twitter",
      't-footer-newsletter': "Newsletter",
      't-footer-newsletter-desc': "Abonnez-vous pour des offres et événements exclusifs",
      't-footer-email-placeholder': "Votre adresse email",
      't-footer-subscribe': "S'abonner",
      't-footer-copyright': "© 2024 LIHANA Eetcafé — Tous droits réservés. Créé avec passion à Londres.",

      // Page Title
      't-page-title': "LIHANA Eetcafé | Restaurant Belge & Café Artisanal",

      // Tasting Menu Page - French
      't-tasting-title': "Menu Dégustation du Chef",
      't-tasting-subtitle': "Un voyage exclusif de sept plats à travers l'excellence culinaire belge-française",
      't-tasting-duration-label': "Durée",
      't-tasting-duration': "2,5 - 3 heures",
      't-tasting-price-label': "Prix",
      't-tasting-price': "145€ par personne",
      't-tasting-wine-label': "Accord Mets-Vins",
      't-tasting-wine': "+75€",
      't-tasting-reserve-btn': "Réserver Votre Expérience",
      't-tasting-journey-title': "Un Voyage Culinaire",
      't-tasting-journey-text': "Notre Menu Dégustation du Chef est une expérience soigneusement organisée qui vous emmène à travers les saisons et les régions de Belgique et de France. Chaque plat raconte une histoire, célébrant les meilleurs ingrédients et techniques traditionnelles avec une touche moderne.",
      't-wine-pairing-label': "Accord de Vin:",
      't-pairing-label': "Accompagnement:",

      // Courses - French
      't-course1-title': "Amuse-Bouche",
      't-course1-desc': "Mousse de chèvre avec nid d'abeille, herbes fraîches et fleurs comestibles. Un début délicat pour éveiller le palais.",
      't-course1-wine': "Champagne Brut Premier",

      't-course2-title': "Carpaccio de Saint-Jacques",
      't-course2-desc': "Saint-jacques plongées à la main, zeste de citron, huile de truffe, micro-herbes et sel de mer. Une célébration de la pureté de l'océan.",
      't-course2-wine': "Chablis Premier Cru",

      't-course3-title': "Velouté de Truffe",
      't-course3-desc': "Essence de truffe noire, duxelles de champignons sauvages et huile de ciboulette. Élégance terreuse dans chaque cuillère.",
      't-course3-wine': "Meursault",

      't-course4-title': "Magret de Canard Poêlé",
      't-course4-desc': "Magret de canard croustillant, gastrique d'orange, échalotes confites et légumes de saison. Un classique réinventé.",
      't-course4-wine': "Pinot Noir, Bourgogne",

      't-course5-title': "Plateau de Fromages",
      't-course5-desc': "Sélection de fromages français et belges avec compote de figues, pain aux noix et miel de Provence.",
      't-course5-wine': "Sauternes",

      't-course6-title': "Parfait au Chocolat Blanc",
      't-course6-desc': "Parfait au chocolat blanc, coulis de framboise, essence de menthe et feuille d'or. Une symphonie de douceur.",
      't-course6-wine': "Muscat de Beaumes-de-Venise",

      't-course7-title': "Petits Fours",
      't-course7-desc': "Sélection de chocolats faits à la main, macarons belges et canelés pour conclure votre voyage.",
      't-course7-pairing': "Sélection de Café ou Thé",

      // Tasting Notes - French
      't-notes-title': "Informations Importantes",
      't-note1': "Réservation à l'avance requise - 48 heures de préavis",
      't-note2': "Veuillez nous informer de toute restriction alimentaire lors de la réservation",
      't-note3': "Le menu change selon les saisons pour mettre en valeur les meilleurs ingrédients",
      't-note4': "L'accord mets-vins peut être personnalisé sur demande",
      't-note5': "Options végétariennes et pescétariennes disponibles",
      't-cta-text': "Prêt pour une expérience culinaire inoubliable?",
      't-cta-btn': "Réserver Votre Table",

      // Footer for tasting page - French
      't-footer-contact': "Contact"
    },
    nl: {
      // Navigation
      't-home': "Home",
      't-about': "Over Ons",
      't-menus': "Menu's",
      't-gallery': "Galerij",
      't-tasting': "Proefmenu",
      't-book': "Reserveren",
      't-logo': "LIHANA EETCAFÉ",

      // Hero Section
      't-hero-title': "LIHANA Eetcafé",
      't-hero-sub': "Belgisch restaurant • Ambachtelijk café",
      't-reserve-btn': "Reserveer een Tafel",
      't-view-menus': "Bekijk Menu's",

      // Café Intro
      't-cafe-intro-title': "Ochtenden bij LIHANA",
      't-cafe-intro-text': "Begin uw dag met ambachtelijke gebakjes, vers gebrande koffie en een rustige Parijse café sfeer.",
      't-feature1-title': "Ambachtelijke Koffie",
      't-feature1-text': "Vers gebrande bonen uit Parijs",
      't-feature2-title': "Belgische Gebakjes",
      't-feature2-text': "Dagelijks vers gebakken",
      't-feature3-title': "Ontspannende Thee",
      't-feature3-text': "Perfect voor de theetijd",

      // About Section
      't-about-title': "Belgisch Diner met Moderne Verfijning",
      't-about-text': "LIHANA Eetcafé combineert klassieke Belgische gastronomie met een eigentijdse sfeer. Van ochtendkoffie tot avondproeverij, wij creëren gedenkwaardige ervaringen die de kunst van de Belgische keuken vieren.",
      't-stat1': "Jaar Ervaring",
      't-stat2': "Wijn Selectie",
      't-stat3': "Gast Beoordeling",

      // Menus Section
      't-menu-pdf': "Bekijk volledige menukaart (PDF)",
      't-menus-title': "Onze Menu's",
      't-menus-subtitle': "Ontdek onze zorgvuldig samengestelde culinaire ervaringen",
      't-tab-dinner': "Diner",
      't-tab-cafe': "Café",
      't-tab-dessert': "Desserts",
      't-tab-wine': "Wijnkaart",

      // Dinner Menu
      't-dish1-title': "Coquilles Saint-Jacques",
      't-dish1-desc': "Gebakken sint-jakobsschelpen, beurre blanc, citrusemulsie, microkruiden",
      't-dish2-title': "Soupe à l'Oignon",
      't-dish2-desc': "Gekaramelliseerde uien, rijke runderbouillon, Gruyère korst, croutons",
      't-dish3-title': "Canard à l'Orange",
      't-dish3-desc': "Krokante eendenborst, sinaasappel gastrique, seizoensgroenten, aardappelgratin",

      // Café Menu
      't-cafe1-title': "Croissant au Beurre",
      't-cafe1-desc': "Elke ochtend versgebakken met Belgische boter, bladerig en goudbruin",
      't-cafe2-title': "Quiche Lorraine",
      't-cafe2-desc': "Gerookt spek, Gruyère kaas, crème fraîche in boterdeeg",

      // Dessert Menu
      't-dessert1-title': "Crème Brûlée",
      't-dessert1-desc': "Vanillemergie, gekaramelliseerde suiker, seizoensfruit",

      // Wine List
      't-wine-white': "Witte Wijnen",
      't-wine-red': "Rode Wijnen",
      't-wine-sparkling': "Mousserend",
      't-wine1-name': "Chablis Premier Cru",
      't-wine1-region': "Bourgondië, Frankrijk",
      't-wine2-name': "Sancerre",
      't-wine2-region': "Loire Vallei, Frankrijk",
      't-wine3-name': "Château Margaux",
      't-wine3-region': "Bordeaux, Frankrijk",
      't-wine4-name': "Châteauneuf-du-Pape",
      't-wine4-region': "Rhône Vallei, Frankrijk",
      't-wine5-name': "Champagne Brut",
      't-wine5-region': "Champagne, Frankrijk",

      // Gallery
      't-gallery-title': "Galerij",
      't-gallery-subtitle': "Stap binnen in onze wereld van culinaire excellentie",
      't-gallery1': "Elegante Eetkamer",
      't-gallery2': "Wijnkelder",
      't-gallery3': "Keuken van de Chef",
      't-gallery4': "Ambachtelijke Desserts",

      // Booking Form
      't-book-title': "Reserveer Uw Ervaring",
      't-book-subtitle': "Reserveer uw tafel voor een onvergetelijke dinerervaring",
      't-form-name': "Volledige Naam",
      't-form-name-placeholder': "Vul uw volledige naam in",
      't-form-email': "E-mailadres",
      't-form-phone': "Telefoonnummer",
      't-form-phone-placeholder': "+32 123 45 67 89",
      't-form-guests': "Aantal Gasten",
      't-form-guests-default': "Selecteer aantal gasten",
      't-form-guests-1': "1 persoon",
      't-form-guests-2': "2 personen",
      't-form-guests-3': "3 personen",
      't-form-guests-4': "4 personen",
      't-form-guests-5': "5 personen",
      't-form-guests-6': "6 personen",
      't-form-guests-7': "7+ personen (speciale regeling)",
      't-form-date': "Gewenste Datum",
      't-form-time': "Gewenste Tijd",
      't-form-time-default': "Selecteer gewenste tijd",
      't-form-requests': "Speciale Verzoeken",
      't-form-requests-placeholder': "Dieetbeperkingen, allergieën, vieringen, of speciale vereisten...",
      't-submit-btn': "Reserveer Nu",
      't-submit-loading': "Verwerken...",
      't-confirm-title': "Reservering Bevestigd!",
      't-confirm-message': "Bedankt voor het kiezen van LIHANA Eetcafé. We hebben uw reserveringsverzoek ontvangen en sturen binnenkort een bevestigingsmail.",
      't-confirm-steps': "Volgende Stappen:",
      't-confirm-step1': "Controleer uw email voor bevestiging",
      't-confirm-step2': "Kom 15 minuten van tevoren",
      't-confirm-step3': "Toon uw bevestiging bij de receptie",
      't-new-booking': "Nieuwe Reservering Maken",
      't-phone-alternative': "Liever telefonisch reserveren? Bel ons direct:",

      // Contact Section
      't-contact-title': "Bezoek Ons",
      't-contact-address-label': "Adres",
      't-contact-address': "12 Rue Lumière, Mayfair<br>Londen W1K 4QU",
      't-contact-phone-label': "Telefoon",
      't-contact-phone': "+44 20 7123 4567",
      't-contact-email-label': "E-mail",
      't-contact-email': "reservations@LIHANAeetcafe.com",
      't-contact-hours-label': "Openingstijden",
      't-contact-hours': "Maandag - Zondag: 8u – 23u<br>Weekend Brunch: 10u - 15u",
      't-map-text': "📍 12 Rue Lumière, Mayfair, Londen",

      // Footer
      't-footer-logo': "LIHANA Eetcafé",
      't-footer-desc': "Belgische elegantie ontmoet moderne verfijning in het hart van Londen.",
      't-footer-links': "Snelle Links",
      't-footer-home': "Home",
      't-footer-menus': "Menu's",
      't-footer-gallery': "Galerij",
      't-footer-reservations': "Reserveringen",
      't-footer-connect': "Verbinden",
      't-footer-instagram': "Instagram",
      't-footer-facebook': "Facebook",
      't-footer-twitter': "Twitter",
      't-footer-newsletter': "Nieuwsbrief",
      't-footer-newsletter-desc': "Abonneer voor exclusieve aanbiedingen en evenementen",
      't-footer-email-placeholder': "Uw e-mailadres",
      't-footer-subscribe': "Abonneren",
      't-footer-copyright': "© 2024 LIHANA Eetcafé — Alle rechten voorbehouden. Met passie gemaakt in Londen.",

      // Page Title
      't-page-title': "LIHANA Eetcafé | Belgisch Restaurant & Ambachtelijk Café",

      // Tasting Menu Page - Dutch
      't-tasting-title': "Chef's Proefmenu",
      't-tasting-subtitle': "Een exclusieve zeven-gangen reis door Belgisch-Franse culinaire excellentie",
      't-tasting-duration-label': "Duur",
      't-tasting-duration': "2,5 - 3 uur",
      't-tasting-price-label': "Prijs",
      't-tasting-price': "€145 per persoon",
      't-tasting-wine-label': "Wijnarrangement",
      't-tasting-wine': "+€75",
      't-tasting-reserve-btn': "Reserveer Uw Ervaring",
      't-tasting-journey-title': "Een Culinair Avontuur",
      't-tasting-journey-text': "Ons Chef's Proefmenu is een zorgvuldig samengestelde ervaring die u meeneemt door de seizoenen en regio's van België en Frankrijk. Elke gang vertelt een verhaal en viert de beste ingrediënten en traditionele technieken met moderne flair.",
      't-wine-pairing-label': "Wijnarrangement:",
      't-pairing-label': "Begeleiding:",

      // Courses - Dutch
      't-course1-title': "Amuse-Bouche",
      't-course1-desc': "Geitenkaasmousse met honingraat, verse kruiden en eetbare bloemen. Een delicate start om de smaakpapillen te wekken.",
      't-course1-wine': "Champagne Brut Premier",

      't-course2-title': "Saint-Jacques Carpaccio",
      't-course2-desc': "Handgeduikte sint-jakobsschelpen, citroenschil, truffelolie, microkruiden en zeezout. Een viering van de zuiverheid van de oceaan.",
      't-course2-wine': "Chablis Premier Cru",

      't-course3-title': "Truffel Velouté",
      't-course3-desc': "Zwarte truffelessence, wilde champignon duxelles en bieslookolie. Aardse elegantie in elke lepel.",
      't-course3-wine': "Meursault",

      't-course4-title': "Gebakken Eendenborst",
      't-course4-desc': "Krokante eendenborst, sinaasappel gastrique, confijt sjalotten en seizoensgroenten. Een klassieker opnieuw uitgevonden.",
      't-course4-wine': "Pinot Noir, Bourgogne",

      't-course5-title': "Kaasgang",
      't-course5-desc': "Selectie van Franse en Belgische kazen met vijgencompote, walnootbrood en honing uit Provence.",
      't-course5-wine': "Sauternes",

      't-course6-title': "Witte Chocolade Parfait",
      't-course6-desc': "Witte chocolade parfait, frambozencoulis, muntessence en bladgoud. Een symfonie van zoetheid.",
      't-course6-wine': "Muscat de Beaumes-de-Venise",

      't-course7-title': "Petits Fours",
      't-course7-desc': "Selectie van handgemaakte chocolades, Belgische macarons en canelés om uw reis af te sluiten.",
      't-course7-pairing': "Koffie of Thee Selectie",

      // Tasting Notes - Dutch
      't-notes-title': "Belangrijke Informatie",
      't-note1': "Reservering vooraf vereist - 48 uur van tevoren",
      't-note2': "Gelieve ons bij reservering te informeren over dieetbeperkingen",
      't-note3': "Menu verandert seizoensgebonden om de beste ingrediënten te tonen",
      't-note4': "Wijnarrangement kan op verzoek worden aangepast",
      't-note5': "Vegetarische en pescetarische opties beschikbaar",
      't-cta-text': "Klaar voor een onvergetelijke culinaire ervaring?",
      't-cta-btn': "Reserveer Uw Tafel",

      // Footer for tasting page - Dutch
      't-footer-contact': "Contact"
    }
  };

  const langButtons = document.querySelectorAll(".lang-switcher button");

  if (langButtons.length === 0) {
    console.log('No language buttons found');
    return;
  }

  function updateLanguage(lang) {
    const data = langData[lang];
    if (!data) {
      console.log('No language data for:', lang);
      return;
    }

    console.log('Updating language to:', lang);

    // Update all translatable elements
    Object.entries(data).forEach(([key, text]) => {
      const elements = document.querySelectorAll(`.${key}`);
      elements.forEach(element => {
        if (!element) return;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          // Handle placeholders for form elements
          if (element.placeholder) {
            element.placeholder = text;
          }
        } else if (element.tagName === 'OPTION') {
          // Handle option elements
          element.textContent = text;
        } else if (element.tagName === 'TITLE') {
          // Handle page title
          document.title = text;
        } else {
          // Handle regular elements
          if (element.innerHTML.includes('<br>')) {
            element.innerHTML = text;
          } else {
            element.textContent = text;
          }
        }
      });
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    console.log('Language update complete for:', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      console.log('Language button clicked:', lang);

      langButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateLanguage(lang);
    });
  });

  // Initialize with default language
  updateLanguage('en');
}

/* ---------------------
   BOOKING FORM (Main page only)
--------------------- */
function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;

  const bookingConfirmation = document.getElementById('bookingConfirmation');
  const newBookingBtn = document.getElementById('newBooking');
  const submitBtn = bookingForm.querySelector('.submit-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');

  // Set minimum date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Set default date to tomorrow
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (submitBtn && btnText && btnLoading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
    }

    // Basic form validation
    const requiredFields = bookingForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#ff6b6b';

        // Shake animation for invalid fields
        gsap.fromTo(field, {
          x: 0
        }, {
          x: 10,
          duration: 0.1,
          yoyo: true,
          repeat: 5,
          ease: "power1.inOut"
        });
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      if (submitBtn && btnText && btnLoading) {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show confirmation with animation
    if (bookingConfirmation) {
      bookingForm.style.display = 'none';
      bookingConfirmation.style.display = 'block';

      gsap.fromTo(bookingConfirmation, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      // Scroll to confirmation
      bookingConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (submitBtn && btnText && btnLoading) {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });

  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', function () {
      if (bookingConfirmation) {
        gsap.to(bookingConfirmation, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          onComplete: () => {
            bookingConfirmation.style.display = 'none';
            bookingForm.style.display = 'block';

            gsap.fromTo(bookingForm, {
              opacity: 0,
              y: 20
            }, {
              opacity: 1,
              y: 0,
              duration: 0.5
            });
          }
        });
      }
      bookingForm.reset();

      // Reset border colors
      bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
      });
    });
  }
}

/* ---------------------
   SMOOTH SCROLLING
--------------------- */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only handle internal page anchors, not external links
      if (href === '#' || href.startsWith('#!')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------------------
   GALLERY CAROUSEL
--------------------- */
function initGalleryCarousel() {
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.querySelector('.gallery-btn.prev');
  const nextBtn = document.querySelector('.gallery-btn.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
}


/* ---------------------
   IMAGE LAZY LOADING
--------------------- */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - initializing functions');

  // Test if buttons exist
  const reserveBtn = document.querySelector('a[href="#booking"]');
  const menusBtn = document.querySelector('a[href="#menus"]');
  console.log('Reserve button found:', reserveBtn);
  console.log('Menus button found:', menusBtn);

  // Your existing initialization
  initNavbarScroll();
  revealSections();
  initGSAPAnimations();
  initMenuTabs();
  initLanguageSystem();
  initBookingForm();
  initSmoothScrolling();
  initLazyLoading();
  initGalleryCarousel();
});

// Re-initialize on page resize
window.addEventListener('resize', revealSections);

// Add loading state management
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});

if (burger && navMenu) {
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });
}
