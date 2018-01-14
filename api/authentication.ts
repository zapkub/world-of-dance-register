import * as express from 'express'
const session = require('express-session')
const FacebookStrategy = require('passport-facebook')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const bcrypt = require('bcrypt-nodejs')

const localStrategy = (exports.localStrategy = (context: APIContext) => {
  return new LocalStrategy(async function(username, password, done) {
    if (!username || !password) {
      done(new Error('usernane, password is not provided'))
    }
    try {
      const user = await context.models.User.findOne({ email: username })
      if (!user) {
        done(null, false, 'email not found')
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          done(null, user)
        } else {
          done(null, false, 'password not correct')
        }
      }
    } catch (e) {
      done(e)
    }
  })
})
const facebookLoginStrategy = (exports.facebookLoginStrategy = (
  context: APIContext
) => {
  const fbStrategy = new FacebookStrategy(
    {
      clientID: context.config.facebook.id,
      clientSecret: context.config.facebook.secret,
      callbackURL: context.config.facebook.callbackUrl,
      profileFields: [
        'id',
        'displayName',
        'birthday',
        'email',
        'link',
        'first_name',
        'gender',
        'last_name'
      ]
    },
    async function(accessToken, refreshToken, _, fbProfile, cb) {
      try {
        console.log(fbProfile)
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
              lastname: profile.last_name,
              firstname: profile.first_name,
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
    _id: true,
    role: true
  }).lean()
  return done(null, user)
})

const serializeSession = (exports.serializeSession = (
  context: APIContext
) => async (user, done) => {
  done(null, user._id)
})

export default function enchanceSession(app: any, context: APIContext) {
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
  passport.use(localStrategy(context))

  app.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
      req.logout()
      res.redirect('/')
    })
  })
  app.get(
    '/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile', 'user_birthday'],
      authType: 'rerequest'
    })
  )
  app.get(
    '/login',
    passport.authenticate('local', { failureRedirect: '/admin' }),
    function(req, res) {
      res.redirect('/admin')
    }
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
