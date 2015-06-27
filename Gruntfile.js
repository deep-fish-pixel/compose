module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		dir: {
			dev: 'program/src',
			rel: 'publish/src'
		},

		// 清空文件夹
		clean: {
			zip: ['*.zip'],
			rel: ['<%= dir.rel %>']
		},

		// 拷贝文件
		copy: {
			rel: {
				files: [{
					expand: true,
					cwd: '<%= dir.dev %>',
					src: ['**/*'],
					dest: '<%= dir.rel %>'
				}]
			}
		},

		// 压缩JS
		uglify: {
			options: {
				// 移除所有注释
				preserveComments: false
			},
			view: {
				files: [{
					expand: true,
					cwd: '<%= dir.dev %>/scripts',
					src: '**/*.js',
					dest: '<%= dir.rel %>/scripts'
				}]
			},
		},

		// 合并js
		concat: [{
			src: [
				'<%= dir.rel %>/scripts/a.js',
				'<%= dir.rel %>/scripts/b.js',
				'<%= dir.rel %>/scripts/first-index.js'
			],
			dest: '<%= dir.rel %>/scripts/first-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/c.js',
				'<%= dir.rel %>/scripts/second-index.js'
			],
			dest: '<%= dir.rel %>/scripts/second-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/c.js',
				'<%= dir.rel %>/scripts/d.js',
				'<%= dir.rel %>/scripts/third-index.js'
			],
			dest: '<%= dir.rel %>/scripts/third-index.js'
		}],

		// 压缩css
		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= dir.rel %>/css/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= dir.rel %>/css/',
				ext: '.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default',   ['clean', 'copy',  'concat', 'cssmin']);
};