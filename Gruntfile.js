module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          'dist/js/main.min.js': ['components/zepto/zepto.min.js','src/js/main.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      build: {
        options: {
          yuicompress: true
        },
        files: {
          'dist/css/main.min.css': [ 'src/css/main.less',
                                     'src/css/style-config.less' ]
        }
      }
    },
    coffee: {
      build: {
        compile: {
          files: {
            // 'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
            'dist/js/main.js': ['src/js/*.coffee', 'src/js/**/*.coffee']
          }
        }
      }
    },
    pages: {
      options: {
        pageSrc: 'src/views/pages',
        // pagination: {
          // listPage: 'src/views/pages/blog.jade',
          // postsPerPage: 3
        // }
      },
      posts: {
          src: 'src/views/posts',
          dest: 'dist',
          layout: 'src/views/layouts/post.jade',
          url: 'post/:title'
      }
    },
    clean: {
        dev: ['dev'],
        build: ['dist'],
        pages: ['dist/*.html'],
        posts: ['dist/posts/*.html'],
        images: ['dist/images']
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src', src: ['.htaccess', 'remotedeploy.php'], dest: 'dist/' },
          {expand: true, cwd: 'src/images', src: ['*.*'], dest: 'dist/images/'},
          {expand: true, cwd: 'src/lib', src: ['HipChat.php'], dest: 'dist/lib/'}
        ]
      }
    },
    mocha: {
      all: [ 'test/**/*.html' ],
      options: {
        reporter: 'Spec'
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 10000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['test/buildSpec.js']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/css/less/*.less', 'src/css/main.less'],
        tasks: ['less']
      },
      js: {
        files: ['src/js/**/*.js', 'src/js/*.js', 'test/*.js'],
        tasks: ['uglify', 'qtest']
      },
      jade: {
         files: ['src/**/**/*.jade', 'src/**/*.jade', 'src/*.jade'],
         tasks: ['clean:pages', 'clean:posts', 'pages']
      },
      coffee: {
        files: ['src/**/*.coffee', 'src/*.coffee'],
        tasks: ['coffee:compile']
      },
      pages: {
        files: ['src/views/pages/*.html', 'src/pages/*.ejs', 'src/pages/*.eco'],
        tasks: ['pages']
      },
      posts: {
        files: ['src/views/**/*.md', 'src/views/posts/*.mdown', 'src/posts/*.markdown'],
        tasks: ['clean:posts', 'pages']
      }
    },
    open : {
      dev : {
        path: 'http://127.0.0.1:9001'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist/'
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['server']);
  grunt.registerTask('build', ['clean:build', 'jshint', 'less:build', 'coffee:build', 'pages', 'uglify:build', 'copy' ]);
  grunt.registerTask('server', ['build', 'connect', 'open', 'watch' ]);
  grunt.registerTask('qtest', ['simplemocha', 'mocha']);
  grunt.registerTask('test', ['build', 'qtest']);
  // grunt.registerTask('watch', ['server']);
};