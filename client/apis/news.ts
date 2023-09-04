import request from 'superagent'
import * as dotenv from 'dotenv'
import { News } from '../../models/news'

// dotenv.config()

const rootUrl = '/api/v1'

// const apiKey = process.env.newsKey

export async function getAllNews(): Promise<News> {
  const response = await request.get(
    `https://newsapi.org/v2/everything?q=keyword&apiKey=15701971b3874cca84c1d8503edfc8a4`,
  )
  return response.body
}
