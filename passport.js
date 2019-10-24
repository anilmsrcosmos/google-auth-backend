const GoogleStrategy = require("passport-google-token").Strategy;
const config = require("./config");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_SECRET
      },
      function(accessToken, refreshToken, profile, done) {
        // TODO saving user to mongoose
        console.log(accessToken);
        const user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleProvider: {
            id: profile.id,
            token: accessToken
          }
        };
        console.dir(user, { colors: true });
        return done(null, user);
      }
    )
  );
};
