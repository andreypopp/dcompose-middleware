"use strict";

var aggregate = require('stream-aggregate-promise'),
    mimetype  = require('mimetype');

function makeServeBundle(method, composer) {
  function serveBundle(req, res, next) {
    var bundleName = req.url.slice(1);
    function serve(bundle) {
      res.setHeader('Content-Type', mimetype.lookup(bundleName));
      res.send(bundle);
    }
    serveBundle.bundle.then(serve, next);
  }

  serveBundle.build = function() {
    serveBundle.bundle = composer[method]().asPromise();
  }

  serveBundle.build();
  composer.on('update', serveBundle.build);

  return serveBundle;
}

module.exports = makeServeBundle.bind(null, 'bundle');
module.exports.serveJS = makeServeBundle.bind(null, 'bundleJS');
module.exports.serveCSS = makeServeBundle.bind(null, 'bundleCSS');
