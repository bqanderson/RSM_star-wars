import React, { useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import CharacterList from './CharacterList'
import endpoint from './endpoint'

import './styles.scss'

const initialState = {
  result: null,
  loading: true,
  error: null,
}

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        result: null,
        loading: true,
        error: null,
      }

    case 'RESPONSE_COMPLETE':
      return {
        result: action.payload.response,
        loading: false,
        error: null,
      }

    case 'ERROR':
      return {
        result: null,
        loading: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}

const useFetch = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'LOADING' })

    const fetchUrl = async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } })
      } catch (error) {
        dispatch({ type: 'ERROR', payload: { error } })
      }
    }

    fetchUrl()
  }, [])

  return [state.result, state.loading, state.error]
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
