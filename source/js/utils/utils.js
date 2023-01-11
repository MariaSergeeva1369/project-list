const breakpoint = window.matchMedia(`(min-width: 768px)`);
const isEscapeKey = (evt) => evt.key === 'Escape';

export {breakpoint, isEscapeKey}