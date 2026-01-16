const themeBtn = document.querySelector('.header__theme');
const body = document.body;
const logo = document.querySelector('.header__logo');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    logo.src = './assets/images/logo-dark-theme.svg';
  } else {
    logo.src = './assets/images/logo-light-theme.svg';
  }
});