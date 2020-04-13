import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import endpoint from './endpoint'

import './styles.scss'

const App = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch(endpoint + '/characters')
      .then(res => res.json())
      .then(res => {
        setCharacters(res.characters)
      })
      .catch(console.error)
  }, [])

  return (
    <div className='Application'>
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className='sidebar'>
          <CharacterList characters={characters} />
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
