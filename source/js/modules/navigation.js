import {FocusLock} from '../utils/focus-lock.js';
import {ScrollLock} from '../utils/scroll-lock.js';
import {breakpointTablet, isEscapeKey} from '../utils/utils';

const navMenu = document.querySelector('[data-setting-name="navigation"]');
const mainElement = document.querySelector('main');

const focusLock = new FocusLock();
const scrollLock = new ScrollLock();

const lockFocusScroll = () => {
  focusLock.lock('header');
  scrollLock.disableScrolling();
};

const unlockFocusScroll = () => {
  focusLock.unlock();
  scrollLock.enableScrolling();
};

const closeMenu = () => {
  navMenu.classList.remove('is-opened');
  navMenu.classList.add('is-closed');
  unlockFocusScroll();
  mainElement.removeEventListener('click', closeMenu);
  setLinkAttribute();
};

const closeMenulOnEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMenu();
    document.removeEventListener('keydown', closeMenulOnEscape);
  }
};

const setLinkAttribute = () => {
  const linkContainers = navMenu.querySelectorAll('a');
  if (!breakpointTablet.matches) {
    if (navMenu.classList.contains('is-closed')) {
      linkContainers.forEach((link) => link.setAttribute('tabIndex', -1));
    } else {
      linkContainers.forEach((link) => link.removeAttribute('tabIndex'));
    }
  } else {
    linkContainers.forEach((link) => link.removeAttribute('tabIndex'));
  }
};

const applySettings = () => {
  const textContainer = navMenu.querySelector('span');

  if (navMenu.classList.contains('is-opened')) {
    lockFocusScroll();
    document.addEventListener('keydown', closeMenulOnEscape);
    mainElement.addEventListener('click', closeMenu);
    textContainer.textContent = 'Закрыть меню';
  } else {
    unlockFocusScroll();
    document.removeEventListener('keydown', closeMenulOnEscape);
    mainElement.removeEventListener('click', closeMenu);
    textContainer.textContent = 'Открыть меню';
  }
};

const menuHandler = () => {
  if (!breakpointTablet.matches) {
    navMenu.classList.toggle('is-closed');
    navMenu.classList.toggle('is-opened');

    applySettings();
    setLinkAttribute();
  }
};

const navInit = () => {
  if (navMenu) {
    navMenu.addEventListener('click', menuHandler);
    setLinkAttribute();
  }
};

const navBreakpointChecker = () => {
  if (breakpointTablet.matches && navMenu.classList.contains('is-opened')) {
    closeMenu();
  }
  setLinkAttribute();
};

breakpointTablet.addEventListener('change', navBreakpointChecker);

export {navInit, navMenu};
