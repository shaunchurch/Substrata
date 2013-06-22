module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },   
      build: {
        files: {
          'dist/js/main.min.js': ['src/js/main.js']
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
      build: {     
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

    less: {
      build: {
        options: {
          yuicompress: true
        },
        files: {
          'dist/css/main.min.css': 'src/css/main.less'
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
        pageSrc: 'src/views/pages'
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
        posts: ['dist/posts/*.html']
    },

    copy: {
      main: {
        files: [          
          {expand: true, src: ['src/images/*'], dest: 'dist/images/'},          
        ]
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
        files: ['src/js/**/*.js', 'src/js/*.js'],
        tasks: ['uglify']
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jshint', 'uglify', 'recess']);
  grunt.registerTask('server', ['clean:build', 'jshint', 'less:build', 'coffee:build', 'pages', 'uglify:build', 'copy', 'connect', 'open', 'watch' ]);  
  grunt.registerTask('build', ['clean:build', 'jshint', 'less:build', 'coffee:build', 'pages' ]);

};