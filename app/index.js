'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var extractGeneratorName = function (_, appname) {
  var slugged = _.slugify(appname);
  var match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};

var SubstrataGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function() {
            this.spawnCommand('grunt', ['build']);
          }.bind(this)
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();
    var generatorName = extractGeneratorName(this._, this.appname);

    // have Yeoman greet the user
    this.log(this.yeoman);
    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Follow the prompts to configure your Substrata install:'));

    var prompts = [{
      name: 'projectName',
      message: 'What do you call your project?',
      default: 'My Substrata Project'
    },{
      name: 'projectUrl',
      message: 'Project website:',
      default: 'http://www.example.com'
    },{
      name: 'projectAuthor',
      message: 'Author:',
      default: 'Author'
    },{
      name: 'projectAuthorEmail',
      message: 'Author E-Mail:',
      default: 'author@email.com'
    },{
      name: 'projectDescription',
      message: 'Description:',
      default: 'The project description'
    },{
      type: 'confirm',
      name: 'projectHasPosts',
      message: 'Does your project require blog posts?',
      default: true
    }];

    // Todo: Find a qay to escape underscore tags
    // otherwise these tags in the banner get iterpreted
    this.gruntUglifyBanner = "/*! <%= pkg.name %> <%= grunt.template.today(\"dd-mm-yyyy\") %> */";

    this.prompt(prompts, function (props) {
      this.projectName        = props.projectName;
      this.projectUrl         = props.projectUrl;
      this.projectAuthor      = props.projectAuthor;
      this.projectAuthorEmail = props.projectAuthorEmail;
      this.projectDescription = props.projectDescription;
      this.projectHasPosts    = props.projectHasPosts;

      done();
    }.bind(this));
  },

  scaffold: function () {
    this.log(chalk.green('Creating project scaffolding.'));

    this.mkdir('dist');
    this.mkdir('src');
    this.mkdir('src/views');
    this.mkdir('src/views/layouts');
    this.mkdir('src/views/pages');
    this.mkdir('src/views/partials');
  },

  views: function () {
    this.log(chalk.green('Creating project views.'));

    // Layouts
    this.copy('views/layouts/mixins.jade', 'src/views/layouts/mixins.jade');
    if(this.projectHasPosts) this.copy('views/layouts/post.jade', 'src/views/layouts/post.jade');

    //Pages
    this.copy('views/pages/about.jade', 'src/views/pages/about.jade');
    this.copy('views/pages/index.jade', 'src/views/pages/index.jade');
    if(this.projectHasPosts) this.copy('views/pages/archive.jade', 'src/views/pages/archive.jade');
    if(this.projectHasPosts) this.copy('views/pages/blog.jade', 'src/views/pages/blog.jade');

    // Partials
    this.copy('views/partials/key-features.jade', 'src/views/partials/key-features.jade');
    this.copy('views/partials/snippets.html', 'src/views/partials/snippets.html');
    this.copy('views/partials/try.jade', 'src/views/partials/try.jade');
    this.copy('views/partials/upgrade-browser.html', 'src/views/partials/upgrade-browser.html');
    if(this.projectHasPosts) this.copy('views/partials/latest-posts.jade',   'src/views/partials/latest-posts.jade');

    // Posts
    if(this.projectHasPosts) this.directory('views/posts/', 'src/views/posts/');

    // Templated files
    if(this.projectHasPosts) {
      this.template('views/layouts/_base.jade', 'src/views/layouts/base.jade');
    } else {
      this.template('views/layouts/_base_withoutPosts.jade', 'src/views/layouts/base.jade');
    }
  },

  packagefiles: function () {
    // Templated files
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    if(this.projectHasPosts) {
      this.template('_Gruntfile.js', 'Gruntfile.js');
    } else {
      this.template('_Gruntfile_withoutPosts.js', 'Gruntfile.js');
    }
  },

  assets: function () {
    // Images
    this.directory('images/', 'src/images/');

    // Less/CSS Assets
    this.directory('css/', 'src/css/');

    // JS?Coffee Assets
    this.directory('js/', 'src/js/');

  }

});

module.exports = SubstrataGenerator;