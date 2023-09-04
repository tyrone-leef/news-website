export interface News {
  articles: Array<{
    author: string
    content: string
    description: string
    publishedAt: string
    title: string
    url: string
    urlToImage: string
  }>
}
