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
      nav.style.transform = `translateY(-${nav.offsetHeight}px)`;
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScrollY = window.scrollY;
  });

}

// Add this to your existing index.js file at the end

/* ---------------------
   CORNER CAFÉ SPECIAL EFFECTS
--------------------- */
function initCafeEffects() {
  // Add cozy corner class to sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('cozy-corner');
  });

  // Add café divider to section headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    const divider = document.createElement('div');
    divider.className = 'cafe-divider';
    divider.innerHTML = `
      <span class="cafe-divider-line"></span>
      <span class="cafe-divider-icon">🍴</span>
      <span class="cafe-divider-line"></span>
    `;
    header.appendChild(divider);
  });

  // Add warm hover effect to menu items
  const menuItems = document.querySelectorAll('.wine-list li, .dish');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function (e) {
      this.style.backgroundColor = 'rgba(212, 163, 115, 0.08)';
    });
    item.addEventListener('mouseleave', function (e) {
      this.style.backgroundColor = '';
    });
  });

  // Add subtle animation to contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function (e) {
      const icon = this.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    item.addEventListener('mouseleave', function (e) {
      const icon = this.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });
}

const openNav = document.getElementById("openNavigation");
const closeNav = document.getElementById("closeNavigation");
const navModal = document.getElementById("navModal");

if (openNav && navModal) {
  openNav.addEventListener("click", () => {
    navModal.classList.add("active");
  });
}

if (closeNav && navModal) {
  closeNav.addEventListener("click", () => {
    navModal.classList.remove("active");
  });
}

// Close when clicking outside
navModal?.addEventListener("click", (e) => {
  if (e.target === navModal) {
    navModal.classList.remove("active");
  }
});

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
  }
}

