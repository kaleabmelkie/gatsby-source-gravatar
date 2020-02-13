const crypto = require('crypto')

const digest = string =>
  crypto
    .createHash(`md5`)
    .update(string)
    .digest(`hex`)

const GravatarNode = ({ email, query = null }) => {
  if (!email)
    throw Error(
      `'email' option is required to be a string type in 'gatsby-source-gravatar'.`
    )

  const hash = digest(email)

  const data = {
    url: `https://www.gravatar.com/avatar/${hash}${
      query ? `?${query.replace(/^\?/, '')}` : ``
    }`,

    email,
    hash,
    query
  }

  return {
    ...data,

    // Required fields.
    id: `gravatar-${hash}-${digest(query || '')}`,
    parent: null,
    children: [],
    internal: {
      type: `gravatar`,
      contentDigest: digest(JSON.stringify(data)),
      description: `Gravatar URL for email "${email}" with ${
        query ? 'query "' + query + '"' : 'no queries'
      }.` // Optional.
    }
  }
}

exports.sourceNodes = async ({ actions }, configOptions = {}) => {
  const { createNode } = actions
  const { emails = [], query = '' } = configOptions

  emails.forEach(email => createNode(GravatarNode({ email, query })))
}
