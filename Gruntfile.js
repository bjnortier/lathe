'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        loopfunc: true,
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.v2.js'],
        options: {
          globals: {
            define: false,
            ArrayBuffer: false,
            Float32Array: false,
          },
        },
      },
      unit: {
        src: ['test/**/*.js'],
        options: {
          globals: {
            describe: false, 
            before: false, 
            beforeEach: false, 
            after: false,
            afterEach: false,
            it: false,
          },
        },
      },
      unitv2: {
        src: ['test/**/*.v2.test.js'],
        options: {
          globals: {
            define: false,
            assert: false,
            describe: false, 
            before: false, 
            beforeEach: false, 
            after: false,
            afterEach: false,
            it: false,
          },
        }
      },
      bench: {
        src: ['bench/**/*.test.js'],
        options: {
          globals: {
            define: false,
            assert: false,
            describe: false, 
            before: false, 
            beforeEach: false, 
            after: false,
            afterEach: false,
            it: false,
          },
        }
      },
    },

    simplemocha: {
      options: {
        timeout: 5000,
        slow: 5000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec',
        path: 'test'
      },
      unit: { 
        src: 'test/test.js'
      },
      bench: { 
        src: 'bench/bench.js',
        options: {
          slow: 10000,
          reporter: 'dot',
        },
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'unit', 'bench']
      },
      unit: {
        files: '<%= jshint.unit.src %>',
        tasks: ['jshint:unitv2', 'unit']
      },
      bench: {
        files: '<%= jshint.bench.src %>',
        tasks: ['bench']
      },
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('unit', ['simplemocha:unit']);
  grunt.registerTask('bench', ['simplemocha:bench']);

  grunt.registerTask('test', ['jshint', 'unit']);
  grunt.registerTask('default', ['unit']);

};
