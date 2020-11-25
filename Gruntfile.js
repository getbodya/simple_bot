module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
	
        browserify: {
            vendor: {
                files: {
                    'static/pages/vendor.bundle.js': []
                },
                options: {
                    alias:  ['react', 'react-dom'],
                    transform: [
                        ['uglifyify', {global: false}]
                    ]
                }
            },
            app: {
                files: {
                    'static/pages/login/login.bundle.js': ['static/pages/login/app.js']
                },
                options: {
                    transform: [
						['babelify', {presets: ['es2015', 'react', 'stage-0']}, 'reactify'],
						// ['uglifyify', {global: false}]
					],
					browserifyOptions: {
                        debug: true
                    },
                    external: ['react', 'react-dom']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['availabletasks']);
};