const themeBtn = document.querySelector('.header__theme');
const body = document.body;
const logo = document.querySelector('.header__logo');
const textArea = document.querySelector('.form__words');
const characterCount = document.querySelector('.counter__info--total p');
const wordsCount = document.querySelector('.counter__info--words p');
const senttencesCount = document.querySelector('.counter__info--sentences p');
const excludeBtn = document.querySelector('.form__checkbox--exclude');
const limitBtn = document.querySelector('.form__checkbox--limit');
const characterLimitInput = document.querySelector('.form__limit');
const errorMsgLimit = document.querySelector('.form__words--limit');

const densityMore = document.querySelector('.density__more');
const densityEmpty = document.querySelector('.density__empty');
const densityList = document.querySelector('.density__list');

const handleEmptyWarning = (charCounter) => densityEmpty.style.display = charCounter === 0 ? 'block' : 'none';
const handleShowMoreBtn = (uniqCharCounter) => densityMore.style.display = uniqCharCounter > 5 ? 'flex' : 'none';

function handleLetterDensity(charCounter) {
    densityList.textContent = '';
    
    handleEmptyWarning(charCounter);
    
    const textLower = textArea.value.toLowerCase().split('').filter(char => /[a-z]/.test(char));

    const letterFrequency = {};
    textLower.forEach(letter => {
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
    });

    handleShowMoreBtn(Object.keys(letterFrequency).length);
}

function handleChangeTheme() {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    logo.src = './assets/images/logo-dark-theme.svg';
  } else {
    logo.src = './assets/images/logo-light-theme.svg';
  }
}

function handleExceedCharqLimit(charCounter) {
    const formErrorMsg = document.querySelector('.form__words--msg');
    const isPressed = limitBtn.getAttribute('aria-pressed') === 'true';
    const charLimit = parseInt(characterLimitInput.value, 10) || 0;

    errorMsgLimit.textContent = charLimit;

    if(isPressed && charLimit > 0 && charCounter > charLimit) {
        formErrorMsg.style.display = 'flex';
    } else {
        formErrorMsg.style.display = 'none';
    }
}

function updateCounters() {
    const charCounter = excludeBtn.getAttribute('aria-pressed') === 'true' ? textArea.value.replace(/\s/g, '').length : textArea.value.length;
    
    characterCount.textContent = charCounter;
    wordsCount.textContent = textArea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    senttencesCount.textContent = textArea.value.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

    handleExceedCharqLimit(charCounter)
    handleLetterDensity(charCounter);
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

function handleExcludeSpaces() {
    const subTitleCounter = document.querySelector('.counter__info--subtitle');
    const isPressed = excludeBtn.getAttribute('aria-pressed') === 'true';

    excludeBtn.setAttribute('aria-pressed', String(!isPressed));
    excludeBtn.classList.toggle('form__checkbox--active');

    subTitleCounter.style.display = isPressed ? 'none' : 'inline';
}

function handleCharacterLimit() {
    const isPressed = limitBtn.getAttribute('aria-pressed') === 'true';

    limitBtn.setAttribute('aria-pressed', String(!isPressed));
    limitBtn.classList.toggle('form__checkbox--active');
    characterLimitInput.style.display = isPressed ? 'none' : 'block';

    if (isPressed) {
        characterLimitInput.value = '0';
    }
}

textArea.addEventListener('input', () => {
    updateCounters();
    updateReadingTime();
})

excludeBtn.addEventListener('click', () => {
    handleExcludeSpaces();
    updateCounters(true);
});

limitBtn.addEventListener('click', () => {
    handleCharacterLimit();
});

characterLimitInput.addEventListener('input', () => {
    updateCounters();
});

themeBtn.addEventListener('click', () => {
    handleChangeTheme();
});