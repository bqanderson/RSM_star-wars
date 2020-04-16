import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import endpoint from './endpoint'

import './styles.scss'

const useFetch = url => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setResponse(null)
    setError(null)

    const fetchUrl = async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setResponse(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUrl()
  }, [])

  return [response, loading, error]
}

const App = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters')
  const characters = (response && response.characters) || []

  return (
    <div className='Application'>
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className='sidebar'>
          {loading ? <p>Loading...</p> : <CharacterList characters={characters} />}
          {error && <p className='eror'>{error.message}</p>}
        </section>
      </main>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
