const digest = require('./digest')
const parseData = require('./parse-data')

const parseNode = (email, query = null) => {
  const data = parseData(email, query)

  return {
    ...data,

    // Required fields.
    id: `gravatar-${data.hash}-${digest(data.query || '')}`,
    parent: null,
    children: [],
    internal: {
      type: `gravatar`,
      contentDigest: digest(JSON.stringify(data)),
      description: `Gravatar URL for email "${data.email}" with ${
        data.query ? 'query "' + data.query + '"' : 'no queries'
      }.` // Optional.
    }
  }
}

module.exports = parseNode
