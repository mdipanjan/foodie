const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require("passport");
require('./models/User');
require('./services/passport');
const key = require('./config/key')
const app = express();

app.use(
    cookieSession({
        maxAge: 30* 24 *60* 60* 1000,
        keys:[key.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
mongoose.connect(key.monoURI,
    {
    useNewUrlParser: true 
})
   .then(()=> console.log('connected to mongodb'))
   .catch(err => console.error('could not connect')) 


const port = process.env.PORT || 9000;

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})