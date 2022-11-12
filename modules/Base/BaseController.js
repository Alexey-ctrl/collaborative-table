const {cookieExpireDays} = require('../../config');

class BaseController {
  async parseBody(req) {
    return new Promise(resolve => {
      let body = '';
      req.on('data', data => body += data);
      req.on('end', () => {
        if (!body) return resolve({});
        resolve(JSON.parse(body))
      });
    });
  }

  parseCookie(req) {
    const {cookie} = req.headers;
    if (!cookie) return {};
    return Object.fromEntries(cookie
      .split(';')
      .map(field => field.trim().split('='))
    );
  }

  generateCookie(cookies) {
    const cookieExpireDate = new Date();
    cookieExpireDate.setDate(cookieExpireDate.getDate() + cookieExpireDays);

    const cookiesList = [];
    for (const [name, value] of Object.entries(cookies)) {
      let cookieString = `${name}=${value}; Expires=${cookieExpireDate.toUTCString()}`;
      cookiesList.push(cookieString);
    }
    return cookiesList;
  }

  clearCookie(cookies) {
    const now = new Date();
    const cookiesList = [];
    for (const name of Object.keys(cookies)) {
      cookiesList.push(`${name}=delete; Expires=${now.toUTCString()}`);
    }
    return cookiesList;
  }
}

module.exports = BaseController;
