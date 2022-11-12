const loginInput = document.querySelector('#login-input');
const passwordInput = document.querySelector('#password-input');
const loginBtn = document.querySelector('#login-btn');
const errorLabel = document.querySelector('#error-message');

const error = {
  EmptyLogin: 'Заполните логин',
  EmptyPassword: 'Заполните пароль',
  InvalidLogin: 'Используйте латинские буквы, цифры и _'
}

loginBtn.addEventListener('click', async () => {
  const login = loginInput.value.trim();
  if (!login) return errorLabel.textContent = error.EmptyLogin;
  if (!/^\w+$/.test(login)) return errorLabel.textContent = error.InvalidLogin;

  const password = passwordInput.value.trim();
  if (!password) return errorLabel.textContent = error.EmptyPassword;

  errorLabel.textContent = '';
  const loginResult = await userLogin(login, password);
  if (loginResult.error) return errorLabel.textContent = loginResult.message;

  window.location.href = '/';
})
