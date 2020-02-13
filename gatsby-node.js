const crypto = require('crypto')

const digest = string =>
  crypto
    .createHash(`md5`)
    .update(string)
    .digest(`hex`)

const GravatarNode = ({ email: _email, _query = null }) => {
  if (
    !(
      typeof _email === 'string' ||
      (typeof _email === 'object' && typeof _email.email === 'string')
    )
  )
    throw Error(`'email' is required in 'gatsby-source-gravatar'.`)

  const email = typeof _email === 'string' ? _email : _email.email
  const hash = digest(email)
  const query = typeof _email === 'object' ? _email.query : _query || null

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
