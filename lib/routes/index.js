const { auth, validateOneTimePassword } = require('./auth')
const { createUser } = require('./users')

function indexHandler ({ method }, res, next) {
  if(method !== 'GET') res.send(303)

  res.send({
    data: {
      message: '2FA test'
    }
  })
  return next()
}

exports.add = app => {
  // standard stuff
  app.del('/', indexHandler)
  app.get('/', indexHandler)
  app.patch('/', indexHandler)
  app.post('/', indexHandler)
  app.put('/', indexHandler)

  // auth
  app.post('/auth', auth)
  app.post('/validate-password', validateOneTimePassword)
  app.post('/create-user', createUser)
}