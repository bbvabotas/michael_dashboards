"use strict";

require('dotenv').config()
var fs = require('fs')
var path = require('path')
var Papa = require('papaparse')
var moment = require('moment')
var winston = require('winston')

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    passport = require('passport'),
    session = require('express-session'),
    GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK = process.env.GOOGLE_CALLBACK,
    SESSION_SECRET = process.env.SESSION_SECRET

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
    accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
    cb(null, extractProfile(profile)); 
}));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    signed: true
}));

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (obj, done) {
    return done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

// configure Express
app.use("/img", express.static(__dirname + '/views/img'));
app.use("/tuyyo_dashboard/static", express.static(__dirname + '/views/app/tuyyo_dashboard/static'));
app.use("/customer_feedback/static", express.static(__dirname + '/views/app/customer_feedback/static'));
app.use("/mobile_app_reviews_ui/static", express.static(__dirname + '/views/app/mobile_app_reviews_ui/static'));
app.use("/mobile_security_word_search/static", express.static(__dirname + '/views/app/mobile_security_word_search/static'));
app.use("/api_testing/static", express.static(__dirname + '/views/app/api_testing/static'));

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'access.log' })
    ]
})

//Make sure the user is authenticated if the user tries to go to any of the URLs within /app/
app.get('/app/*', function (req, res, next) {

    //Keep the page that the user was trying to get to
    req.session.oauth2return = req.originalUrl
    
    if (req.isAuthenticated() && checkDomain(req.user.email) === "bbva.com") {
        logger.log('info', "User: " + req.user.displayName + " Accessed: " + req.originalUrl + " At: " + moment().format('MMMM Do YYYY, h:mm:ss a'))
        res.sendFile(__dirname + '/views/' + req.originalUrl + '/index.html')
    } else {
        res.redirect('/auth/login')
    }
})

app.get('/error', function(req, res){
    res.sendFile(__dirname + '/error.html')
})

app.get('/getProfile', function (req, res) {
    res.json(req.user.image)
})

app.get('/getEmail', function(req, res){
    res.json(req.user.email)
})

app.get('/api/get_testing_mapping', function(req, res){
    
    fs.readFile(path.resolve(__dirname, 'views/app/data/api_testing_mapping.csv'), 'utf-8', (err, file) => {

        if(err){
            console.log(err)
        }
        
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                res.send(results)
            }
        })
    })
})

app.get(
    // Login url
    '/auth/login',

    // Save the url of the user's current page so the app can redirect back to it after authorization
    (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },

    // Start OAuth 2 flow using Passport.js
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        prompt : "select_account"
    })
);

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/login')
//    res.redirect('https://accounts.google.com/logout');
});

app.get(
    // OAuth 2 callback url. Use this url to configure your OAuth client in the Google Developers console
    '/auth/google/callback',

    // Finish OAuth 2 flow using Passport.js
    passport.authenticate('google', {failureRedirect: '/auth/login'}),

    // Redirect back to the original page, if any
    (req, res) => {
        if(checkDomain(req.user.email) === "bbva.com"){
            const redirect = req.session.oauth2return || '/app/';
            delete req.session.oauth2return;
            res.redirect(redirect);
        } else {
            res.redirect('/error')
        }
        
    }
);

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
        email: profile.email
    };
}

function authRequired(req, res, next) {
    
    if (!req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/auth/login');
    }
    
    next();
}

function checkDomain(email){
    return email.split('@')[1]
}

function addTemplateVariables(req, res, next) {
    res.locals.profile = req.user;
    res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
    res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
    next();
}

var port = 8099;
console.log('listening on port ' + port)
server.listen(port);

module.exports = {
    extractProfile: extractProfile,
    required: authRequired,
    template: addTemplateVariables
};