// Add phone click functionality
function initPhoneClick() {
  const phoneCards = document.querySelectorAll('.alternative-option.phone-clickable');
  const phoneNumber = '+32470771105';

  phoneCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Don't trigger if clicking on links inside
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      // Create a temporary link to trigger the phone call
      const link = document.createElement('a');
      link.href = `tel:${phoneNumber}`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
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
      't-home': 'Home',
      't-about': 'About',
      't-menus': 'Menu',
      't-gallery': 'Gallery',
      't-book': 'Book',
      't-logo': 'EETCAFÉ LIHANA',

      // Hero
      't-hero-sub': 'Belgian dining • Artisan café',
      't-reserve-btn': 'Reserve a Table',
      't-view-menus': 'View Menus',

      // About
      't-about-title': 'Belgian dining with cultural refinement',
      't-about-text':
        'LIHANA Eetcafé blends classic Belgian gastronomy with contemporary ambience. From morning espresso to evening dégustation, we craft memorable experiences that celebrate the art of Belgian cuisine.',
      't-stat2': 'Beer Selection',
      't-stat3': 'Guest Rating',

      // Menus – general
      't-menus-title': 'Our Menu',
      't-menus-subtitle': 'Discover our carefully crafted culinary experiences',
      't-menu-pdf': 'View full menu (PDF)',
      't-tab-dinner': 'Dinner',
      't-tab-cafe': 'Warm Drinks',
      't-tab-dessert': 'Desserts',
      't-tab-alcohol': 'Drinks',

      // Menu categories
      't-starters-title': 'Starters',
      't-mains-title': 'Main Dishes',
      't-snacks-title': 'Snacks',
      't-hotdrinks-title': 'Hot Drinks',
      't-desserts-title': 'Desserts',
      't-aperitifs-title': 'Aperitifs',
      't-cocktails-title': 'Cocktails',
      't-beers-title': 'Beers',
      't-spirits-title': 'Spirits',
      't-main-chicken-brochette': 'Chicken brochette 1 (-+150g) | 2 (-+300g)',

      // Starters
      't-starter-cheese': 'Cheese croquette 1/2/3',
      't-starter-shrimp': 'Shrimp croquette 1/2/3',
      't-starter-scampi': 'Scampi garlic(room) (5)',
      't-starter-scampi-tomaat': 'Scampi tomato(room) (5)',
      't-starter-scampi-diabolo': 'Scampi diabolo(room) (5)',
      't-starter-duo': 'Duo cheese & shrimp',
      't-starter-friet': 'Friet (Belgian fries)',
      't-starters-bitterballen': 'Portion bitterballen',
      't-starters-calamares': 'Portion calamares',
      't-starters-crispy-chicken': 'Portion crispy chicken',
      't-starters-loempias': 'Portion mini loempia’s',
      't-starters-hapjes': 'Hapjes',
      't-starters-mix': 'Portion mix',

      // Main dishes
      't-main-steak300-title': 'Steak ±300 g',
      't-main-steak300-desc':'Sauce (mushroom, pepper, béarnaise, provençale) + €3,00',

      't-main-steak180-title': 'Steak ±180 g',
      't-main-steak180-desc':'Sauce(mushroom, pepper, béarnaise, provençale) + €3,00',

      't-main-volauvent': 'Vol-au-vent',
      't-main-trout': 'Trout filet with herb butter',
      't-main-tagliatelle': 'Tagliatelle scampi',
      't-main-tagliata-title': 'Tagliata di manzo ±250 g',
      't-main-tagliata-desc': '',
      't-main-stoofvlees-title': 'Pork cheek stew',
      't-main-stoofvlees-desc': '',
      't-main-scampi-tomaat-title': 'pcs Scampi in tomato cream sauce',
      't-main-scampi-tomaat-desc': '',
      't-main-chicken-brochette-title': 'Chicken brochette 1 (-+150g) | 2 (-+300g)',
      't-main-chicken-brochette-desc': '',
      't-main-volauvent-title': 'Vol-au-vent',
      't-main-volauvent-desc': '',
      't -main-trout-title': 'Trout filet with herb butter',
      't-main-trout-desc': '',
      't-main-scampi-look-title': 'Scampi in garlic sauce (10 pcs)', 
      't-main-scampi-look-desc': '',
      't-main-scampi-diabolo-title': 'Scampi in diabolo sauce (10 pcs)',
      't-main-scampi-diabolo-desc': '',
      't-main-paardensteak-title': 'Horse steak ±300 g',
      't-main-paardensteak-desc': '',
      't-main-breaded-fish-title': 'Breaded fish filet',
      't-main-breaded-fish-desc': '',
      't-kids-menu-title': 'Kids menu',
      't-kids-volauvent': 'Vol-au-vent',
      't-kids-stoofvlees': 'Pork stew',
      't-kids-curryworst': '2 Curry sausages',

      // Snacks
      't-snack-bitterballen': 'bitterballen',
      't-snack-chicken': 'crispy chicken',
      't-snack-calamari': 'calamari',
      't-snack-mixed': 'mixed snack platter',

      // Hot drinks
      't-hotdrinks-title': 'Hot drinks',

      't-drink-coffee': 'Coffee',
      't-drink-deca': 'Deca',
      't-drink-espresso': 'Espresso',
      't-drink-cappuccino': 'Cappuccino',
      't-drink-latte': 'Latte',
      't-drink-chococcino': 'Chococcino',
      't-drink-chocolate': 'Hot chocolate',

      't-drink-tea': 'Tea',
      't-drink-tea-types': '(Rosehip, Lemon, Fruit, Mint, Camomile, Green tea & La Vie en Rose)',

      't-drink-irish-coffee': 'Irish coffee',
      't-drink-french-coffee': 'French coffee',
      't-drink-italian-coffee': 'Italian coffee',
      't-drink-chouffe-coffee': 'Chouffe coffee',
      't-drink-hasseltse-coffee': 'Hasselt coffee',
      't-drink-diplomaten-coffee': 'Diplomat coffee',
      't-drink-baileys-coffee': 'Baileys coffee',



      // Desserts
      't-dessert-dame1': 'Dame blanche (1 scoop)',
      't-dessert-dame2': 'Dame blanche (2 scoops)',
      't-dessert-advocaat1': 'Coupe advocaat (1 scoop)',
      't-dessert-advocaat2': 'Coupe advocaat (2 scoops)',
      't-dessert-bres1': 'Coupe brésilienne (1 scoop)',
      't-dessert-bres2': 'Coupe brésilienne (2 scoops)',
      't-dessert-moelleux': 'Moelleux au chocolat',
      't-dessert-pancake-sugar1': 'Pancake with sugar (1 pc)',
      't-dessert-pancake-sugar2': 'Pancake with sugar (2 pcs)',
      't-dessert-pancake-ice1': 'Pancake with ice cream (1 pc)',
      't-dessert-pancake-ice2': 'Pancake with ice cream (2 pcs)',
      't-dessert-pancake-bres1': 'Pancake brésilienne (1 pc)',
      't-dessert-pancake-bres2': 'Pancake brésilienne (2 pcs)',
      't-dessert-pancake-adv1': 'Pancake advocaat (1 pc)',
      't-dessert-pancake-adv2': 'Pancake advocaat (2 pcs)',
      't-dessert-waffle': 'Waffle with topping',
      't-dessert-kids': 'Children’s ice cream (Cornetto)',
      't-dessert-honeycake': 'Armenian honey cake (slice)',
      't-dessert-chips-salt': 'Chips (salt)',
      't-dessert-chips-paprika': 'Chips (paprika)',
      't-dessert-cacao': 'Armenian Cacao cake (slice)',

      // Alcohol
      't-alc-kirr': 'Kirr',
      't-alc-kirr-royal': 'Kirr Royal',
      't-alc-cava-glass': 'Cava (glass)',
      't-alc-cava-bottle': 'Cava (bottle)',
      't-alc-martini-wit': 'Martini white',
      't-alc-martini-rood': 'Martini red',
      't-alc-porto-red': 'Red port',
      't-alc-porto-white': 'White port',
      't-alc-pineau': 'Pineau de charentes',
      't-alc-sherry': 'Sherry',
      't-alc-campari': 'Campari',
      't-alc-pisang': 'Pisang Ambon',
      't-alc-ricard': 'Ricard',

      't-housewine-title': 'House wine',
      't-housewine-glass': 'Glass',
      't-housewine-quarter': 'Quarter litre',
      't-housewine-half': 'Half litre',
      't-housewine-bottle': 'Bottle',

      't-alc-mojito': 'Mojito',
      't-alc-mojito-strawberry': 'Strawberry Mojito',
      't-alc-gin-tonic': 'Gin & Tonic',
      't-alc-aperol': 'Aperol Spritz',
      't-alc-picon-wine': 'Picon / white wine',
      't-alc-virgin-mojito': 'Virgin Mojito',
      't-alc-virgin-mojito-strawberry': 'Virgin Mojito strawberry',
      't-alc-gin-tonic-0': 'Gin & Tonic 0%',

      // Beers
      't-beer-cristal': 'Cristal',
      't-beer-grimbergen': 'Grimbergen Blond',
      't-beer-kriek': 'Kriek Mort Subite',
      't-beer-maes': 'Maes',
      't-beer-orval': 'Orval',
      't-beer-leffe': 'Leffe Blond',
      't-beer-palm': 'Palm',
      't-beer-westmalle-extra': 'Westmalle Extra',
      't-beer-westmalle-Hoegarden': 'Hoegaarden White',
      't-beer-erdinger': 'Erdinger Weissbier',
      't-beer-carolus': 'Carolus Classic',
      't-beer-cornet': 'Cornet',
      't-beer-geuze': 'Geuze Boon (37.5cl)',
      't-beer-cornet-0': 'Cornet 0%',
      't-beer-sportzot': 'Sport Zot 0.4%',

      // Spirits
      't-alc-captain': 'Captain Morgan',
      't-alc-bacardi': 'Bacardi',
      't-alc-vodka': 'Vodka',
      't-alc-jb': 'J&B',
      't-alc-jackdaniels': 'Jack Daniel’s',
      't-alc-jenever': 'Jenever',
      't-alc-johnnie': 'Johnnie Walker Red Label',

      // Digestifs
      't-digestifs-title': 'Digestifs',
      't-alc-cointreau': 'Cointreau',
      't-alc-kruskovac': 'Kruskovac',
      't-alc-grandmarnier': 'Grand Marnier',
      't-alc-baileys': 'Baileys',
      't-alc-amaretto': 'Amaretto',
      't-alc-calvados': 'Calvados',
      't-alc-cognac': 'Cognac',

      't-nonalcoholic-title': 'Non-alcoholic drinks',

      't-soft-still-half': 'Still water 1/2L',
      't-soft-still-glass': 'Still water (glass)',
      't-soft-sparkling-half': 'Sparkling water 1/2L',
      't-soft-sparkling-glass': 'Sparkling water (glass)',

      't-soft-pepsi': 'Pepsi',
      't-soft-pepsi-max': 'Pepsi Max',
      't-soft-mirinda': 'Mirinda',
      't-soft-sevenup': 'Seven Up',
      't-soft-lipton': 'Lipton Ice Tea',
      't-soft-looza': 'Looza fruit juice',
      't-soft-schweppes': 'Schweppes Tonic',
      't-soft-naranja': 'Naranja',

      't-gallery-title': 'Gallery',
      't-gallery-subtitle': 'Step into our world of culinary excellence',
      't-gallery1': 'Scampi in tomato cream sauce',
      't-gallery3': 'Our Café',
      't-gallery4': 'Mix Grill',
      't-gallery5': 'Stew with pork cheeks',
      't-gallery6':'tagliata di manzo',
      't-gallery7': 'Steak 300g',


      // Contact
      't-contact-title': 'Visit Us',
      't-contact-address-label': 'Address',
      't-contact-phone-label': 'Phone',
      't-contact-email-label': 'Email',
      't-contact-hours-label': 'Hours',
      't-contact-hours': 'Every day: 11:00 – 22:00',
      't-contact-hours-wednesday': 'Wednesday: 08:00 – 22:00',
      'phone-reservation': 'Available by phone: Mon-Sun, 11:00 - 22:00, Wed 08:00 - 22:00',

      // Booking
      't-book-title': 'Reservation',
      't-telefone-reservation': 'Phone Reservation',
      't-book-subtitle':
        'Secure your table for a pleasant dining experience. We look forward to welcoming you to LIHANA Eetcafé.',
      't-phone-alternative':
        'Prefer to book by phone? Call us directly: 0470771105 📞',
      // Reservation tip
      't-reservation-tip-label': 'Tip:',
      't-reservation-tip-text':
        'For groups larger than 6 people, we recommend reserving in advance. Special occasion? Please mention it when making your reservation.',
      't-reserveren-header': 'Online Reservation',
      't-reservere-text': 'Select your preferred date and time',

      't-contact-navigate': 'Navigate',
      // Footer
      't-footer-logo': 'Eetcafé LIHANA',
      't-footer-desc':
        'Belgian culture meets modern refinement in the heart of Merchtem.',
      't-footer-links': 'Quick Links',
      't-footer-home': 'Home',
      't-footer-menus': 'Menus',
      't-footer-gallery': 'Gallery',
      't-footer-reservations': 'Reservations',
      't-footer-connect': 'Connect',
      't-footer-instagram': 'Instagram',
      't-footer-facebook': 'Facebook',
      't-footer-twitter': 'Twitter',
      't-footer-newsletter': 'Newsletter',
      't-footer-newsletter-desc':
        'Subscribe for exclusive offers and events',
      't-footer-email-placeholder': 'Your email address',
      't-footer-subscribe': 'Subscribe',
      't-footer-copyright':
        '© 2026 LIHANA Eetcafé — All rights reserved. Crafted with passion in Merchtem.',


    },

    fr: {
      't-home': 'Accueil',
      't-about': 'À propos',
      't-menus': 'Menu',
      't-gallery': 'Galerie',
      't-book': 'Réserver',
      't-logo': 'EETCAFÉ LIHANA',

      't-hero-sub': 'Restaurant belge • Café artisanal',
      't-reserve-btn': 'Réserver une table',
      't-view-menus': 'Voir les menus',

      't-about-title': 'Gastronomie belge au raffinement moderne',
      't-about-text':
        'LIHANA Eetcafé allie la gastronomie belge classique à une ambiance contemporaine.',
      't-stat2': 'Sélection de bières',
      't-stat3': 'Note des clients',

      't-menus-title': 'Nos Menu',
      't-menus-subtitle':
        'Découvrez nos expériences culinaires soigneusement élaborées',
      't-menu-pdf': 'Voir le menu complet (PDF)',
      't-tab-dinner': 'Dîner',
      't-tab-cafe': 'Boissons chaudes',
      't-tab-dessert': 'Desserts',
      't-tab-alcohol': 'Boissons',

      't-starters-title': 'Entrées',
      't-mains-title': 'Plats principaux',
      't-snacks-title': 'Snacks',
      't-hotdrinks-title': 'Boissons chaudes',
      't-desserts-title': 'Desserts',
      't-aperitifs-title': 'Apéritifs',
      't-cocktails-title': 'Cocktails',
      't-beers-title': 'Bières',
      't-spirits-title': 'Spiritueux',
      't-main-chicken-brochette': 'Brochette de poulet 1 (-+150g) | 2 (-+300g)',

      't-starter-cheese': 'Croquette au fromage 1/2/3',
      't-starter-shrimp': 'Croquette aux crevettes 1/2/3',
      't-starter-scampi': 'Scampis à l’ail(room) (5)',
      't-starter-scampi-tomaat': 'Scampi tomaat(room) (5)',
      't-starter-scampi-diabolo': 'Scampi diabolo(room) (5)',
      't-starter-duo': 'Duo de fromage & crevettes',
      't-starter-friet': 'Friet (frites belges)',
      't-starters-bitterballen': 'Partie itterballen ',
      't-starters-calamares': 'Partie calamares',
      't-starters-crispy-chicken': 'Partie crispy chicken',
      't-starters-loempias': 'Partie mini loempia’s',
      't-starters-hapjes': 'Hapjes',
      't-starters-mix': 'Partie mixte',

      't-main-steak300-title': 'Steak ±300 g',
      't-main-steak300-desc':
      'Sauce(champignon, poivre, béarnaise, provençale) + €3,00',

      't-main-steak180-title': 'Steak ±180 g',
      't-main-steak180-desc':
        'Sauce(champignon, poivre, béarnaise, provençale) + €3,00',

      't-main-volauvent': 'Vol-au-vent',
      't-main-trout': 'Filet de truite au beurre aux herbes',
      't-main-tagliatelle': 'Tagliatelle scampis',
      't-main-tagliata-title': 'Tagliata di manzo ±250 g',
      't-main-tagliata-desc': '',
      't-main-stoofvlees-title': 'Ragoût de joues de porc',
      't-main-stoofvlees-desc': '',
      't-main-scampi-tomaat-title': 'Scampi à la sauce tomate et crème',
      't-main-scampi-tomaat-desc': '',
      't-main-chicken-brochette-desc': '',
      't-main-volauvent-title': 'Vol-au-vent',
      't-main-volauvent-desc': '',
      't-main-trout-title': 'Filet de truite au beurre aux herbes',
      't-main-trout-desc': '',
      't-main-scampi-look-title': 'Scampi à l’ail (10 pcs)',
      't-main-scampi-look-desc': '',
      't-main-scampi-diabolo-title': 'Scampi diabolo (10 pcs)',
      't-main-scampi-diabolo-desc': '',
      't-main-paardensteak-title': 'Steak de Cheval ±300 g',
      't-main-paardensteak-desc': 'Sauce(champignon, poivre, béarnaise, provençale) + €3,00',
      't-main-breaded-fish-title': 'Filet de poisson pané',
      't-main-breaded-fish-desc': '',
      't-kids-title': 'Menu enfants',
      't-kids-menu-title': 'Menu enfant',
      't-kids-volauvent': 'Vol-au-vent',
      't-kids-stoofvlees': 'Ragoût de porc',
      't-kids-curryworst': '2 Curry saucisses',


      // Boissons chaudes
      't-hotdrinks-title': 'Boissons chaudes',

      't-drink-coffee': 'Café',
      't-drink-deca': 'Décaféiné',
      't-drink-espresso': 'Expresso',
      't-drink-cappuccino': 'Cappuccino',
      't-drink-latte': 'Latte',
      't-drink-chococcino': 'Chococcino',
      't-drink-chocolate': 'Chocolat chaud',

      't-drink-tea': 'Thé',
      't-drink-tea-types': '(Églantier, Citron, Fruits, Menthe, Camomille, Thé vert & La Vie en Rose)',

      't-drink-irish-coffee': 'Café irlandais',
      't-drink-french-coffee': 'Café français',
      't-drink-italian-coffee': 'Café italien',
      't-drink-chouffe-coffee': 'Café Chouffe',
      't-drink-hasseltse-coffee': 'Café hasseltois',
      't-drink-diplomaten-coffee': 'Café diplomate',
      't-drink-baileys-coffee': 'Café Baileys',



      // Desserts
      't-dessert-dame1': 'Dame blanche (1 boule)',
      't-dessert-dame2': 'Dame blanche (2 boules)',
      't-dessert-advocaat1': 'Coupe advocaat (1 boule)',
      't-dessert-advocaat2': 'Coupe advocaat (2 boules)',
      't-dessert-bres1': 'Coupe brésilienne (1 boule)',
      't-dessert-bres2': 'Coupe brésilienne (2 boules)',
      't-dessert-moelleux': 'Moelleux au chocolat',
      't-dessert-pancake-sugar1': 'Crêpe au sucre (1 pièce)',
      't-dessert-pancake-sugar2': 'Crêpe au sucre (2 pièces)',
      't-dessert-pancake-ice1': 'Crêpe avec glace (1 pièce)',
      't-dessert-pancake-ice2': 'Crêpe avec glace (2 pièces)',
      't-dessert-pancake-bres1': 'Crêpe brésilienne (1 pièce)',
      't-dessert-pancake-bres2': 'Crêpe brésilienne (2 pièces)',
      't-dessert-pancake-adv1': 'Crêpe à l’advocaat (1 pièce)',
      't-dessert-pancake-adv2': 'Crêpe à l’advocaat (2 pièces)',
      't-dessert-waffle': 'Gaufre avec garniture',
      't-dessert-kids': 'Glace enfant (Cornetto)',
      't-dessert-honeycake': 'Gâteau au miel Arménien (part)',
      't-dessert-chips-salt': 'Chips (sel)',
      't-dessert-chips-paprika': 'Chips (paprika)',
      't-dessert-cacao': 'Gateau au cacao Arménien (part)',


      // Alcool
      't-alc-kirr': 'Kirr',
      't-alc-kirr-royal': 'Kirr Royal',
      't-alc-cava-glass': 'Cava (verre)',
      't-alc-cava-bottle': 'Cava (bouteille)',
      't-alc-martini-wit': 'Martini blanc',
      't-alc-martini-rood': 'Martini rouge',
      't-alc-porto-red': 'Porto rouge',
      't-alc-porto-white': 'Porto blanc',
      't-alc-pineau': 'Pinot de charantes',
      't-alc-sherry': 'Xérès',
      't-alc-campari': 'Campari',
      't-alc-pisang': 'Pisang Ambon',
      't-alc-ricard': 'Ricard',

      't-housewine-title': 'Vin maison',
      't-housewine-glass': 'Verre',
      't-housewine-quarter': 'Quart',
      't-housewine-half': 'Demi-litre',
      't-housewine-bottle': 'Bouteille',

      't-alc-mojito': 'Mojito',
      't-alc-mojito-strawberry': 'Mojito fraise',
      't-alc-gin-tonic': 'Gin & Tonic',
      't-alc-aperol': 'Aperol Spritz',
      't-alc-picon-wine': 'Picon / vin blanc',
      't-alc-virgin-mojito': 'Virgin Mojito',
      't-alc-virgin-mojito-strawberry': 'Virgin Mojito fraise',
      't-alc-gin-tonic-0': 'Gin & Tonic 0%',

      // Bières
      't-beer-cristal': 'Cristal',
      't-beer-grimbergen': 'Grimbergen Blonde',
      't-beer-kriek': 'Kriek Mort Subite',
      't-beer-maes': 'Maes',
      't-beer-orval': 'Orval',
      't-beer-leffe': 'Leffe Blonde',
      't-beer-palm': 'Palm',
      't-beer-westmalle-extra': 'Westmalle Extra',
      't-beer-westmalle-Hoegarden': 'Hoegaarden Blanc',
      't-beer-erdinger': 'Erdinger Weissbier',
      't-beer-carolus': 'Carolus Classic',
      't-beer-cornet': 'Cornet',
      't-beer-geuze': 'Geuze Boon (37,5cl)',
      't-beer-cornet-0': 'Cornet 0%',
      't-beer-sportzot': 'Sport Zot 0,4%',

      // Spiritueux
      't-alc-captain': 'Captain Morgan',
      't-alc-bacardi': 'Bacardi',
      't-alc-vodka': 'Vodka',
      't-alc-jb': 'J&B',
      't-alc-jackdaniels': 'Jack Daniel’s',
      't-alc-jenever': 'Genièvre',
      't-alc-johnnie': 'Johnnie Walker Red Label',

      // Digestifs
      't-digestifs-title': 'Digestifs',
      't-alc-cointreau': 'Cointreau',
      't-alc-kruskovac': 'Kruskovac',
      't-alc-grandmarnier': 'Grand Marnier',
      't-alc-baileys': 'Baileys',
      't-alc-amaretto': 'Amaretto',
      't-alc-calvados': 'Calvados',
      't-alc-cognac': 'Cognac',

      't-nonalcoholic-title': 'Boissons non alcoolisées',

      't-soft-still-half': 'Eau plate 1/2L',
      't-soft-still-glass': 'Eau plate (verre)',
      't-soft-sparkling-half': 'Eau pétillante 1/2L',
      't-soft-sparkling-glass': 'Eau pétillante (verre)',

      't-soft-pepsi': 'Pepsi',
      't-soft-pepsi-max': 'Pepsi Max',
      't-soft-mirinda': 'Mirinda',
      't-soft-sevenup': 'Seven Up',
      't-soft-lipton': 'Lipton Ice Tea',
      't-soft-looza': 'Jus Looza',
      't-soft-schweppes': 'Schweppes Tonic',
      't-soft-naranja': 'Naranja',

      //Galerie
      't-gallery-title': 'Galerie',
      't-gallery-subtitle': 'Entrez dans notre univers d’excellence culinaire',
      't-gallery1': 'Scampi à la sauce tomate et crème',
      't-gallery3': 'Notre Café',
      't-gallery4': 'Mix Grill',
      't-gallery5': 'Ragoût de joues de porc',
      't-gallery6':'tagliata di manzo',
      't-gallery7': 'Steak 300g',

      't-contact-title': 'Nous rendre visite',
      't-contact-address-label': 'Adresse',
      't-contact-address': 'Bogaerdstraat 7, 1785 Merchtem, Belgique',
      't-contact-phone-label': 'Téléphone',
      't-contact-email-label': 'Email',
      't-contact-hours-label': 'Horaires',
      't-contact-hours': 'Tous les jours: 11h00 22h00',
      't-contact-hours-wednesday': 'Mercredi : 08h00 – 22h00',
      't-contact-navigate': 'Itinéraire',
      'phone-reservation': 'Disponible par téléphone : Lun-Dim, 11h00 - 22h00, Mer 08h00 - 22h00',

      // Booking
      't-book-title': 'Réservation',
      't-telefone-reservation': 'Réservation par téléphone',
      't-book-subtitle':
        'Réservez votre table pour une expérience culinaire agréable. Nous avons hâte de vous accueillir chez LIHANA Eetcafé.',
      't-phone-alternative':
        'Vous préférez réserver par téléphone ? Appelez-nous directement: 0470771105 📞',

      // Reservation tip
      't-reservation-tip-label': 'Conseil :',
      't-reservation-tip-text':'Pour les groupes de plus de 6 personnes, nous recommandons de réserver à l’avance. Occasion spéciale ? Merci de le mentionner lors de votre réservation.',
      't-reserveren-header': 'Réservation en ligne',
      't-reservere-text': 'Sélectionnez votre date et heure préférées',

      // Footer
      't-footer-logo': 'Eetcafé LIHANA',
      't-footer-desc':
        'La culture belge rencontre le raffinement moderne au cœur de Merchtem.',
      't-footer-links': 'Liens rapides',
      't-footer-home': 'Accueil',
      't-footer-menus': 'Menus',
      't-footer-gallery': 'Galerie',
      't-footer-reservations': 'Réservations',
      't-footer-connect': 'Suivez-nous',
      't-footer-instagram': 'Instagram',
      't-footer-facebook': 'Facebook',
      't-footer-twitter': 'Twitter',
      't-footer-newsletter': 'Newsletter',
      't-footer-newsletter-desc':
        'Abonnez-vous pour recevoir des offres et événements exclusifs',
      't-footer-email-placeholder': 'Votre adresse email',
      't-footer-subscribe': 'S’abonner',
      't-footer-copyright':
        '© 2026 LIHANA Eetcafé — Tous droits réservés. Créé avec passion à Merchtem.',

    },

    nl: {
      't-home': 'Home',
      't-about': 'Over ons',
      't-menus': "Menu",
      't-gallery': 'Galerij',
      't-book': 'Reserveren',
      't-logo': 'EETCAFÉ LIHANA',

      't-hero-sub': 'Belgisch restaurant • Ambachtelijk café',
      't-reserve-btn': 'Reserveer een tafel',
      't-view-menus': "Bekijk Menu",

      't-about-title': 'Belgisch diner met moderne verfijning',
      't-about-text':
        'LIHANA Eetcafé combineert klassieke Belgische gastronomie met een eigentijdse sfeer.',
      't-stat2': 'Bierselectie',
      't-stat3': 'Gastbeoordeling',

      't-menus-title': "Onze Menu",
      't-menus-subtitle':
        'Ontdek onze zorgvuldig samengestelde culinaire ervaringen',
      't-menu-pdf': 'Bekijk volledige menukaart (PDF)',
      't-tab-dinner': 'Diner',
      't-tab-cafe': 'Warme drankjes',
      't-tab-dessert': 'Desserts',
      't-tab-alcohol': 'Dranken',

      't-starters-title': 'Voorgerechten',
      't-mains-title': 'Hoofdgerechten',
      't-snacks-title': 'Snacks',
      't-hotdrinks-title': 'Warme dranken',
      't-desserts-title': 'Desserts',
      't-aperitifs-title': 'Aperitieven',
      't-cocktails-title': 'Cocktails',
      't-beers-title': 'Bieren',
      't-spirits-title': 'Sterke dranken',
      't-main-chicken-brochette': 'Kipbrochette 1 (-+150) | 2 (-+300g)',

      't-starter-cheese': 'Kaaskroket 1/2/3',
      't-starter-shrimp': 'Garnaalkroket 1/2/3',
      't-starter-scampi': 'Scampi look(room) (5)',
      't-starter-scampi-tomaat': 'Scampi tomaat(room) (5)',
      't-starter-scampi-diabolo': 'Scampi diabolo(room) (5)',
      't-starter-friet': 'Friet (Belgische frieten)',
      't-starters-bitterballen': 'Portie bitterballen',
      't-starters-calamares': 'Portie calamares',
      't-starters-crispy-chicken': 'Portie crispy chicken',
      't-starters-loempias': 'Portie mini Loempia’s',
      't-starters-hapjes': 'Hapjes',
      't-starters-mix':'Portie mix',

      't-main-steak300-title': 'Steak ±300 g',
      't-main-steak300-desc':
      'Saus(champignon, peper, béarnaise, provençale) + €3,00',

      't-main-steak180-title': 'Steak ±180 g',
      't-main-steak180-desc':
        'Saus(champignon, peper, béarnaise, provençale) + €3,00',

      't-main-volauvent': 'Vol-au-vent',
      't-main-trout': 'Forelfilet met kruidenboter',
      't-main-tagliatelle': 'Tagliatelle scampi',
      't-main-tagliata-title': 'Tagliata di manzo ±250 g',
      't-main-tagliata-desc': '',
      't-main-stoofvlees-title': 'Stoofvlees van varkenswangetjes',
      't-main-stoofvlees-desc': '',
      't-main-scampi-tomaat-title': 'Scampi tomaat(room) saus (10 stuks)',
      't-main-scampi-tomaat-desc': '',
      't-main-chicken-brochette-desc': '',
      't-main-volauvent-title': 'Vol-au-vent',
      't-main-volauvent-desc': '',
      't -main-trout-title': 'Forelfilet met kruidenboter',
      't-main-trout-desc': '',
      't-main-scampi-look-title': 'Scampi look(room) saus (10 stuks)',
      't-main-scampi-look-desc': '',
      't-main-scampi-diabolo-title': 'Scampi diabolo(room) saus (10 stuks)',
      't-main-scampi-diabolo-desc': '',
      't-main-paardensteak-title': 'Paardensteak ±300 g',
      't-main-paardensteak-desc': 'Saus(champignon, peper, béarnaise, provençale) + €3,00',
      't-main-breaded-fish-title': 'Gepaneerde vis',
      't-main-breaded-fish-desc': '',
      't-kids-title': 'Kindermenu',
      't-kids-menu-title': 'Kindermenu',
      't-kids-volauvent': 'Vol-au-vent (kindergerecht)',
      't-kids-stoofvlees': 'Stoofvlees (kindergerecht)',
      't-kids-curryworst': '2 curryworsten',
      't-starter-duo': 'Duo kaas & garnalen',

      // Warme drankjes
      't-hotdrinks-title': 'Warme drankjes',

      't-drink-coffee': 'Koffie',
      't-drink-deca': 'Deca',
      't-drink-espresso': 'Espresso',
      't-drink-cappuccino': 'Cappuccino',
      't-drink-latte': 'Latte',
      't-drink-chococcino': 'Chococcino',
      't-drink-chocolate': 'Warme chocolademelk',

      't-drink-tea': 'Thee',
      't-drink-tea-types': '(Rozenbottel, Citroen, Fruit, Munt, Kamille, Groene & La Vie en Rose)',

      't-drink-irish-coffee': 'Irish koffie',
      't-drink-french-coffee': 'French koffie',
      't-drink-italian-coffee': 'Italian koffie',
      't-drink-chouffe-coffee': 'Chouffe koffie',
      't-drink-hasseltse-coffee': 'Hasseltse koffie',
      't-drink-diplomaten-coffee': 'Diplomaten koffie',
      't-drink-baileys-coffee': 'Baileys koffie',


      // Desserts 
      't-dessert-dame1': 'Dame blanche (1 bol)',
      't-dessert-dame2': 'Dame blanche (2 bollen)',
      't-dessert-advocaat1': 'Coupe advocaat (1 bol)',
      't-dessert-advocaat2': 'Coupe advocaat (2 bollen)',
      't-dessert-bres1': 'Coupe brésilienne (1 bol)',
      't-dessert-bres2': 'Coupe brésilienne (2 bollen)',
      't-dessert-moelleux': 'Moelleux van chocolade',
      't-dessert-pancake-sugar1': 'Pannenkoek met suiker (1 stuk)',
      't-dessert-pancake-sugar2': 'Pannenkoek met suiker (2 stuks)',
      't-dessert-pancake-ice1': 'Pannenkoek met ijs (1 stuk)',
      't-dessert-pancake-ice2': 'Pannenkoek met ijs (2 stuks)',
      't-dessert-pancake-bres1': 'Pannenkoek brésilienne (1 stuk)',
      't-dessert-pancake-bres2': 'Pannenkoek brésilienne (2 stuks)',
      't-dessert-pancake-adv1': 'Pannenkoek met advocaat (1 stuk)',
      't-dessert-pancake-adv2': 'Pannenkoek met advocaat (2 stuks)',
      't-dessert-waffle': 'Wafel met topping',
      't-dessert-kids': 'Kinderijs (Cornetto)',
      't-dessert-honeycake': 'Armeense honingcake (stuk)',
      't-dessert-chips-salt': 'Chips (zout)',
      't-dessert-chips-paprika': 'Chips (paprika)',
      't-dessert-cacao': 'Armeense Cacao cake (stuk)',

      // Alcohol
      't-alc-kirr': 'Kirr',
      't-alc-kirr-royal': 'Kirr Royal',
      't-alc-cava-glass': 'Cava (glas)',
      't-alc-cava-bottle': 'Cava (fles)',
      't-alc-martini-wit': 'Martini wit',
      't-alc-martini-rood': 'Martini rood',
      't-alc-porto-red': 'Porto rood',
      't-alc-porto-white': 'Porto wit',
      't-alc-pineau': 'Pinot de charantes',
      't-alc-sherry': 'Sherry',
      't-alc-campari': 'Campari',
      't-alc-pisang': 'Pisang Ambon',
      't-alc-ricard': 'Ricard',

      't-housewine-title': 'Huiswijn',
      't-housewine-glass': 'Glas',
      't-housewine-quarter': 'Kwartje',
      't-housewine-half': '1/2 L',
      't-housewine-bottle': 'Fles',

      't-alc-mojito': 'Mojito',
      't-alc-mojito-strawberry': 'Mojito aardbei',
      't-alc-gin-tonic': 'Gin & Tonic',
      't-alc-aperol': 'Aperol Spritz',
      't-alc-picon-wine': 'Picon / witte wijn',
      't-alc-virgin-mojito': 'Virgin mojito',
      't-alc-virgin-mojito-strawberry': 'Virgin mojito aardbei',
      't-alc-gin-tonic-0': 'Gin & Tonic 0% alc',

      // Bieren
      't-beer-cristal': 'Cristal',
      't-beer-grimbergen': 'Grimbergen Blond',
      't-beer-kriek': 'Kriek Mort Subite',
      't-beer-maes': 'Maes',
      't-beer-orval': 'Orval',
      't-beer-leffe': 'Leffe Blond',
      't-beer-palm': 'Palm',
      't-beer-westmalle-extra': 'Westmalle Extra',
      't-beer-westmalle-Hoegarden': 'Hoegaarden Wit',
      't-beer-erdinger': 'Erdinger Weissbier',
      't-beer-carolus': 'Carolus Classic',
      't-beer-cornet': 'Cornet',
      't-beer-geuze': 'Geuze Boon (37,5cl)',
      't-beer-cornet-0': 'Cornet 0%',
      't-beer-sportzot': 'Sport Zot 0,4%',

      // Sterke drank
      't-alc-captain': 'Captain Morgan',
      't-alc-bacardi': 'Bacardi',
      't-alc-vodka': 'Vodka',
      't-alc-jb': 'J&B',
      't-alc-jackdaniels': 'Jack Daniel’s',
      't-alc-jenever': 'Jenever',
      't-alc-johnnie': 'Johnnie Walker Red Label',

      // Digestieven
      't-digestifs-title': 'Digestieven',
      't-alc-cointreau': 'Cointreau',
      't-alc-kruskovac': 'Kruskovac',
      't-alc-grandmarnier': 'Grand Marnier',
      't-alc-baileys': 'Baileys',
      't-alc-amaretto': 'Amaretto',
      't-alc-calvados': 'Calvados',
      't-alc-cognac': 'Cognac',

      't-nonalcoholic-title': 'Non-alcoholische dranken',

      't-soft-still-half': 'Plat water 1/2L',
      't-soft-still-glass': 'Plat water (glas)',
      't-soft-sparkling-half': 'Bruiswater 1/2L',
      't-soft-sparkling-glass': 'Bruiswater (glas)',

      't-soft-pepsi': 'Pepsi',
      't-soft-pepsi-max': 'Pepsi Max',
      't-soft-mirinda': 'Mirinda',
      't-soft-sevenup': 'Seven Up',
      't-soft-lipton': 'Lipton Ice Tea',
      't-soft-looza': 'Looza fruitsap',
      't-soft-schweppes': 'Schweppes Tonic',
      't-soft-naranja': 'Naranja',



      't-gallery-title': 'Galerij',
      't-gallery-subtitle': 'Stap binnen in onze wereld van culinaire verfijning',
      't-gallery1': 'Scampi in tomaat(room)saus',
      't-gallery3': 'Ons café',
      't-gallery4': 'Mix Grill',
      't-gallery5': 'Stoofvlees van varkenswangetjes',
      't-gallery6':'tagliata di manzo',
      't-gallery7': 'Steak 300g',

      // Contact
      't-contact-title': 'Bezoek ons',
      't-contact-address-label': 'Adres',
      't-contact-address': 'Bogaerdstraat 7, 1785 Merchtem, België',
      't-contact-phone-label': 'Telefoon',
      't-contact-email-label': 'E-mail',
      't-contact-hours-label': 'Openingsuren',
      't-contact-hours': 'Elke dag: 11:00 – 22:00',
      't-contact-hours-wednesday': 'Woensdag: 08:00 – 22:00',
      't-contact-navigate': 'Navigeren',
      'phone-reservation': 'Telefonisch bereikbaar: Ma-Zo 11:00 – 22:00, Wo 08:00 – 22:00',

      // Booking
      't-book-title': 'Reservering',
      't-telefone-reservation': 'Telefonische Reservatie',
      't-book-subtitle':
        'Reserveer uw tafel voor een aangename culinaire ervaring. Wij kijken ernaar uit u te verwelkomen bij LIHANA Eetcafé.',
      't-phone-alternative':
        'Liever telefonisch reserveren? Bel ons rechtstreeks: 0470771105 📞',
      // Reservation tip
      't-reservation-tip-label': 'Tip:',
      't-reservation-tip-text':'Voor groepen groter dan 6 personen adviseren wij vooraf te reserveren. Speciale gelegenheden? Vermeld dit bij uw reservering.',
      't-reserveren-header': 'Online Reservering',
      't-reservere-text': 'Selecteer uw gewenste datum en tijd',

      // Footer
      't-footer-logo': 'EETCAFÉ LIHANA',
      't-footer-desc':
        'Belgische cultuur ontmoet moderne verfijning in het hart van Merchtem.',
      't-footer-links': 'Snelle links',
      't-footer-home': 'Home',
      't-footer-menus': "Menu",
      't-footer-gallery': 'Galerij',
      't-footer-reservations': 'Reserveren',
      't-footer-connect': 'Volg ons',
      't-footer-instagram': 'Instagram',
      't-footer-facebook': 'Facebook',
      't-footer-twitter': 'Twitter',
      't-footer-newsletter': 'Nieuwsbrief',
      't-footer-newsletter-desc':
        'Schrijf u in voor exclusieve aanbiedingen en evenementen',
      't-footer-email-placeholder': 'Uw e-mailadres',
      't-footer-subscribe': 'Inschrijven',
      't-footer-copyright':
        '© 2026 LIHANA Eetcafé — Alle rechten voorbehouden. Met passie gemaakt in Merchtem.',

    }
  };

  const langButtons = document.querySelectorAll('.lang-switcher button');
  if (!langButtons.length) return;

  function updateLanguage(lang) {
    const data = langData[lang];
    if (!data) return;

    Object.entries(data).forEach(([key, value]) => {
      document.querySelectorAll(`.${key}`).forEach(el => {
        if (el.tagName === 'INPUT') {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      });
    });

    document.documentElement.lang = lang;
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLanguage(btn.dataset.lang);
    });
  });

  updateLanguage('nl');
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
   ENHANCED NAVIGATION MODAL
