class HttpException {
  constructor(status, error, message) {
    this.status = status;
    this.error = error;
    this.message = message;
  }

  toString() {
    return JSON.stringify({
      status: this.status,
      error: this.error,
      message: this.message,
    });
  }
}

module.exports = {
  HttpException,
  InternalError: new HttpException(500, 'InternalError', 'Сервер обнаружил внутреннюю ошибку. Повторите запрос.'),
  ResourceNotFound: new HttpException(404, 'ResourceNotFound', 'Указанный ресурс не существует.'),
  MissingRequiredParameter: new HttpException(400, 'MissingRequiredParameter', 'Обязательный параметр запроса не был указан для этого запроса.'),
  UserAlreadyExists: new HttpException(409, 'ResourceAlreadyExists', 'Пользователь с таким логином уже существует.'),
  AuthenticationFailed: new HttpException(403, 'AuthenticationFailed', 'Неверный логин или пароль'),
  NoAuthenticationInformation: new HttpException(401, 'NoAuthenticationInformation', 'Не авторизовано')
}
