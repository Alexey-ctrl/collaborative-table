async function userSingUp(login, password) {
  return _request('/sing-up', 'POST', {login, password});
}

async function userLogin(login, password) {
  return _request('/login', 'POST', {login, password});
}

async function userLogout() {
  return _request('/logout', 'POST');
}

async function getTable() {
  return _request('/table', 'GET');
}

async function _request(url, method, data) {
  const options = {
    method,
    headers: {'Content-type': 'application/json'}
  }

  if (data) options.body = JSON.stringify(data);
  const result = await fetch(url, options);
  return result.json();
}
