let scrollTimeout = null; // Variable to store the scroll timeout
const sections = document.querySelectorAll('section');

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
      delta = 1; // Set delta to 1 when scrolling to the right
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionStart = section.offsetLeft;
        const sectionEnd = section.offsetLeft + section.offsetWidth;

        if (sectionStart >= currentScrollLeft + mainContainer.clientWidth) {
          targetSection = section;
          targetPosition = sectionEnd - mainContainer.clientWidth;
          break;
        }
      }
    } else {
      // Scrolling to the left
      delta = -1; // Set delta to -1 when scrolling to the left
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionStart = section.offsetLeft;

        if (sectionStart < currentScrollLeft) {
          targetSection = section;
          targetPosition = sectionStart - mainContainer.clientWidth;
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
                section.classList.remove('inactiveSection');
                section.classList.add('activeSection');
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
  }
}

function scrollVertical(e) {
  if (window.innerWidth < 992) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    const mainContainer = document.querySelector('.mainContainer');
    const currentScrollTop = mainContainer.scrollTop;

    clearTimeout(scrollTimeout); // Clear any existing scroll timeout

    let targetSection = null;
    let targetPosition = null;

    if (delta > 0) {
      // Scrolling up
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionStart = section.offsetTop;

        if (sectionStart > currentScrollTop) {
          targetSection = section;
          targetPosition = sectionStart;
          break;
        }
      }
    } else {
      // Scrolling down
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEnd = section.offsetTop + section.offsetHeight;

        if (sectionEnd <= currentScrollTop + mainContainer.clientHeight) {
          targetSection = section;
          targetPosition = sectionEnd - mainContainer.clientHeight;
          break;
        }
      }
    }

    if (targetSection) {
      const scrollDelay = 100; // Adjust the scroll delay as needed

      scrollTimeout = setTimeout(() => {
        const animateScroll = () => {
          const distance = targetPosition - mainContainer.scrollTop;
          const scrollStep =
            delta > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);

          mainContainer.scrollTop += scrollStep;

          // Stop the scroll animation when reaching the target position
          if (
            (delta > 0 && mainContainer.scrollTop >= targetPosition) ||
            (delta < 0 && mainContainer.scrollTop <= targetPosition)
          ) {
            clearTimeout(scrollTimeout);

            // Update the section ID in the URL hash
            const sectionID = targetSection.getAttribute('id');
            if (sectionID) {
              updateHash(sectionID);

              // Reset the hash if the target section has an ID of "home"
              if (sectionID === 'home') {
                updateHash('');
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

    mainContainer.classList.add('mobileMainContainer');
  }

  let prevScrollPos = window.pageYOffset;
  let menu = document.getElementById('menu');
  let menuLinks = menu.getElementsByTagName('a');

  if (window.innerWidth >= 992) {
    if (prevScrollPos > currentScrollPos) {
      // User is scrolling up, show the menu
      menu.style.top = '0';
    } else {
      // User is scrolling down, hide the menu
      menu.style.top = '-130px'; // Adjust this value based on your menu height
    }
  } else {
    // For screen sizes less than 992px, always show the menu
    menu.style.top = '0';
  }

  prevScrollPos = currentScrollPos;

  // Prevent default behavior for menu links
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function (event) {
      event.preventDefault();
    });
  }
}

// function scrollVertical(e) {
//   if (window.innerWidth < 992) {
//     e = window.event || e;
//     let delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
//     const mainContainer = document.querySelector('.mainContainer');
//     const currentScrollTop = mainContainer.scrollTop;

//     clearTimeout(scrollTimeout); // Clear any existing scroll timeout

//     let targetSection = null;
//     let targetPosition = null;

//     if (delta > 0) {
//       // Scrolling up
//       for (let i = 0; i < sections.length; i++) {
//         const section = sections[i];
//         const sectionStart = section.offsetTop;

//         if (sectionStart > currentScrollTop) {
//           targetSection = section;
//           targetPosition = sectionStart;
//           break;
//         }
//       }
//     } else {
//       // Scrolling down
//       for (let i = sections.length - 1; i >= 0; i--) {
//         const section = sections[i];
//         const sectionEnd = section.offsetTop + section.offsetHeight;

//         if (sectionEnd <= currentScrollTop + mainContainer.clientHeight) {
//           targetSection = section;
//           targetPosition = sectionEnd - mainContainer.clientHeight;
//           break;
//         }
//       }
//     }

//     if (targetSection) {
//       const scrollDelay = 100; // Adjust the scroll delay as needed

//       scrollTimeout = setTimeout(() => {
//         const animateScroll = () => {
//           const distance = targetPosition - mainContainer.scrollTop;
//           const scrollStep =
//             delta > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);

//           mainContainer.scrollTop += scrollStep;

//           // Stop the scroll animation when reaching the target position
//           if (
//             (delta > 0 && mainContainer.scrollTop >= targetPosition) ||
//             (delta < 0 && mainContainer.scrollTop <= targetPosition)
//           ) {
//             clearTimeout(scrollTimeout);

//             // Update the section ID in the URL hash
//             const sectionID = targetSection.getAttribute('id');
//             if (sectionID) {
//               updateHash(sectionID);

//               // Reset the hash if the target section has an ID of "home"
//               if (sectionID === 'home') {
//                 updateHash('');
//               }
//             }

//             // Add activeSection class to the visible section
//             sections.forEach((section) => {
//               if (section === targetSection) {
//                 section.classList.add('activeSection');
//               } else {
//                 section.classList.remove('activeSection');
//               }
//             });

//             // Add active class to the menu links
//             const menuLinks = document.querySelectorAll('.desktopMenu a');
//             menuLinks.forEach((link) => {
//               const linkTarget = link.getAttribute('href');
//               if (linkTarget === `#${sectionID}`) {
//                 link.classList.add('active');
//               } else {
//                 link.classList.remove('active');
//               }
//             });

//             // Check if scrolled to the promo section and call liftPromotions
//             if (sectionID === 'promo') {
//               liftPromotions('');
//             }
//           } else {
//             requestAnimationFrame(animateScroll);
//           }
//         };

//         animateScroll();
//       }, scrollDelay);
//     }

//     mainContainer.classList.add('mobileMainContainer');
//   }
// }

function updateHash(sectionID) {
  if (sectionID) {
    const currentHash = window.location.hash;
    if (currentHash !== `#${sectionID}`) {
      history.replaceState(null, null, `#${sectionID}`);
    }
  } else {
    history.replaceState(null, null, window.location.pathname);
  }
}

// Attach the scroll event listener to the window
const mainContainer = document.querySelector('.mainContainer');
if (mainContainer.addEventListener) {
  if (window.innerWidth >= 992) {
    mainContainer.addEventListener('wheel', scrollHorizontal, false);
  } else {
    mainContainer.addEventListener('wheel', scrollVertical, false);
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
  let scrollTimeout = null; // Variable to store the scroll timeout
  const sections = document.querySelectorAll('section');

  function scrollHorizontal(e) {
    if (window.innerWidth >= 992) {
      e = window.event || e;
      const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
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
                  section.classList.remove('inactiveSection');
                  section.classList.add('activeSection');
                } else {
                  section.classList.remove('activeSection');
                  section.classList.add('inactiveSection');
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
    }
  }
});

// hamburger menu

document.addEventListener('DOMContentLoaded', function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-collapse');
  const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const menuIcon = document.querySelector('#closeMenu');

  navbarToggler.addEventListener('click', function () {
    navbarMenu.classList.toggle('show');
    navbarMenu.classList.toggle('mobileMenu');
  });

  menuIcon.addEventListener('click', function () {
    navbarMenu.classList.remove('show');
    navbarMenu.classList.remove('mobileMenu');
  });

  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navbarMenu.classList.remove('show');
      navbarMenu.classList.remove('mobileMenu');
    });
  });
});

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

