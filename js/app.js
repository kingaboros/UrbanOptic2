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
////////////////////////////////////////////////////////////////

// accordion
const accordionItems = document.querySelectorAll('.accordionItem');
accordionItems.forEach((item) => {
  const readMoreLink = item.querySelector('.accordionLink');
  const content = item.querySelector('.accordionContent');

  readMoreLink.addEventListener('click', () => {
    content.classList.toggle('showAccordion');
  });
});
/////////////////////////////////////////////////////////////////////////////////

// services btn redirect
let servicesBtns = document.getElementsByClassName('servicesBtn');
Array.from(servicesBtns).forEach(function (button) {
  button.addEventListener('click', function () {
    var url = document.createElement('a');
    url.href = 'services.html';
    url.click();
  });
});
///////////////////////////////////////////////////////////////////////////////

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

// remove yellowBg for mobile and tablet
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

// remove blackBg for mobile and tablet
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
