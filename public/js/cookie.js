function getCookie() {
  return Object.fromEntries(document.cookie
    .split(';')
    .map(field => field.trim().split('='))
  );
}

const cookie = getCookie();
let isAuth = Boolean(cookie.sessionId);
let login = cookie.userLogin;