--------------------- */
function initNavigationModal() {
  const openNav = document.getElementById("openNavigation");
  const closeNav = document.getElementById("closeNavigation");
  const navModal = document.getElementById("navModal");
  const copyAddressBtn = document.getElementById("copyAddress");

  // Open modal
  if (openNav && navModal) {
    openNav.addEventListener("click", (e) => {
      e.preventDefault();
      navModal.classList.add("active");
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  // Close modal
  if (closeNav && navModal) {
    closeNav.addEventListener("click", () => {
      navModal.classList.remove("active");
      document.body.style.overflow = '';
    });
  }

  // Close when clicking outside
  if (navModal) {
    navModal.addEventListener("click", (e) => {
      if (e.target === navModal || e.target.classList.contains('nav-modal-overlay')) {
        navModal.classList.remove("active");
        document.body.style.overflow = '';
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navModal?.classList.contains('active')) {
      navModal.classList.remove("active");
      document.body.style.overflow = '';
    }
  });

  // Copy address functionality
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const address = "Bogaerdstraat 7, 1785 Merchtem, België";
      try {
        await navigator.clipboard.writeText(address);

        // Visual feedback
        const originalText = copyAddressBtn.innerHTML;
        copyAddressBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Gekopieerd!
        `;
        copyAddressBtn.style.color = '#4CAF50';

        setTimeout(() => {
          copyAddressBtn.innerHTML = originalText;
          copyAddressBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Adres kopiëren mislukt. Kopieer handmatig: ' + address);
      }
    });
  }
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

/* Note: CSS for floating menu tabs has been moved to styles.css */

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
  initSmoothScrolling();
  initLazyLoading();
  initGalleryCarousel();
  initPhoneClick();
  initNavigationModal();
  initCafeEffects();
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


