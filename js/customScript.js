// horizontal scrolling

let scrollInterval = null; // Variable to store the scroll interval

function scrollH(e) {
  if (window.innerWidth >= 1000) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    const mainContainer = document.querySelector('.mainContainer');
    const sections = document.querySelectorAll('section');
    const currentScrollLeft = mainContainer.scrollLeft;

    clearInterval(scrollInterval); // Clear any existing scroll interval

    // Calculate the target position based on the current scroll position and delta
    const targetSection = Array.from(sections).find((section) => {
      const sectionStart = section.offsetLeft;
      const sectionEnd = sectionStart + section.offsetWidth;
      return delta > 0
        ? sectionStart > currentScrollLeft
        : sectionEnd < currentScrollLeft;
    });

    if (targetSection) {
      const targetPosition =
        delta > 0
          ? targetSection.offsetLeft
          : targetSection.offsetLeft +
            targetSection.offsetWidth -
            mainContainer.clientWidth;

      // Start the scroll interval
      scrollInterval = setInterval(() => {
        const distance = targetPosition - mainContainer.scrollLeft;
        const scrollStep =
          delta > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);

        mainContainer.scrollLeft += scrollStep;

        // Stop the scroll interval when reaching the target position
        if (
          (delta > 0 && mainContainer.scrollLeft >= targetPosition) ||
          (delta < 0 && mainContainer.scrollLeft <= targetPosition)
        ) {
          clearInterval(scrollInterval);

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
        }
      }, 10); // Adjust the scroll interval speed as needed (in milliseconds)
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

//////////////////////////////

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

///// promotions curtain effect

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

// Attach scrollH to the wheel event
window.addEventListener('wheel', function (e) {
  scrollH(e);
  liftPromotions('promo');
});
