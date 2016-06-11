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
        },
        runCoverage: {
          command: 'npm run coverage'
        }
    },

    concurrent: {
        target1: {
            tasks: ['shell:runNodeserver', 'shell:runMotion'],
            options: {
                limit: 3,
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
      unit: {
        options: {
          reporter: 'spec',
          timeout: 5000,
          require: 'test/helpers/globals.js'
        },
        src: ['test/unit/**/*.spec.js']
      },
      integration: {
        options: {
          reporter: 'spec',
          timeout: 5000,
          require: 'test/helpers/globals.js'
        },
        src: ['test/integration/**/*.spec.js']
      },
      all: {
        options: {
          reporter: 'spec',
          timeout: 5000,
          require: 'test/helpers/globals.js'
        },
        src: ['test/**/*.spec.js']
      }
    },

    versioncheck: {
      target : {
        options: {
          hideUpToDate: true
        }
      }
    }
  })

  grunt.registerTask('format', [
    'standard:format'
  ])

  grunt.registerTask('test', [
    'format',
    'mochaTest:all'
  ])

  grunt.registerTask('test:unit', [
    'mochaTest:unit',
  ])

  grunt.registerTask('test:integration', [
    'mochaTest:integration',
  ])

  grunt.registerTask('start', [
    'concurrent:target1'
  ])

  grunt.registerTask('coverage', [
    'shell:runCoverage'
  ])
}
