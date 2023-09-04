import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '../apis/news'
import { useState } from 'react'

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
  const sortArr = ['relevancy', 'popularity', 'publishedAt']
  const [sort, setSort] = useState(sortArr[0])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', sort],
    queryFn: () => getAllNews(sort),
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value
    setSort(selectedSort)
  }

  console.log(data)
  return (
    <>
      <h1 className="text-red-700 text-6xl font-bold text-center m-5">News</h1>
      <div className="flex flex-col mx-20 w-40">
        <label
          htmlFor="sort"
          className="block mb-2 text-lg text-gray-900 font-medium"
        >
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={handleChange}
          className="border border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          {sortArr &&
            sortArr.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>
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
