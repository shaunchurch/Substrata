module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['js/main.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },

    uglify: {
       options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/main.min.js': ['js/*.js']
        }
      }
    },
      
    jshint: {
      files: ['gruntfile.js', 'js/*.js'],
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
            'css/main.min.css': [
                'css/main.less'                    
            ]
        }        
      }
    },

    watch: {
      files: ['css/less/*.less', 'css/main.less'],
      tasks: ['jshint', 'uglify', 'recess']
    },

    connect: {
     options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        // hostname: 'localhost'
        hostname: '0.0.0.0'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // grunt.registerTask('test', ['jshint', 'recess']);

  grunt.registerTask('default', ['jshint', 'uglify', 'recess']);

  grunt.registerTask('server', ['jshint', 'uglify', 'recess', 'connect', 'watch']);


};