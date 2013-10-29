var middleware  = require('./index'),
    path        = require('path'),
    supertest   = require('supertest'),
    express     = require('express'),
    dcompose    = require('dcompose');

function fixture(filename) {
  return path.join(__dirname, 'fixtures', filename);
}

describe('dcompose-middleware', function() {
  var composer = dcompose(fixture('a.js'));
  var app = express();
  app.get('/assets/all.js', middleware(composer));
  app.get('/assets/only.js', middleware.serveJS(composer));
  app.get('/assets/only.css', middleware.serveCSS(composer));

  it ('serves bundle', function(done) {
    supertest(app)
      .get('/assets/all.js')
      .expect('Content-Type', 'application/javascript')
      .expect(200, done);
  });

  it ('serves js bundle', function(done) {
    supertest(app)
      .get('/assets/only.js')
      .expect('Content-Type', 'application/javascript')
      .expect(200, done);
  });

  it ('serves css bundle', function(done) {
    supertest(app)
      .get('/assets/only.css')
      .expect('Content-Type', 'text/css')
      .expect(200, done);
  });
});
