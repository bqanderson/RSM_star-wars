import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import dummyData from './dummy-data'

import './styles.scss'

const App = () => {
  const [characters, setCharacters] = useState(dummyData)

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
