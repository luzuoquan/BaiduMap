module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			options: {
				port: 9001,
				hostname: 'localhost',
				base: '.'
			},
			livereload: {
				options: {
					middleware: function(connect, options){
						return [
							require('connect-livereload')({
								port: 35737
							}),
							connect.static(options.base),
							connect.directory(options.base)
						];
					}
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['script/*.js'],
				dest: 'dist/main-dist.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n/*!<%=pkg.author %>*/\n'
			},
			build: {
				files:{
					'build/main.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		less: {
			development: {
				files: {
					"style/css/map.css" : "style/css/map.less"
				}
			}
		},
		watch:{
			less: {
				files: ['style/css/*.less'],
				tasks: ['less:development']
			},
			livereload: {
				options: {
					livereload: 35737
				},
				files: ['style/css/*.css','script/*.js','*.html']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-livereload');  
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat','uglify','watch']);
}