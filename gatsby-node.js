const createNodeHelpers = require('gatsby-node-helpers').default
const crypto = require('crypto')

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: `Gravatar`
})

const GravatarNode = createNodeFactory(``, node => {
  if (node.email) {
    const hash = crypto
      .createHash(`md5`)
      .update(node.email)
      .digest(`hex`)

    node.id = generateNodeId(node.__typename, hash)
    node.hash = hash
    node.url = `https://www.gravatar.com/avatar/${hash}${
      node.query ? `?${node.query.replace(/^\?/, '')}` : ``
    }`
  }

  return node
})

exports.sourceNodes = async ({ actions }, configOptions = {}) => {
  const { createNode } = actions
  const { emails = [], query = '' } = configOptions

  emails.forEach(email => createNode(GravatarNode({ email, query })))
}
