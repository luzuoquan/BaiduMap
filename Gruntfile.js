module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		watch:{
			files: ['script/*.js'],
			tasks: ['concat','uglify']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat','uglify']);
}