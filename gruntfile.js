module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            options: {
                // browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            all_styles: {
                /**
                 * Overrides less output.  This step should always be the last style change.
                 */
                src: 'webapp/css/**/*.css'
            }
        },
        browserify: {
            all_scripts: {
                files: {
                    'webapp/js/common.js': ['bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.min.js'],
                    'webapp/js/page.js': ['src/js/apps/bownce/**/*.js']
                }
            }
        },
        eslint: {
            target: ['src/**/*.js']
        },
        less: {
            all_styles: {
                options: {},
                files: {
                    'webapp/css/common.css': 'src/less/common.less'
                }
            }
        },
        watch: {
            everything: {
                files: ['src/js/**/*.js', 'src/less/**/*.less'],
                tasks: ['browserify:all_scripts']
            },
            all_scripts: {
                files: ['src/js/**/*.js']
            },
            all_styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less:all_styles', 'autoprefixer']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch:everything']);
    grunt.registerTask('styles', ['less', 'autoprefixer']);
    grunt.registerTask('scripts', ['eslint', 'browserify:all_scripts']);
    grunt.registerTask('test', ['eslint', 'karma']);
};