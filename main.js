const themeBtn = document.querySelector('.header__theme');
const body = document.body;
const logo = document.querySelector('.header__logo');
const textArea = document.querySelector('.form__words');
const characterCount = document.querySelector('.counter__info--total p');
const wordsCount = document.querySelector('.counter__info--words p');
const senttencesCount = document.querySelector('.counter__info--sentences p');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    logo.src = './assets/images/logo-dark-theme.svg';
  } else {
    logo.src = './assets/images/logo-light-theme.svg';
  }
});

function updateCounters() {
    characterCount.textContent = textArea.value.length;
    wordsCount.textContent = textArea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    senttencesCount.textContent = textArea.value.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}

function updateReadingTime() {
    const words = textArea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = words / 200;
    
    let displayTime;
    if (readingTime > 0 && readingTime < 1) {
        displayTime = "<1";
    } else {
        displayTime = Math.ceil(readingTime);
    }
    
    document.querySelector('.form__reading--minute').textContent = displayTime;
}

textArea.addEventListener('input', () => {
    updateCounters();
    updateReadingTime();
})