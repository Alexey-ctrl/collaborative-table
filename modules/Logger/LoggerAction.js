module.exports = {
  login: user => ({action: 'logined', user_id: user.id, message: `${user.login} - Авторизовался`}),
  singUp: user => ({action: 'registered', user_id: user.id, message: `${user.login} - Зарегистрировался`}),
  logout: user => ({action: 'logouted', user_id: user.id, message: `${user.login} - Вышел`}),
  startEdit: (user, {row, column}) => ({
    action: 'started_edit',
    user_id: user.id,
    message: `${user.login} - Начал ввод в [${row}; ${column}]`
  }),
  endEdit: (user, {row, column, value}) => ({
    action: 'finished_edit',
    user_id: user.id,
    message: `${user.login} - Закончил ввод в [${row}; ${column}]: ${value}`
  })
}
