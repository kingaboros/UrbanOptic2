/////////// hide and show menu when scrolling
let prevScrollPos = window.pageYOffset;
let menu = document.getElementById('menu');

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    menu.style.top = '0';
  } else {
    menu.style.top = '-130px';

    prevScrollPos = currentScrollPos;
  }
};

// dynamic year in the footer area
let currentYear = new Date().getFullYear();
let copyrightText = document.getElementById('currentYear');
copyrightText.textContent = 'Copyright © ' + currentYear + ' | Urban Optic';
