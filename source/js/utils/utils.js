const breakpointTablet = window.matchMedia('(min-width: 768px)');
const breakpointDesk = window.matchMedia('(min-width: 1024px)');
const isEscapeKey = (evt) => evt.key === 'Escape';

const noJsElements = document.querySelectorAll('.is-nojs');

const removeNojsClass = (elements) => {
  if (noJsElements && noJsElements.length) {
    elements.forEach((element) => element.classList.remove('is-nojs'));
  }
};

removeNojsClass(noJsElements);

export {breakpointTablet, breakpointDesk, isEscapeKey, removeNojsClass};
