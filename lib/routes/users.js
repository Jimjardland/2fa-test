const userService = require('../services/users')

async function createUser ({ body: { username, password }}, res, next) {
  await userService.createUser(username, password)
  res.send({ message: 'Created user' })
}

module.exports = {
  createUser
}