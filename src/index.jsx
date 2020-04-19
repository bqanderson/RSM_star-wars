import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import endpoint from './endpoint'

import './styles.scss'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        characters: [],
        loading: true,
        error: null,
      }

    case 'RESPONSE_COMPLETE':
      return {
        characters: action.payload.charcters,
        loading: false,
        error: null,
      }

    case 'ERROR':
      return {
        characters: [],
        loading: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}

const initialState = {
  result: null,
  loading: true,
  error: null,
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { characters } = state

  return (
    <div className='Application'>
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className='sidebar'>
          <button onClick={() => {}}>Fetch Characters</button>
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
