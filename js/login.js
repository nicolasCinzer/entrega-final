import { buildAuctionsHandler } from './index.js';
import { setUser } from './logged.js';

const loginPage = document.getElementById('loginPage');
const homePage = document.getElementById('homePage');

const inputName = document.getElementById('accountName');
const inputPw = document.getElementById('accountPw');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

export default function loginEvents() {
  let alreadyLogged = false;

  errorMsg.innerHTML = '';
  const userLogged = localStorage.getItem('user');
  const pwLogged = localStorage.getItem('password');

  loginBtn.onclick = clickLoginBtn;

  inputName.value = userLogged;
  inputPw.value = pwLogged;

  if (userLogged && pwLogged) {
    alreadyLogged = true;
    clickLoginBtn();
    return alreadyLogged;
  }
}

const clickLoginBtn = () => {
  if (validateLogin()) {
    const userLogged = localStorage.getItem('user');

    if (inputName.value !== userLogged) {
      localStorage.removeItem('currentsAuctions');
      localStorage.setItem('user', inputName.value);
    }

    localStorage.setItem('password', inputPw.value);

    loginPage.style.display = 'none';
    homePage.style.display = 'block';

    buildAuctionsHandler();
    setUser();
  }
};

const validateLogin = () => {
  let valid = true;

  if (!inputName.value) {
    valid = false;
    errorMsg.innerHTML = 'Debe ingresar un usuario!';
  }

  if (!inputPw.value) {
    valid = false;
    errorMsg.innerHTML = 'Debe ingresar una contraseña!';
  }

  return valid;
};
