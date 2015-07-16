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
				'<%= dir.rel %>/scripts/mod/a.js',
				'<%= dir.rel %>/scripts/mod/b.js',
				'<%= dir.rel %>/scripts/first-index.js'
			],
			dest: '<%= dir.rel %>/scripts/first-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/mod/c.js',
				'<%= dir.rel %>/scripts/second-index.js'
			],
			dest: '<%= dir.rel %>/scripts/second-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/mod/c.js',
				'<%= dir.rel %>/scripts/mod/d.js',
				'<%= dir.rel %>/scripts/third-index.js'
			],
			dest: '<%= dir.rel %>/scripts/third-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/mod/e.js',
				'<%= dir.rel %>/scripts/mod/f.js',
				'<%= dir.rel %>/scripts/forth-index.js'
			],
			dest: '<%= dir.rel %>/scripts/forth-index.js'
		},
		{
			src: [
				'<%= dir.rel %>/scripts/mod/g.js',
				'<%= dir.rel %>/scripts/mod/h.js',
				'<%= dir.rel %>/scripts/fifth-index.js'
			],
			dest: '<%= dir.rel %>/scripts/fifth-index.js'
		},
		{
			options:{
				separator:';compose.satisfy();'
			},
			src: [
				'<%= dir.rel %>/scripts/mod/i.js',
				'<%= dir.rel %>/scripts/mod/j.js',
				'<%= dir.rel %>/scripts/sixth-index.js'
			],
			dest: '<%= dir.rel %>/scripts/sixth-index.js'
		},
		{
			/*demo-13.html*/
			src: [
				'<%= dir.rel %>/scripts/mod/object/first.js',
				'<%= dir.rel %>/scripts/mod/object/second.js',
				'<%= dir.rel %>/scripts/mod/wight/first-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/second-wight.js',
				'<%= dir.rel %>/scripts/mod/page/first-page.js',
				'<%= dir.rel %>/scripts/seventh-index.js',
			],
			dest: '<%= dir.rel %>/scripts/seventh-index.js'
		},
		{
			/*demo-14.html*/
			src: [
				'<%= dir.rel %>/scripts/mod/object/third.js',
				'<%= dir.rel %>/scripts/mod/object/forth.js',
				'<%= dir.rel %>/scripts/mod/wight/third-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/forth-wight.js',
				'<%= dir.rel %>/scripts/mod/page/second-page.js',
				'<%= dir.rel %>/scripts/eighth-index.js',
			],
			dest: '<%= dir.rel %>/scripts/eighth-index.js'
		},
		{
			/*demo-15.html*/
			src: [
				'<%= dir.rel %>/scripts/mod/object/first.js',
				'<%= dir.rel %>/scripts/mod/object/second.js',
				'<%= dir.rel %>/scripts/mod/wight/first-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/second-wight.js',
				'<%= dir.rel %>/scripts/mod/page/first-page.js',
				
				'<%= dir.rel %>/scripts/mod/object/third.js',
				'<%= dir.rel %>/scripts/mod/object/forth.js',
				'<%= dir.rel %>/scripts/mod/wight/third-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/forth-wight.js',
				'<%= dir.rel %>/scripts/mod/page/second-page.js',
				
				'<%= dir.rel %>/scripts/mod/a.js',
				'<%= dir.rel %>/scripts/mod/b.js',
				'<%= dir.rel %>/scripts/mod/c.js',
				'<%= dir.rel %>/scripts/mod/d.js',
				'<%= dir.rel %>/scripts/mod/k.js',
				
				'<%= dir.rel %>/scripts/ninth-index.js',
			],
			dest: '<%= dir.rel %>/scripts/ninth-index.js'
		},
		{
			/*demo-16.html*/
			src: [
				'<%= dir.rel %>/scripts/mod/object/first.js',
				'<%= dir.rel %>/scripts/mod/object/second.js',
				'<%= dir.rel %>/scripts/mod/wight/first-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/second-wight.js',
				'<%= dir.rel %>/scripts/mod/page/first-page.js',
				
				'<%= dir.rel %>/scripts/mod/a.js',
				'<%= dir.rel %>/scripts/mod/b.js',
				'<%= dir.rel %>/scripts/mod/c.js',
				'<%= dir.rel %>/scripts/mod/d.js',
				'<%= dir.rel %>/scripts/mod/k.js',
				
				'<%= dir.rel %>/scripts/mod/object/third.js',
				'<%= dir.rel %>/scripts/mod/object/forth.js',
				'<%= dir.rel %>/scripts/mod/wight/third-wight.js',
				'<%= dir.rel %>/scripts/mod/wight/forth-wight.js',
				'<%= dir.rel %>/scripts/mod/page/second-page.js',
				'<%= dir.rel %>/scripts/tenth-index.js',
			],
			dest: '<%= dir.rel %>/scripts/tenth-index.js'
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
	
	grunt.registerTask('default',   ['clean', 'copy', 'uglify', 'concat', 'cssmin']);
};