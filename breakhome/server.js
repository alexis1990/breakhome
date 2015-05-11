// server.js

// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BreakHome'); // connect to our database

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// more routes for our API will happen here

// USERS
// =============================================================================
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var LoginSchema = require('./models/login.js');
passport.use(LoginSchema.createStrategy());

passport.serializeUser(LoginSchema.serializeUser());
passport.deserializeUser(LoginSchema.deserializeUser());

router.post('/register', function(req, res, next) {
    console.log('registering user');
    LoginSchema.register(new LoginSchema({
        username: req.body.username,
    }), req.body.password, function(err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }

        console.log('user registered!');

        res.redirect('/');
    });
});

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });

// router.get('/login', function(req, res) {
//     res.json(req.user);
// });

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);