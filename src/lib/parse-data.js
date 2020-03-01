const digest = require('./digest')

function parseData(_email, _query = null) {
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

  return {
    url: `https://www.gravatar.com/avatar/${hash}${
      query ? `?${query.replace(/^\?/, '')}` : ``
    }`,

    email,
    hash,
    query
  }
}

module.exports = parseData
