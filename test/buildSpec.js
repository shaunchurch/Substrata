var fs = require('fs');
require('should');
var spawn = require('child_process').spawn;

describe("HTML Build Tests", function() {

  before(function (done) {
    var buildProcess = spawn('grunt', ['pages:posts']);
    buildProcess.stdout.on('close', function () {
      done();
    });
  });

  it('should generate posts in the dist/post directory', function() {
    fs.existsSync('dist/post/and-now-for-something-completely-different.html').should.be.ok;
    fs.existsSync('dist/post/this-is-the-first-post.html').should.be.ok;    
  });

  it('should generate pages in the root dist/ directory', function() {
    fs.existsSync('dist/index.html').should.be.ok;    
    fs.existsSync('dist/about.html').should.be.ok;
  });

  it('should compile and minify javascript files', function() {
    fs.existsSync('dist/js/main.min.js').should.be.ok
  });

  it('should compile and minify less / css files', function() {
    fs.existsSync('dist/css/main.min.css').should.be.ok;
  });

  it('should copy .htaccess file', function() {
    fs.existsSync('dist/.htaccess').should.be.ok;
  });

  it('should copy img files', function() {
    fs.existsSync('dist/images/windowblur.jpg').should.be.ok;
  });

});