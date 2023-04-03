const userLogged = document.getElementById('userLogged');
const listOfAuctions = document.getElementById('listOfAuctions');

export const setUser = () => {
  let user = localStorage.getItem('user');
  console.log(`Logged as '${user}'`);

  userLogged.innerHTML = user;
};

export const logout = () => {
  homePage.style.display = 'none';
  loginPage.style.display = 'flex';
};
