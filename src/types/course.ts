interface IContent {
  URL: string
  contentType: string
  title: string
}

interface IService {
  contentInHours: number
  contents: IContent[]
  description: string
  level: string
  thumbnailURL: string
  title: string
}

export type { IService }
