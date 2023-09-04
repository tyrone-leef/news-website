import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '../apis/news'

function formatDate(dateString: string) {
  const date = new Date(dateString)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const

  return new Intl.DateTimeFormat('en-GB', options).format(date)
}

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: () => getAllNews(),
  })

  console.log(data)
  return (
    <>
      <h1 className="text-red-700 text-6xl font-bold text-center m-5">News</h1>
      <div className="flex justify-center">
        <p>{isLoading ? <span className="loader"></span> : ''}</p>
        <p>{isError ? 'something went wrong' : ''}</p>
      </div>
      <ul>
        {data &&
          data.articles.map((n, index) => (
            <li key={index}>
              {n.title === '[Removed]' ? (
                ''
              ) : (
                <div className="text-3xl mx-48 my-16 p-16  border-2 border-black flex flex-col justify-center items-center gap-10">
                  <h2 className="text-4xl font-bold hover:text-pink-700">
                    <a href={n.url}>{n.title}</a>
                  </h2>
                  {n.author === null ? (
                    ''
                  ) : (
                    <p>
                      <b>Author: </b>
                      {n.author}
                    </p>
                  )}
                  <p>
                    <b>Description: </b>
                    {n.description}
                  </p>
                  <p>
                    <b>Publish Date: </b>
                    {formatDate(n.publishedAt)}
                  </p>
                  <a className="hover:text-pink-700" href={n.url}>
                    Read more
                  </a>
                  {n.urlToImage === null ? (
                    ''
                  ) : (
                    <img
                      className="h-auto max-w-xl border-2 border-black"
                      src={n.urlToImage}
                      alt="news article"
                    />
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </>
  )
}

export default App
