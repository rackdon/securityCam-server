var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var request = require('supertest')
var server = require('../../src/server.js')

chai.config.includeStack = true

chai.should()
chai.use(chaiAsPromised)
global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert

global.request = request

global.serverTest = server
