import React, { useReducer, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import isFunction from 'lodash/isFunction'

import CharacterList from './CharacterList'
import CharacterView from './CharacterView'
import endpoint from './endpoint'

import './styles.scss'

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        characters: [],
        loading: true,
        error: null,
      }

    case 'RESPONSE_COMPLETE':
      return {
        characters: action.payload.characters,
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

const fetchCharacters = dispatch => {
  dispatch({ type: 'LOADING' })
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      })
    )
    .catch(error => dispatch({ type: 'ERROR', payload: { error } }))
}

const initialState = {
  error: null,
  loading: false,
  characters: [],
}

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enhancedDispatch = useCallback(
    action => {
      console.log(action)

      if (isFunction(action)) {
        action(dispatch)
      } else {
        dispatch(action)
      }
    },
    [dispatch]
  )

  return [state, enhancedDispatch]
}

const App = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)
  const { characters } = state

  useEffect(() => {
    dispatch(dispatch => {})
  }, [dispatch])

  return (
    <div className='Application'>
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className='sidebar'>
          <button onClick={() => dispatch(fetchCharacters)}>Fetch Characters</button>
          <CharacterList characters={characters} />
        </section>
        <section className='CharacterView'>
          <Route path='/characters/:id' component={CharacterView} />
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
