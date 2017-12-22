const db = require('../adapters/db')
const crypto = require('crypto')
const dedent = require('dedent')

async function getUser (username) {
  return db.manyOrNone('SELECT * FROM users where lower(username) = lower($1)', [username])
}

async function getUserSaltAndHash (username, password) {
  return db.manyOrNone('SELECT salt, password FROM users where lower(username) = lower($1)', [username.trim()])
}

async function createUser (username, password) {
  const exists = await getUser(username)
  if(exists.length) throw new Error('user already exists')

  const salt = await createSalt()
  const hashedPassword = await hashPassword(password, salt)

  return db.none(dedent(`
    INSERT INTO
      users(
        username
        ,password
        ,salt
      ) VALUES (
        lower($1)
        ,$2
        ,$3
      )
  `), [username, hashedPassword, salt])
}
async function createSalt () {
  return crypto.randomBytes(12)
    .toString('base64')
}

async function hashPassword (password, salt) {
  return crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 1000, 60, 'sha1')
    .toString('base64')
}

module.exports = {
  getUser,
  createUser,
  getUserSaltAndHash,
  createSalt,
  hashPassword
}
