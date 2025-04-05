const passport = require('passport')
const User = require('../../user/User')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.username)
  })

  passport.deserializeUser(async (username, done) => {
    User.findByUserName(username)
      .then(user => {
        console.log(user)
        done(null, user)
      }).catch(err => {
        done(err, null)
      })
  })
}
