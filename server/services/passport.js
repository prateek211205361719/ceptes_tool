const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../models/users');
const keys = require('../config/keys');

passport.serializeUser(function(user, done) {
    
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
 });

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: keys.callbackURL,
   
    
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
       
        var existingUser = await Users.findOne({googleId:profile.id});
        if(existingUser){
            done(null,existingUser);
        }else{

            var User = new Users({googleId: profile.id,email:profile.emails[0].value, name:profile.displayName, photo:profile._json.image.url});
            var newUser = await User.save();
            if(newUser){
                done(null,newUser);
            }
        }
    }catch(e){
        console.log(e);
        return done(err);
    }
  }
));