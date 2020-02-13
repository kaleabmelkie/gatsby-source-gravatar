# gatsby-source-gravatar

[![gatsby-source-gravatar](https://img.shields.io/npm/v/gatsby-source-gravatar.png?style=flat-square)](https://www.npmjs.org/package/gatsby-source-gravatar)
[![npm downloads](https://img.shields.io/npm/dm/gatsby-source-gravatar.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-source-gravatar)
[![npm](https://img.shields.io/npm/dt/gatsby-source-gravatar.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-source-gravatar)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Gatsby plugin to source Gravatar URLs from emails.

## Install

```bash
yarn add gatsby-source-gravatar

# npm install --save gatsby-source-gravatar
```

## How to Configure

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-gravatar`,
      options: {
        // Required.
        // A list of emails to create URLs for.
        emails: [
          // Could be just a strings,
          `first@example.com`,
          // Or an object, to pass an optional gravatar `query` parameter per email (see below).
          { email: `second@example.com`, query: `?size=128` }
        ]

        // Optional.
        // No query string is passed to gravatar by default.
        // But you can add your gravatar query parameters here.
        // See https://en.gravatar.com/site/implement/images/
        // If this is set, it will be the default for `emails` (see above) with no `query` options.
        query: `?size=64&m=dp`
      }
    }
  ]
}
```

## How to Query

To get the Gravatar URL for one of the configured emails:

```graphql
{
  gravatar(email: { eq: "first@example.com" }) {
    url
  }
}
```

To get all Gravatar URLs:

```graphql
{
  allGravatar {
    edges {
      node {
        url

        # also, available are:
        email
        hash
        query
      }
    }
  }
}
```

## Licence

Made with &hearts; in Addis Ababa.

[MIT License](LICENSE) &copy; 2020 [Kaleab S. Melkie](https://bit.ly/kaleab).
