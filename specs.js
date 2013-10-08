var middleware  = require('./index'),
    path        = require('path'),
    supertest   = require('supertest'),
    express     = require('express'),
    dcompose    = require('dcompose');

function fixture(filename) {
  return path.join(__dirname, 'fixtures', filename);
}

describe('dcompose-middleware', function() {
  var app = express();
  app.use('/assets', middleware(dcompose(fixture('a.js'))));

  it ('serves js bundle', function(done) {
    supertest(app)
      .get('/assets/bundle.js')
      .expect('Content-Type', 'application/javascript')
      .expect(200, done);
  });

  it ('serves css bundle', function(done) {
    supertest(app)
      .get('/assets/bundle.css')
      .expect('Content-Type', 'text/css')
      .expect(200, done);
  });
});
