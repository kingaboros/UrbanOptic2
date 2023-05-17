// horizontal scrolling
let scrollTimeout = null; // Variable to store the scroll timeout
const sections = document.querySelectorAll('section');

function scrollH(e) {
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

        if (sectionStart > currentScrollLeft) {
          targetSection = section;
          targetPosition = sectionStart;
          break;
        }
      }
    } else {
      // Scrolling to the left
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEnd = section.offsetLeft + section.offsetWidth;

        if (sectionEnd <= currentScrollLeft + mainContainer.clientWidth) {
          targetSection = section;
          targetPosition = sectionEnd - mainContainer.clientWidth;
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

            // Add activeSection class to the visible section
            sections.forEach((section) => {
              if (section === targetSection) {
                section.classList.add('activeSection');
              } else {
                section.classList.remove('activeSection');
              }
            });

            // Add active class to the menu links
            const menuLinks = document.querySelectorAll('.desktopMenu a');
            menuLinks.forEach((link) => {
              const linkTarget = link.getAttribute('href');
              if (linkTarget === `#${sectionID}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });

            // Check if scrolled to the promo section and call liftPromotions
            if (sectionID === 'promo') {
              liftPromotions('promo');
            }
          } else {
            requestAnimationFrame(animateScroll);
          }
        };

        animateScroll();
      }, scrollDelay);
    }

    mainContainer.classList.remove('mobileMainContainer');
  } else {
    const mainContainer = document.querySelector('.mainContainer');
    mainContainer.classList.add('mobileMainContainer');
    updateHash(mainContainer.scrollLeft);

    const hash = window.location.hash;
    if (hash === '#home') {
      history.replaceState(null, null, window.location.pathname);
    }
  }
}

// Add click event listener to menu links
const menuLinks = document.querySelectorAll('.desktopMenu a');
menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSectionID = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetSectionID);

    // Scroll to the target section
    if (targetSection) {
      const mainContainer = document.querySelector('.mainContainer');
      const targetPosition = targetSection.offsetLeft;

      clearTimeout(scrollTimeout);
      mainContainer.scrollLeft = targetPosition;

      // Update the section ID in the URL hash
      if (targetSectionID === 'home') {
        window.location.hash = '';
      } else {
        window.location.hash = targetSectionID;
      }

      // Add activeSection class to the visible section
      sections.forEach((section) => {
        if (section === targetSection) {
          section.classList.add('activeSection');
        } else {
          section.classList.remove('activeSection');
        }
      });

      // Add active class to the menu links
      menuLinks.forEach((menuLink) => {
        if (menuLink === link) {
          menuLink.classList.add('active');
        } else {
          menuLink.classList.remove('active');
        }
      });

      // Check if scrolled to the promo section and call liftPromotions
      if (targetSectionID === 'promo') {
        liftPromotions('promo');
      }
    }
  });
});

function updateHashVertical(scrollTop) {
  const sections = document.querySelectorAll('section');

  const currentSection = Array.from(sections).find((section) => {
    const sectionStart = section.offsetTop;
    const sectionEnd = sectionStart + section.offsetHeight;
    return scrollTop >= sectionStart && scrollTop < sectionEnd;
  });

  if (currentSection && currentSection.id) {
    const encodedId = encodeURIComponent(currentSection.id);
    history.replaceState(null, null, `#${encodedId}`);
    updateLogoAndMenu(currentSection.id);

    // Check if the current section is the "contact" section
    if (currentSection.id === 'contact') {
      changeButtonStyle(true);
      changeNavLinksStyle(true);
    } else {
      changeButtonStyle(false);
      changeNavLinksStyle(false);
      style;
    }
  }
}

function changeButtonStyle(yellowBtn) {
  const navBtn = document.getElementById('navBtn');

  if (yellowBtn) {
    navBtn.classList.add('yellowMenuBtn');
  } else {
    navBtn.classList.remove('yellowMenuBtn');
  }
}

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

function updateLogoAndMenu(sectionId) {
  const logo = document.querySelector('.logo');
  const menuLinks = document.querySelectorAll('.desktopMenu a');

  // Reset all menu links to their default state
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

const mainContainer = document.querySelector('.mainContainer');
if (mainContainer.addEventListener) {
  mainContainer.addEventListener('wheel', scrollH, false);
}

// changes text color in the navbar -> this works when the user clicks on a link from the menu

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
}

window.addEventListener('hashchange', function () {
  setNavbarTextColor('menu');
  setNavbarButtonStyle('menu');
  setNavbarLogo('menu');
});

// includes other html files

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute('w3-include-html');
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = 'Page not found.';
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute('w3-include-html');
          includeHTML();
        }
      };
      xhttp.open('GET', file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

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

// Lift Promotions
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

// Attach liftPromotions to the scroll event
window.addEventListener('scroll', function () {
  liftPromotions('promo');
});
