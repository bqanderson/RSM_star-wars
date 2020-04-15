import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import endpoint from './endpoint'

import './styles.scss'

const App = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setCharacters([])
    setError(null)

    fetch(endpoint + '/characters')
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        setCharacters(res.characters)
      })
      .catch(err => {
        setLoading(false)
        setError(err)
      })
  }, [])

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
