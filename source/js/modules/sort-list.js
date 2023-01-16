import {breakpoint} from '../utils/utils';

const buttonContainer = document.querySelector('[data-setting-name="buttons-container"]');
const settingButtons = document.querySelectorAll('[data-setting-name="viewCard"]');

const DEFAULT_CARD_VIEW = 'is-tile';

const getDefaultButtonsParams = () => {
  const button = Array.from(settingButtons).find((item) => item.dataset['settingValue'] === DEFAULT_CARD_VIEW);
  const buttonsParams = {};
  const {settingName, settingValue} = button.dataset;
  buttonsParams[settingName] = settingValue;

  return buttonsParams;
};

const setActiveButton = (params) => {
  for (const value of Object.values(params)) {
    const activeButton = Array.from(settingButtons).find((button) => button.classList.contains('active'));
    activeButton.classList.remove('active');

    const setButton = Array.from(settingButtons).find((button) => button.dataset['settingValue'] === value);
    setButton.classList.add('active');
  }
};

const setClass = ({settingTarget}, params) => {
  const targetElement = document.querySelector(settingTarget);

  for (const value of Object.values(params)) {
    const buttonElements = Array.from(settingButtons);
    buttonElements.forEach((item) => targetElement.classList.remove(item.dataset.settingValue));

    if (breakpoint.matches) {
      targetElement.classList.add(value);
      setActiveButton(params);
    } else {
      setActiveButton(params);
    }
  }
};

const settingButtonClickHandler = (evt, setting) => {
  const button = evt.target.closest('button');

  if (!button) {
    return;
  }

  const params = {};
  const {settingName, settingValue} = button.dataset;
  params[settingName] = settingValue;

  setClass(setting, params);
};

const sortListInit = () => {
  const setting = buttonContainer.dataset;

  buttonContainer.addEventListener('click', (evt) => {
    settingButtonClickHandler(evt, setting);
  });
};

const sortListBreakpointChecker = () => {
  if (buttonContainer) {
    const setting = buttonContainer.dataset;

    if (!breakpoint.matches) {
      setClass(setting, getDefaultButtonsParams());
    }
  }
};

breakpoint.addEventListener('change', sortListBreakpointChecker);

export {sortListInit, buttonContainer};
