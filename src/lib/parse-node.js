const md5 = require('md5')
const parseData = require('./parse-data')

const parseNode = (email, query = null) => {
  const data = parseData(email, query)

  return {
    ...data,

    // Required fields.
    id: `gravatar-${data.hash}-${md5(data.query || '')}`,
    parent: null,
    children: [],
    internal: {
      type: `gravatar`,
      contentDigest: md5(JSON.stringify(data)),
      description: `Gravatar URL for email "${data.email}" with ${
        data.query ? 'query "' + data.query + '"' : 'no queries'
      }.`, // Optional.
    },
  }
}

module.exports = parseNode
