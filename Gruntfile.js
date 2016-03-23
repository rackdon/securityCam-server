module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt)
  // load all grunt tasks
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    standard: {
      lint: {
        src: [
          './{src,test}/**/*.js'
        ]
      },
      format: {
        options: {
          format: true,
          lint: true
        },
        src: [
          './{src,test}/**/*.js'
        ]
      }
    }
  })

  grunt.registerTask('format', [
    'standard:format'
  ])

  grunt.registerTask('test', [
    'format'
  ])
}
