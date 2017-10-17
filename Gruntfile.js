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
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['jshint', 'connect', 'watch', 'compass']);

};
