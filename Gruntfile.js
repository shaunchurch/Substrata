module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
       options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/main.min.js': ['dist/js/main.js']
        }
      }
    },
      
    jshint: {
      files: ['gruntfile.js', 'src/js/*.js'],
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

    recess: {   
      dist: {     
        options: {
            compile: true,
            compress: true
        },
        files: {
            'dist/css/main.min.css': [
                'src/css/main.less'                    
            ]
        }        
      }
    },

    coffee: {
      compile: {
        files: {
          // 'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
          'dist/js/main.js': ['src/js/*.coffee', 'src/js/**/*.coffee']
        }
      }
    },

    pages: {     
      options: {
        pageSrc: 'src/views/pages'
      },
      posts: {
        src: 'src/views/posts',
        dest: 'dist',
        layout: 'src/views/layouts/post.jade',
        url: 'post/:title' 
      }     
    },

    clean: ["dist"],

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/css/less/*.less', 'src/css/main.less'],
        tasks: ['jshint', 'uglify', 'recess']   
      },
      jade: {
         files: ['src/**/**/*.jade', 'src/**/*.jade', 'src/*.jade'],
         tasks: ['clean', 'pages']
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
        tasks: ['pages']
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-pages');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.registerTask('test', ['jshint', 'recess']);

  grunt.registerTask('default', ['jshint', 'uglify', 'recess']);

  grunt.registerTask('server', ['clean', 'jshint', 'recess', 'coffee:compile', 'pages', 'uglify', 'connect', 'watch']);


};