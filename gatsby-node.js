const parseNode = require('./src/lib/parse-node')

exports.sourceNodes = async ({ actions }, configOptions = {}) => {
  const { createNode } = actions
  const { emails = [], query = '' } = configOptions

  emails.forEach(email => createNode(parseNode(email, query)))
}
