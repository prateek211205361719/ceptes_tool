
const express = require("express");


const bodyParser = require("body-parser");
var cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./server/config/keys');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['sanu','prateek'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
   // req.user = {"_id":"5a8c8c2967c6ef100446e44e","googleId":"115508362897995303571","name":"Prateek Chaturvedi","photo":"https://lh4.googleusercontent.com/-eHu1JJVpUUc/AAAAAAAAAAI/AAAAAAAAAr8/r3iyeav_b_g/photo.jpg?sz=50","__v":0};
    next();
});

//passport service config
require('./server/services/passport');
//auth route
require('./server/routes/auth')(app);
require('./server/routes/project')(app);
require('./server/routes/milesstone')(app);
require('./server/routes/tasklist')(app);
require('./server/routes/task')(app);


// code to push production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get('*', (req, res) => {
       res.sendfile(path.resolve(__dirname,'client','build','index.html'));
    });
 }
 


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('----------running------');
});