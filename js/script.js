// hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-collapse');
  const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const menuIcon = document.querySelector('#closeMenu');
  const menu = document.querySelector('#menu');

  navbarToggler.addEventListener('click', function () {
    navbarMenu.classList.toggle('show');
    navbarMenu.classList.toggle('mobileMenu');

    if (navbarMenu.classList.contains('show')) {
      menu.style.top = '0';
    } else {
      menu.style.top = '0';
    }
  });

  menuIcon.addEventListener('click', function () {
    navbarMenu.classList.remove('show');
    navbarMenu.classList.remove('mobileMenu');
    menu.style.top = '0';
  });

  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navbarMenu.classList.remove('show');
      navbarMenu.classList.remove('mobileMenu');
      menu.style.top = '0';
    });
  });
});
////////////////////////////////////////////////////////////////////////

// hide menu when the user scrolls down and show it when scrolls up
// let prevScrollPos = window.scrollY;
// let menu = document.getElementById('menu');

// window.addEventListener('scroll', function () {
//   let currentScrollPos = window.scrollY;

//   if (prevScrollPos > currentScrollPos) {
//     menu.style.top = '0';
//   } else {
//     menu.style.top = '-130px';
//   }

//   prevScrollPos = currentScrollPos;
// });

//////////////////////////////////////////////////

// removes desktopMenu class and adds menuMobile
function adjustMenuClasses() {
  const screenWidth = window.innerWidth;
  const navbarNav = document.querySelector('.navbar-collapse');
  const menuList = document.querySelector('.navbar-nav');

  if (screenWidth <= 992) {
    navbarNav.classList.remove('desktopMenu');
    menuList.classList.add('menuMobile');
  } else {
    menuList.classList.remove('menuMobile');
    navbarNav.classList.add('desktopMenu');
  }
}
////////////////////////////////////////////////////////

// accordion
const accordionItems = document.querySelectorAll('.accordionItem');
accordionItems.forEach((item) => {
  const readMoreLink = item.querySelector('.accordionLink');
  const content = item.querySelector('.accordionContent');

  readMoreLink.addEventListener('click', () => {
    content.classList.toggle('showAccordion');
  });
});
///////////////////////////////////////////////////////

// services btn redirect
let servicesBtns = document.getElementsByClassName('servicesBtn');
Array.from(servicesBtns).forEach(function (button) {
  button.addEventListener('click', function () {
    var url = document.createElement('a');
    url.href = 'services.html';
    url.click();
  });
});
//////////////////////////////////////////////////////////////////////

// appointment  button redirect
let appBtns = document.querySelectorAll('.appBtn');
appBtns.forEach(function (button) {
  button.addEventListener('click', function () {
    window.location.href =
      'https://urbanoptic.programari.cloud.onlineservice.io/';
  });
});
////////////////////////////////////////////////////////////////////////////

// dynamic year in the footer area
let currentYear = new Date().getFullYear();
let copyrightText = document.getElementById('currentYear');
copyrightText.textContent = 'Copyright © ' + currentYear + ' | Urban Optic';
//////////////////////////////////////////////////////////////////////////

// removes yellowBg for mobile and tablet
function removeYellowBg() {
  const screenWidth = window.innerWidth;
  const yellowBgSection = document.getElementById('promo');

  if (screenWidth <= 992) {
    yellowBgSection.classList.remove('yellowBg');
  } else {
    yellowBgSection.classList.add('yellowBg');
  }
}
///////////////////////////////////////////////////////////////////////

// removes blackBg for mobile and tablet
function removeBlackBg() {
  const screenWidth = window.innerWidth;
  const blackBgSection = document.getElementById('contact');

  if (screenWidth <= 992) {
    blackBgSection.classList.remove('blackBg');
  } else {
    blackBgSection.classList.add('blackBg');
  }
}
////////////////////////////////////////////////////////////////////////

// Call the function initially when the page loads
document.addEventListener('DOMContentLoaded', function () {
  adjustMenuClasses();
  removeYellowBg();
  removeBlackBg();
});

// Attach an event listener to the window resize event
window.addEventListener('resize', function () {
  adjustMenuClasses();
  removeYellowBg();
  removeBlackBg();
});
/////////////////////////////////////////////////////////////////////////

// Check if the URL contains a hash key
if (window.location.hash) {
  // Clear the hash key
  history.replaceState(
    null,
    document.title,
    window.location.pathname + window.location.search
  );
}

