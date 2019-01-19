const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const key = require('../config/key')
const mongoose = require('mongoose');

const User = require('../models/User');

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user=>{
    done(null, user);
  });
});

passport.use(

    new GoogleStrategy({
        
       clientID:key.googleClientID,
       clientSecret:key.googleClientSecret,
       callbackURL:'/auth/google/callback',
       proxy: true

     }, 
      (accessToken, refreshToken, profile , done)=> {
        
         console.log('profile:', profile);

          const newUser = {
            
            name:profile.displayName,
            email:profile.emails[0].value,
            googleID: profile.id
            
          }
          User.findOne({googleID: profile.id})
          .then((existingUser)=>{

            if(existingUser){
              console.log('already Registered');
              done(null, existingUser);

            }else{
              new User(newUser)
              .save()
              .then(user=> done(null,user));
            }


        })

       
        
       }
       )

   );
