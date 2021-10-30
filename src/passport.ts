import { IncomingMessage } from 'http'
import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest as GoogleStrategyOptionsWithRequest,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20'

import * as C from './constants'
import { prisma } from './context'

//#region Google OAuth
const googleOptions: GoogleStrategyOptionsWithRequest = {
  clientID: C.GOOGLE.CLIENT_ID,
  clientSecret: C.GOOGLE.CLIENT_SECRET,
  callbackURL: C.GOOGLE.CALLBACK_URL,
  passReqToCallback: true,
}

const googleCallback = async (
  req: IncomingMessage,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => {
  console.log('callback', profile)
  const matchingUser = await prisma.user.findFirst({
    where: { googleId: profile.id },
  })

  if (matchingUser) {
    done(null, {
      id: matchingUser.id,
      email: matchingUser.email,
    })
    return
  }

  const email = profile.emails && profile.emails[0] && profile.emails[0].value
  if (!email) {
    done(new Error('Email no available'))
    return
  }

  const newUser = await prisma.user.create({
    data: {
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      email: email,
      googleId: profile.id,
    },
  })

  done(null, {
    id: newUser.id,
    email: newUser.email,
  })
  return
}

passport.use(new GoogleStrategy(googleOptions, googleCallback))
//#endregion

passport.serializeUser((user, done) => {
  console.log('serialize', user)
  done(null, user.id)
})
passport.deserializeUser(async (id: string, done) => {
  console.log('deserialize', id)
  const user = await prisma.user.findUnique({
    where: { id: id },
  })

  if (!user) {
    done(new Error('User not available'))
  } else {
    done(null, { id: user.id, email: user.email })
  }
})
