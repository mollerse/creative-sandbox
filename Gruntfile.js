module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 1338,
          base: '',
          livereload: true,
          autoindex: true
        }
      }
    },
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: './',
          src: ['./*/*.scss'],
          dest: './',
          ext: '.css'
        }]
      }
    },
    browserify: {
      options: {
        debug: true
      },
      dev: {
        files: [{
          expand: true,
          cwd: './',
          src: ['./*/*.js', '!./*/*.bundle.js'],
          dest: './',
          ext: '.bundle.js'
        }],
        options: {
        }
      }
    },
    watch: {
      livereload: {
        options: {
          spawn: false,
          livereload: true
        },
        files: ['./*/*.html', './*/*.bundle.js', './*/*.css'],
      },
      sass: {
        files: ['./*/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['./*/*.js', '!./*/*.bundle.js'],
        tasks: ['browserify']
      },
      gruntfile: {
        files: ['./Gruntfile.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('dev', ['connect', 'watch']);
};