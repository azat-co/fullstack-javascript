const http = require('http')
const assert = require('assert')
const querystring = require('querystring')
const util = require('util')

const messageBoard = require('./mb-server')

assert.deepEqual('[{"name":"John","message":"hi"}]',
  messageBoard.getMessages())
assert.deepEqual('{"name":"Jake","message":"gogo"}',
  messageBoard.addMessage("name=Jake&message=gogo"))
assert.deepEqual('[{"name":"John","message":"hi"},{"name":"Jake","message":"gogo"}]',
  messageBoard.getMessages())