// updates menu and logo as per section
function updateLogoAndMenu(sectionId) {
  const logo = document.querySelector('.logo');
  const menuLinks = document.querySelectorAll('.desktopMenu a');

  menuLinks.forEach((link) => {
    link.classList.remove('active');
  });

  switch (sectionId) {
    case 'home':
      logo.src = './img/logo-dark.png';
      break;
    case 'about':
      logo.src = './img/logo-light.png';
      const aboutLink = document.querySelector('.desktopMenu .aboutLink');
      aboutLink.classList.add('active');
      break;
    case 'services':
      logo.src = './img/logo-light.png';
      const servicesLink = document.querySelector('.desktopMenu .servicesLink');
      servicesLink.classList.add('active');
      break;
    case 'promo':
      logo.src = './img/logo-dark.png';
      const promoLink = document.querySelector('.desktopMenu .promoLink');
      promoLink.classList.add('active');
      break;
    case 'contact':
      logo.src = './img/logo-light.png';
      const contactLink = document.querySelector('.desktopMenu .contactLink');
      contactLink.classList.add('active');
      break;
    default:
      logo.src = './img/logo-light.png';
      break;
  }
}

/////////////////////////////////

// changes button color
function changeButtonStyle(yellowBtn) {
  const navBtn = document.getElementById('navBtn');

  if (yellowBtn) {
    navBtn.classList.add('yellowMenuBtn');
  } else {
    navBtn.classList.remove('yellowMenuBtn');
  }
  console.log(navBtn);
}

// changes nav links color
function changeNavLinksStyle(whiteNavLinks) {
  const navLinks = document.querySelectorAll('.desktopMenu a');

  navLinks.forEach((link) => {
    if (whiteNavLinks) {
      link.classList.add('whiteNavLinks');
    } else {
      link.classList.remove('whiteNavLinks');
    }
  });
}
//////////////////////////////////////////////////////////////

// lift Promotions

const liftPromotions = (sectionId) => {
  const windowWidth = window.innerWidth;
  const scrollWidth = window.scrollX;
  const sectionOffset = document
    .getElementById(sectionId)
    .getBoundingClientRect().left;

  const promoImgDiv = document.getElementById('curtain');

  if (
    sectionId === 'promo' &&
    scrollWidth > sectionOffset - windowWidth + 100
  ) {
    setTimeout(function () {
      promoImgDiv.classList.add('curtainEffect');
    }, 2500);
  } else {
    promoImgDiv.classList.remove('curtainEffect');
  }
};

//////////////////////////////////////////

// image slider

const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const slides = document.querySelector('.slides');
const dotsContainer = document.querySelector('.dots');

let slideIndex = 0;
const totalSlides = slides.children.length;

prevBtn.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  }
  showSlide();
});

nextBtn.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }
  showSlide();
});

function showSlide() {
  const slideWidth = slides.clientWidth;
  slides.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
  updateDots();
}

function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      slideIndex = i;
      showSlide();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add('activeDot');
    } else {
      dot.classList.remove('activeDot');
    }
  });
}

createDots();
showSlide();
////////////////////////////////////////////////////

// changes text color -> this works when the user clicks on a link from the menu
function setNavbarTextColor(elementId) {
  let navbar = document.getElementById(elementId);
  let navbarLinks = navbar.querySelectorAll('a');

  // Get the current section based on window location hash
  let currentHash = window.location.hash;

  for (let i = 0; i < navbarLinks.length; i++) {
    let link = navbarLinks[i];

    // Check if the link attribute matches the desired value
    if (currentHash === '#contact') {
      link.style.color = '#fff';
    } else {
      link.style.color = '#343434';
    }
  }
}

// changes button style in the navbar -> this works when the user clicks on a link from the menu
function setNavbarButtonStyle(elementId) {
  let navbar = document.getElementById(elementId);
  let button = navbar.querySelector('.menuBtn');

  let currentHash = window.location.hash;

  if (currentHash === '#contact') {
    button.style.backgroundColor = '#ffcc01';
    button.style.color = '#343434';
  } else {
    button.style.backgroundColor = '#343434';
    button.style.color = '#ffcc01';
  }
}

// changes logo -> this works when the user clicks on a link from the menu
function setNavbarLogo(elementId) {
  let navbar = document.getElementById(elementId);
  let logo = navbar.querySelector('.logo');

  let currentHash = window.location.hash;

  if (currentHash === '#home') {
    logo.src = './img/logo-dark.png';
  } else if (currentHash === '#promo') {
    logo.src = './img/logo-dark.png';
  } else {
    logo.src = './img/logo-light.png';
  }

  console.log(logo.src);
}

////////////////////////////////////////////////////

// horizontal scrolling
let scrollTimeout = null; // Variable to store the scroll timeout
const sections = document.querySelectorAll('section');
const mainContainer = document.querySelector('.mainContainer');

