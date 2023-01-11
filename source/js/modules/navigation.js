import {FocusLock} from '../utils/focus-lock.js';
import {ScrollLock} from '../utils/scroll-lock.js';
import {breakpoint, isEscapeKey} from '../utils/utils'

const navMenu = document.querySelector('[data-setting-target="navigation"]');
const mainElement = document.querySelector('main');

const focusLock = new FocusLock();
const scrollLock = new ScrollLock();

const navRemoveNojs = () => {
  navMenu.classList.remove('is-nojs');
};

const lockFocusScroll = () => {
  focusLock.lock('header');
  scrollLock.disableScrolling();
}

const unlockFocusScroll = () => {
  focusLock.unlock();
  scrollLock.enableScrolling();
}

const closeMenu = () => {
  navMenu.classList.remove('is-opened');
  navMenu.classList.add('is-closed');
  unlockFocusScroll();
  mainElement.removeEventListener('click', closeMenu);
}

const closeMenulOnEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMenu();
    document.removeEventListener('keydown', closeMenulOnEscape);
  }
}

const applySettings = () => {
  if (navMenu.classList.contains('is-opened')) {
    lockFocusScroll();
    document.addEventListener('keydown', closeMenulOnEscape);
    mainElement.addEventListener('click', closeMenu);
  } else {
    unlockFocusScroll();
    document.removeEventListener('keydown', closeMenulOnEscape);
    mainElement.removeEventListener('click', closeMenu);
  }
}

const menuHandler = () => {
  if (!breakpoint.matches) {
    const textContainer = navMenu.querySelector('span');
    navMenu.classList.toggle('is-closed');
    navMenu.classList.toggle('is-opened');

    if (navMenu.classList.contains('is-opened')) {
      textContainer.textContent = 'Закрыть меню';
    } else {
      textContainer.textContent = 'Открыть меню';
    }

    applySettings();
  }
}

const navInit = () => {
  if (navMenu) {
    navMenu.addEventListener('click', menuHandler);
  }
}

const navBreakpointChecker = () => {
  if (breakpoint.matches && navMenu.classList.contains('is-opened')) {
    closeMenu();
  } 
}

breakpoint.addEventListener('change', navBreakpointChecker);

export {navRemoveNojs, navInit};
