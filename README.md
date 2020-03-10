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

In `gatsby-config.js`:

```javascript
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

This configuration adds the the generated URLs into Gatsby's GraphQL nodes. This means that, when integrated with libraries like [gatsby-plugin-remote-images](https://npm.im/gatsby-plugin-remote-images), it can be possible to get static Gravatar images that can be processed by [gatsby-image](https://npm.im/gatsby-image).

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

## Dynamic (On-Demand) Querying

Sometimes, we may not know which emails (and with what parameters) to include in `gatsby-config.js` ahead of time. So we can get the parsed URL using a method called `toUrl`:

```typescript
import React, { useMemo } from 'react'
import { toUrl } from 'gatsby-source-gravatar'

function Profile({ email }) {
  const url = useMemo(() => toUrl(email, 'size=128'), [email])

  return <>...</>
}
```

## Exports

- `toUrl`: receives an `email` (and an optional `query`) parameter and responds with an a Gravatar URL.
- `parseNode`: receives an `email` (and an optional `query`) parameter and responds with a Node that can be passed to Gatsby's `createNode` method (this also includes this plugin's generated node data).
- `parseData`: receives an `email` (and an optional `query`) parameter and responds with an object containing the `url`, `email`, `hash` and `query`.
- `digest`: receives a `string` parameter and responds with its MD5 hash string.

## Optimizations

Read up on [this article](https://medium.com/swlh/optimizing-gravatars-in-gatsby-ccf8cf359ccf) to learn how to optimize Gravatars using [gatsby-image](https://www.npm.im/gatsby-image).

## Licence

Made with &hearts; in Addis Ababa.

[MIT License](LICENSE) &copy; 2020 [Kaleab S. Melkie](https://bit.ly/kaleab).
