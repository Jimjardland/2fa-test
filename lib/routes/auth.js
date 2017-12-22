const authService = require('../services/auth')

async function auth ({ body: { username, password }}, res, next) {
  await authService.validateUser(username, password)
  res.send({ message: 'onetime password sent' })
}

async function validateOneTimePassword ({ body: { username, password }}, res, next) {
  await authService.validateOneTimePassword(username, password)
  res.send({ message: 'This is were i was supposed to send token, but not implemented' })
}


module.exports = {
  auth,
  validateOneTimePassword
}
