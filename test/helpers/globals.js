var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var request = require('supertest-as-promised')
var sinon = require('sinon')
require('sinon-mongoose')
require('sinon-as-promised')
var server = require('../../src/server.js')

// Chai
chai.config.includeStack = true
chai.should()
chai.use(chaiAsPromised)
global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert

// Sinon
global.sinon = sinon

// Supertest
global.request = request

// server.js
global.serverTest = server
