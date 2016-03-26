module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt)
  // load all grunt tasks
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    shell: {
        runNodeserver: {
          command: 'node src/server.js'
        },
        runMongoDBserver: {
          command: 'mongod'
        },
        runMotion: {
          command: 'motion'
        }
    },

    concurrent: {
        target1: {
            tasks: ['shell:runMongoDBserver', 'shell:runNodeserver', 'shell:runMotion'],
            options: {
                logConcurrentOutput: true
            }
        }
    },

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
    'format',
    'start'
  ])

  grunt.registerTask('start', [
    'concurrent:target1'
  ])
}
