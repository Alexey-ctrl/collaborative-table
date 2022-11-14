const loginInput = document.querySelector('#login-input');
const passwordInput = document.querySelector('#password-input');
const passwordRepeatInput = document.querySelector('#password-repeat-input');
const singInBtn = document.querySelector('#sing-up-btn');
const errorLabel = document.querySelector('#error-message');

const error = {
  EmptyLogin: 'Заполните логин',
  EmptyPassword: 'Заполните пароль',
  NotMatchPassword: 'Пароли не совпадают',
  InvalidLogin: 'Используйте латинские буквы, цифры и _'
}

singInBtn.addEventListener('click', async () => {
  const login = loginInput.value.trim();
  if (!login) return errorLabel.textContent = error.EmptyLogin;
  if (!/^\w+$/.test(login)) return errorLabel.textContent = error.InvalidLogin;

  const password = passwordInput.value.trim();
  if (!password) return errorLabel.textContent = error.EmptyPassword;

  const passwordRepeat = passwordRepeatInput.value.trim();
  if (password !== passwordRepeat) return errorLabel.textContent = error.NotMatchPassword;

  errorLabel.textContent = '';
  const singUpResult = await userSingUp(login, password);
  if (singUpResult.error) return errorLabel.textContent = singUpResult.message;

  window.location.href = '/';
});
