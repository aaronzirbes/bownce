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
                src: 'public/css/**/*.css'
            }
        },
        assemble: {
            options: {
                assets: 'assets',
                plugins: ['permalinks'],
                partials: ['src/pages/includes/**/*.hbs'],
                layout: ['src/pages/layouts/default.html'],
                data: ['data/*.{json,yml}']
            },
            pages: {
                files: {
                    'public/': ['src/pages/**/*.hbs']
                }
            }
        },
        browserify: {
            all_scripts: {
                files: {
                    'public/js/common.js': ['bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.min.js'],
                    'public/js/main.js': ['src/js/components/bownce-counter/bownce-counter-directive.js']
                },
                options: {
                    transform: ['brfs']
                }
            }
        },
        clean: ['public'],
        eslint: {
            options: {
                config: 'conf/eslint.json'
            },
            target: ['src/**/*.js']
        },
        less: {
            all_styles: {
                options: {
                    strictImports: true
                },
                files: {
                    'public/css/common.css': 'src/less/common.less'
                }
            }
        },
        watch: {
            everything: {
                files: ['src/js/**/*.js', 'src/less/**/*.less'],
                tasks: ['browserify:all_scripts']
            },
            scripts: {
                files: ['src/js/**/*.js']
            },
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less:all_styles', 'autoprefixer']
            },
            pages: {
                files: ['src/pages/**/*.html', 'src/pages/**/*.hbs'],
                tasks: ['assemble']
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks("assemble");

    grunt.registerTask('default', ['styles', 'scripts']);
    grunt.registerTask('styles', ['less', 'autoprefixer']);
    grunt.registerTask('scripts', ['eslint', 'browserify:all_scripts']);
    grunt.registerTask('test', ['eslint', 'karma']);
    grunt.registerTask('watch', ['watch:everything']);
};