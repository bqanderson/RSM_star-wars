import React from 'react'

const CharacterSearch = () => {
  return (
    <input
      onChange={e => console.log(e.target.value)}
      placeholder='Search Here'
      type='search'
      value={''}
    />
  )
}

export default CharacterSearch