function scrollHorizontal(e) {
  if (window.innerWidth >= 992) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    const mainContainer = document.querySelector('.mainContainer');
    const currentScrollLeft = mainContainer.scrollLeft;

    clearTimeout(scrollTimeout); // Clear any existing scroll timeout

    let targetSection = null;
    let targetPosition = null;

    if (delta > 0) {
      // Scrolling to the right
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionStart = section.offsetLeft;

        if (
          sectionStart > currentScrollLeft &&
          (!targetSection || sectionStart < targetPosition)
        ) {
          targetSection = section;
          targetPosition = sectionStart;
          break;
        }
      }
    } else {
      // Scrolling to the left
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionStart = section.offsetLeft;

        if (
          sectionStart < currentScrollLeft &&
          (!targetSection || sectionStart > targetPosition)
        ) {
          targetSection = section;
          targetPosition = sectionStart;
          break;
        }
      }
    }

    if (targetSection) {
      const scrollDelay = 100; // Adjust the scroll delay as needed

      scrollTimeout = setTimeout(() => {
        const animateScroll = () => {
          const distance = targetPosition - mainContainer.scrollLeft;
          const scrollStep =
            delta > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);

          mainContainer.scrollLeft += scrollStep;

          // Stop the scroll animation when reaching the target position
          if (
            (delta > 0 && mainContainer.scrollLeft >= targetPosition) ||
            (delta < 0 && mainContainer.scrollLeft <= targetPosition)
          ) {
            clearTimeout(scrollTimeout);

            // Update the section ID in the URL hash
            const sectionID = targetSection.getAttribute('id');
            if (sectionID) {
              window.location.hash = sectionID;

              // Reset the hash if the target section has an ID of "home"
              if (sectionID === 'home') {
                window.location.hash = '';
              }
            }

            // Add activeSection class to the visible section and remove from others
            sections.forEach((section) => {
              if (section === targetSection) {
                section.classList.remove('inactiveSection');
                section.classList.add('activeSection');
              } else {
                section.classList.add('inactiveSection');
                section.classList.remove('activeSection');
              }
            });

            // Update the logo and menu based on the current section ID
            updateLogoAndMenu(sectionID);

            // Check if scrolled to the promo section and call liftPromotions
            if (sectionID === 'promo') {
              liftPromotions('promo');
            }

            // Check if scrolled to the about section and display aboutDesk container
            if (sectionID === 'about') {
              const aboutDeskContainer = document.getElementById('aboutDesk');
              setTimeout(function () {
                aboutDeskContainer.style.display = 'block';
                aboutDeskContainer.classList.add('fade-in');
                setTimeout(function () {
                  aboutDeskContainer.style.opacity = '1';
                }, 3000);
              }, 3000);
            }

            // Check if scrolled to the contact section and change button and nav link styles
            if (sectionID === 'contact') {
              changeButtonStyle(true);
              changeNavLinksStyle(true);
            } else {
              changeButtonStyle(false);
              changeNavLinksStyle(false);
            }
          } else {
            requestAnimationFrame(animateScroll);
          }
        };

        animateScroll();
      }, scrollDelay);
    }

    mainContainer.classList.remove('mobileMainContainer');
  }
}

// Add event listener for mouse wheel
window.addEventListener('wheel', scrollHorizontal);

/////////////////////////////////////////////////

// menu links event listener
const menuLinks = document.querySelectorAll('.desktopMenu a');
const aboutDeskContainer = document.getElementById('aboutDesk');

menuLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    const sectionId = this.getAttribute('href').substring(1);
    updateLogoAndMenu(sectionId);
    const targetSection = document.getElementById(sectionId);

    // Add activeSection class to the clicked menu link
    menuLinks.forEach((link) => {
      link.classList.remove('active');
    });
    this.classList.add('active');

    // Add activeSection class to the clicked section and remove from others
    sections.forEach((section) => {
      if (section === targetSection) {
        section.classList.add('activeSection');
      } else {
        section.classList.remove('activeSection');
      }
    });

    // Scroll to the clicked section
    const mainContainer = document.querySelector('.mainContainer');
    const targetPosition = targetSection.offsetLeft;
    const distance = targetPosition - mainContainer.scrollLeft;
    const scrollStep = Math.floor(distance / 10);

    const scrollAnimation = setInterval(() => {
      mainContainer.scrollLeft += scrollStep;

      if (
        (scrollStep > 0 && mainContainer.scrollLeft >= targetPosition) ||
        (scrollStep < 0 && mainContainer.scrollLeft <= targetPosition)
      ) {
        clearInterval(scrollAnimation);
        mainContainer.scrollLeft = targetPosition;
      }
    }, 100);

    setNavbarTextColor('menu');
    setNavbarButtonStyle('menu');
    setNavbarLogo('menu');

    // Additional functionality for specific sections
    if (sectionId === 'about') {
      setTimeout(() => {
        aboutDeskContainer.style.display = 'block';
        aboutDeskContainer.classList.add('fade-in');
        setTimeout(() => {
          aboutDeskContainer.style.opacity = '1';
        }, 3000);
      }, 3000);
    }

    if (sectionId === 'promo') {
      setNavbarLogo('promo');
      changeButtonStyle(false);
      changeNavLinksStyle(false);
    }

    if (sectionId === 'contact') {
      setNavbarLogo('menu');
      changeButtonStyle(true);
      changeNavLinksStyle(true);
    } else {
      changeButtonStyle(false);
      changeNavLinksStyle(false);
    }

    // Update URL with the hash ID
    history.pushState(null, null, `#${sectionId}`);
  });
});
