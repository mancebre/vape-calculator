module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['Gruntfile.js']
		},
		connect: {
			server: {
				options: {
					port: 9002,
					base: './public/',
					open: true
				}
			}
		},
		watch: {
			files: [
                'Gruntfile.js',
                '<%= jshint.files %>',
                'public/index.html',
                'public/stylesheets/*.css',
                'public/app/*.js',
                'public/app/**/*.*',
                'public/stylesheets/*.scss',
					],
			tasks: ['jshint', 'compass'],
			options: {
				livereload: true
			}
		},
        compass: {
            dist: {
                options: {
                    sassDir: 'public/stylesheets',
                    cssDir: 'public/stylesheets'
                }
            }
        },

		//
        copy: {
            build: {
                cwd: 'public',
                src: [ '**' ],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ 'build' ]
            },
            stylesheets: {
                src: [ 'build/**/*.css', '!build/application.css' ]
            },
            scripts: {
                src: [ 'build/**/*.js', '!build/application.js' ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/application.css': [ 'build/**/*.css' ]
                }
            }
        },
        coffee: {
            build: {
                expand: true,
                cwd: 'public',
                src: [ '**/*.coffee' ],
                dest: 'build',
                ext: '.js'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'build/application.js': [ 'build/**/*.js' ]
                }
            }
        },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-compass');

    // TODO NOT WORKING
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        [ 'cssmin' ]
    );
    grunt.registerTask(
        'scripts',
        'Compiles the JavaScript files.',
        [ 'coffee', 'uglify' ]
    );
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy', 'stylesheets', 'scripts' ]
    );
	// NOT WORKING END

	grunt.registerTask('default', ['jshint', 'connect', 'watch', 'compass']);

};
