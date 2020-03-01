const crypto = require('crypto')

function digest(string) {
  return crypto
    .createHash(`md5`)
    .update(string)
    .digest(`hex`)
}

module.exports = digest
