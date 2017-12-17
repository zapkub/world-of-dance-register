import * as express from 'express'
const session = require('express-session')
const FacebookStrategy = require('passport-facebook')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

const facebookLoginStrategy = (exports.facebookLoginStrategy = (
  context: APIContext
) => {
  const fbStrategy = new FacebookStrategy(
    {
      clientID: context.config.facebook.id,
      clientSecret: context.config.facebook.secret,
      callbackURL: context.config.facebook.callbackUrl,
      profileFields: ['id', 'displayName', 'birthday', 'email', 'link', 'first_name', 'gender', 'last_name']
    },
    async function (accessToken, refreshToken, _, fbProfile, cb) {
      try {
        const profile = fbProfile._json
        const { User } = context.models
        let user = await User.findOne(
          { facebookId: profile.id },
          {
            _id: 1,
            name: 1,
            email: 1,
            plan: 1,
            facebookId: 1,
            username: 1
          }
        )
        if (!user) {
          /**
           * User not found, create new user
           */
          try {
            const newUser = await User.create({
              lastName: profile.last_name,
              firstName: profile.first_name,
              gender: profile.gender,
              email: profile.email,
              name: profile.name,
              facebookUrl: profile.link,
              facebookId: profile.id
            }) 
            return cb(null, newUser)
          } catch (e) {
            return cb(null, false, 'create new user error: ' + e.toString())
          }
        }
        return cb(null, user)
      } catch (e) {
        return cb(e)
      }
    }
  )
  return fbStrategy
})
const deserializeSession = (exports.deserializeSession = (
  context: APIContext
) => async (id, done) => {
  const { User } = context.models
  /**
   * Actual session is this logic
   */
  const user = await User.findById(id, {
    email: true,
    _id: true,
  })
  return done(null, user)
})

const serializeSession = (exports.serializeSession = (
  context: APIContext
) => async (user, done) => {
  done(null, user._id)
})

export default function enchanceSession(
  app: any,
  context: APIContext
) {
  app.use(
    session({
      secret: context.config.cookieSecret || 'development',
      resave: false,
      store: new MongoStore({
        mongooseConnection: context.connection
      }),
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  passport.deserializeUser(deserializeSession(context))
  passport.serializeUser(serializeSession(context))
  passport.use(facebookLoginStrategy(context))
  app.get(
    '/facebook',
    passport.authenticate('facebook', {
      scope: ['email'],
      authType: 'rerequest'
    })
  )
  app.get(
    '/facebook/callback',
    passport.authenticate('facebook'),
    (req, res: express.Response) => {
     res.redirect('/profile') 
    }
  )

  if (context.config.isDev) {
    /**
     * Below this is
     * Development session resolve from
     * seed inmemory database
     * deseiralize will use only test agent account
     * please check your env if you have problem
     */
    // app.use(async (req, res, next) => {
    //   context.logger.log('Use seƒsion with development mode')
    //   const { User } = context.models
    //   const user = await User.findOne(
    //     { facebookId: '111111' },
    //     context.config.sessionProjection
    //   )
    //   req.user = user
    //   return next()
    // })
  }
}