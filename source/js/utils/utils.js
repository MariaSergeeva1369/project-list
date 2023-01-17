const breakpointTablet = window.matchMedia('(min-width: 768px)');
const breakpointDesk = window.matchMedia('(min-width: 1024px)');
const isEscapeKey = (evt) => evt.key === 'Escape';

const removeNojsClass = (elements) => {
  if (elements && elements.length) {
    elements.forEach((element) => element.classList.remove('is-nojs'));
  } else if (elements && !elements.length) {
    elements.classList.remove('is-nojs');
  }
};

export {breakpointTablet, breakpointDesk, isEscapeKey, removeNojsClass};
