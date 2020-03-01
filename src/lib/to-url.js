const parseData = require('./parse-data')

function toUrl(email, query = null) {
  return parseData(email, query).url
}

module.exports = toUrl
