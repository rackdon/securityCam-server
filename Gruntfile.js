module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt)
  // load all grunt tasks
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    shell: {
        runNodeserver: {
          command: 'NODE_ENV=production node src/server.js'
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
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 5000,
          require: 'test/helpers/globals.js'
        },
        src: ['test/unit/test-suite.js', 'test/integration/test-suite.js']
      }
},
  })

  grunt.registerTask('format', [
    'standard:format'
  ])

  grunt.registerTask('test', [
    'format',
    'mochaTest:test'
  ])

  grunt.registerTask('start', [
    'concurrent:target1'
  ])
}
