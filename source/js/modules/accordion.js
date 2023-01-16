import {breakpointDesk} from '../utils/utils';

const skillsContainers = document.querySelectorAll('[data-setting-name="skills"]');

const skillsClickHandler = (evt) => {
  const skillsContainer = evt.target.closest('div');
  skillsContainer.classList.toggle('is-closed');
  skillsContainer.classList.toggle('is-opened');

  const button = skillsContainer.querySelector('button');
  const buttonTextContainer = button.querySelector('span');

  if (skillsContainer.classList.contains('is-closed')) {
    buttonTextContainer.textContent = 'Открыть';
  } else {
    buttonTextContainer.textContent = 'Закрыть';
  }
};

const accordionInit = () => {
  if (!breakpointDesk.matches && skillsContainers && skillsContainers.length > 0) {

    skillsContainers.forEach((skillContainer) => skillContainer.addEventListener('click', skillsClickHandler));
  }
};

const accordionBreakpointChecker = () => {
  if (!breakpointDesk.matches) {
    accordionInit();
  } else {
    skillsContainers.forEach((skillContainer) => skillContainer.removeEventListener('click', skillsClickHandler));
  }
};

breakpointDesk.addEventListener('change', accordionBreakpointChecker);

export {skillsContainers, accordionBreakpointChecker, accordionInit};
