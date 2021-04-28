const md5 = require('md5')
const parseData = require('./lib/parse-data')
const parseNode = require('./lib/parse-node')
const toUrl = require('./lib/to-url')

module.exports = {
  digest: md5,
  parseData,
  parseNode,
  toUrl,
}
