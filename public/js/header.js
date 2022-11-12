const unauthHeader = document.querySelector('#unauth-header');
const authHeader = document.querySelector('#auth-header');
const logoutBtn = document.querySelector('#logout-btn');
const loginLabel = document.querySelector('#login-label');

setHeaderData();

function setHeaderData() {
  if (isAuth) {
    loginLabel.textContent = login;
    unauthHeader.style.display = 'none';
    authHeader.style.display = 'flex';
  } else {
    unauthHeader.style.display = 'flex';
    authHeader.style.display = 'none';
  }
}

logoutBtn.addEventListener('click', logout);

async function logout() {
  await userLogout();
  isAuth = false;
  setHeaderData();
  disableTable();
}
