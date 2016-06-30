/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    compassCompiler: {
      'sourceMap': true
    },
    sassCompiler: {
      'sourceMap': true
    },
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      '@angular2-material/**/*',
      'moment/moment.js',
      'ng2-bootstrap/**/*.+(js|css)',
      'angular2-fontawesome/lib/**/*',
      'font-awesome/css/**/*',
      'font-awesome/fonts/**/*',
    ]
  });
};
