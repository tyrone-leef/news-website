import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '../apis/news'

function App() {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: () => getAllNews(),
  })
  console.log(data)
  return (
    <>
      <h1 className="text-red-700 text-6xl font-bold text-center m-5">News</h1>
      <ul>
        {data &&
          data.articles.map((n, index) => (
            <li key={index}>
              <div className="text-3xl mx-48 my-16 p-16  border-2 border-black flex flex-col justify-center items-center gap-10">
                <h2 className="text-4xl font-bold hover:text-pink-700">
                  <a href={n.url}>{n.title}</a>
                </h2>
                <p>
                  <b>Author: </b>
                  {n.author}
                </p>
                <p>
                  <b>Description: </b>
                  {n.description}
                </p>
                <p>
                  <b>Publish Date: </b>
                  {n.publishedAt}
                </p>
                <a className="hover:text-pink-700" href={n.url}>
                  Read more
                </a>
                <img
                  className="h-auto max-w-xl border-2 border-black"
                  src={n.urlToImage}
                  alt="news-related"
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}

export default App
