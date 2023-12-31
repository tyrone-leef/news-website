import request from 'superagent'
import { News } from '../../models/news'

const rootUrl = '/api/v1'

export async function getAllNews(sort: string, search: string): Promise<News> {
  const response = await request.get(
    `https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`,
  )
  return response.body
}
