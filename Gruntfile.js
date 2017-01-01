module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsdoc: {
      dist: {
        src: ['src/**/*.js'],
        options: {
          destination: 'docs/docs',
          template: 'node_modules/ink-docstrap/template',
          configure: 'jsdoc.conf.json'
        }
      }
    },
    jshint: {
      options: {
        esversion: 6,
        forin: true,
        asi: true
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    }
  })
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-jsdoc')
  grunt.registerTask('default', ['jshint', 'jsdoc'])
}