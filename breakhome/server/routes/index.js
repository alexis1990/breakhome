var express = require('express');
var router = express.Router();
var url = 'http://localhost:8101';

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect(url + '/#/app/search');
}

module.exports = function(passport) {

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: url + '/#/app/playlists',
        failureRedirect: url + '/#/app/search'
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res) {});

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: url + '/#/app/login',
        failureRedirect: url + '/#/app/search'
    }));

    /* GET Home Page */
    router.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    /* Handle Logout */
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect(url + '/#/app/search');
    });

    return router;
}