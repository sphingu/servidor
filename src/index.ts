import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { v4 as uuid } from 'uuid'

import { createServer } from './server'
import * as C from './constants'
import './passport'

const start = async () => {
  const app = express()

  app.use(
    session({
      genid: () => uuid(),
      secret: C.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // app.use(function (req, res, next) {
  //   console.log('middleware', req.url, req.method, req.user)
  //   next()
  // })
  // app.use(
  //   morgan('common', {
  //     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
  //       flags: 'a',
  //     }),
  //   }),
  // )

  app.get('/', function (req, res) {
    res.json(req.user)
  })
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
  )
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/',
    }),
  )

  const server = await createServer()

  server.applyMiddleware({ app })

  app.listen(C.PORT, () => {
    console.log(`🚀 Server ready at ${C.BASE_URL}`)
  })
}

start()
