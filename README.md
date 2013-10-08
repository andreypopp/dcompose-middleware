# dcompose-middleware

Connect/Express middleware for dcompose bundler.

## Installation

    % npm install dcompose-middleware

## Usage

    var dcompose = require('dcompose'),
        serve    = require('dcompose-middleware'),
        express  = require('express');

    app = express();
    app.use('/assets', serve(dcompose('./app.js')));
    app.listen(3000);

Now

    % curl http://localhost:3000/assets/bundle.js
    % curl http://localhost:3000/assets/bundle.css
