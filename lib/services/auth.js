const crypto = require('crypto')
const db = require('../adapters/db')
const dedent = require('dedent')
const moment = require('moment')
const { getUser, getUserSaltAndHash, hashPassword } = require('./users')

async function validateUser (username, inputPassword) {
  const [{ salt, password }] = await getUserSaltAndHash(username)
  if (!salt) throw new Error('User and password combination does not exist')

  const hashedInput = await hashPassword(inputPassword, salt)

  if (!password === hashedInput) throw new Error('User and password combination does not exist')

  return sendOneTimePassword(username)
}

async function sendOneTimePassword (username) {
  // not going to implement send email etc, just logging onetime-password and you can validate it
  const pw = generateOneTimePassword()
  console.log('Your onetime password is:', pw)
  await saveOneTimePassword(username, pw)

  return 'ok' // this is were u were supposed to ok you emailed it
}

async function validateOneTimePassword (username, input) {
  const [{ code }] = await db.manyOrNone('SELECT code FROM one_time_passwords where username = $1', username)
  await db.none('DELETE FROM one_time_passwords where username = $1', username)

  if (input !== code) throw new Error('wrong code')

  return 'ok'
}

function generateOneTimePassword () {
  //this is not supposed to be base64
  return crypto.randomBytes(12)
    .toString('base64')
}

async function saveOneTimePassword (username, pw) {
  return db.none(dedent(`
    INSERT INTO
      one_time_passwords (
        username
        ,code
        ,valid_until
      ) VALUES (
        $1
        ,$2
        ,$3
      )
  `), [username, pw, moment().add(5, 'minutes').toISOString()])
}

module.exports = {
  validateUser,
  validateOneTimePassword
}