// accordion

// Get all the accordion items
const accordionItems = document.querySelectorAll('.accordionItem');

// Add click event listeners to each item
accordionItems.forEach((item) => {
  const readMoreLink = item.querySelector('.accordionLink');
  const content = item.querySelector('.accordionContent');

  // Toggle the visibility of content when the heading is clicked
  readMoreLink.addEventListener('click', () => {
    content.classList.toggle('showAccordion');
  });
});

// services btn redirect
let servicesBtns = document.getElementsByClassName('servicesBtn');

Array.from(servicesBtns).forEach(function (button) {
  button.addEventListener('click', function () {
    var url = document.createElement('a');
    url.href = 'services.html';
    url.click();
  });
});

// contact button
let contactBtn = document.getElementById('contactBtn');

contactBtn.addEventListener('click', function () {
  let phoneNo = document.createElement('a');
  phoneNo.href = 'tel:+40755254658';
  phoneNo.click();
});

let heroContactBtn = document.getElementById('heroContactBtn');

heroContactBtn.addEventListener('click', function () {
  let phoneNo = document.createElement('a');
  phoneNo.href = 'tel:+40755254658';
  phoneNo.click();
});

// dynamic year in the footer area
let currentYear = new Date().getFullYear();
let copyrightText = document.getElementById('currentYear');
copyrightText.textContent = 'Copyright © ' + currentYear + ' | Urban Optic';

// hide navbar when the user scrolls down
// let prevScrollPos = window.pageYOffset;
// let menu = document.getElementById('menu');

// window.onscroll = function () {
//   let currentScrollPos = window.pageYOffset;
//   let windowWidth = window.innerWidth;

//   if (windowWidth >= 992) {
//     if (prevScrollPos > currentScrollPos) {
//       // User is scrolling up, show the menu
//       menu.style.top = '0';
//     } else {
//       // User is scrolling down, hide the menu
//       menu.style.top = '-130px'; // Adjust this value based on your menu height
//     }
//   } else {
//     // For screen sizes less than 992px, always show the menu
//     menu.style.top = '0';
//   }

//   prevScrollPos = currentScrollPos;
// };

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

// Check if the URL contains a hash key
if (window.location.hash) {
  // Clear the hash key
  history.replaceState(
    null,
    document.title,
    window.location.pathname + window.location.search
  );
}
