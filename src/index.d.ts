type DataType = {
  url: string
  email: string
  hash: string
  query: string | null
}

type NodeType = DataType & {
  id: string
  parent: null
  children: []
  internal: {
    type: string
    contentDigest: string
    description: string
  }
}

declare namespace GatsbySourceGravatar {
  export const digest: (string: string) => string
  export const parseData: (email: string, query?: string | null) => DataType
  export const parseNode: (email: string, query?: string | null) => NodeType
  export const toUrl: (email: string, query?: string | null) => string
}

export = GatsbySourceGravatar
