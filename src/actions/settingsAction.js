import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from './Types';

export const setDisableBalanceOnAdd = () => {
  //get settings from ls
  const settings = JSON.parse(localStorage.getItem('settings'));

  //toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //set back to ls
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  }
}

export const setDisableBalanceOnEdit = () => {
  //get settings from ls
  const settings = JSON.parse(localStorage.getItem('settings'));

  //toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //set back to ls
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  }
}

export const setAllowRegistration = () => {
  //get settings from ls
  const settings = JSON.parse(localStorage.getItem('settings'));

  //toggle
  settings.allowRegistration = !settings.allowRegistration;

  //set back to ls
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  }
} 