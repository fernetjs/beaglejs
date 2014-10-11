'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    // Test Server
    express: {
      test: {
        options: {
          script: './test/testServer.js',
          node_env: 'test',
          port: 3000
        }
      }
    },

    mochacov: {
      unit: {
        options: {
          reporter: 'spec'
        }
      },
      html: {
        options: {
          reporter: 'html-cov',
          output: 'coverage.html'
        }
      },
      coverage: {
        options: {
          reporter: 'mocha-term-cov-reporter',
          coverage: true
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      options: {
        files: 'test/core.js',
        ui: 'bdd',
        colors: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-cov');

  var testStack = [
      "express:test"
    , "mochacov:unit"
    , "mochacov:coverage"
  ];

  grunt.registerTask('test', testStack.concat(['mochacov:html']));
  grunt.registerTask('travis', testStack);
  grunt.registerTask('default', 'test');
};