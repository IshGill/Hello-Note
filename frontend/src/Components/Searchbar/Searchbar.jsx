import React from 'react'
import "./Searchbar.css"
import {FaSearch} from 'react-icons/fa'

const Searchbar = () => {

  return (
    <div >
      <form className='searchBar'>
        <input className='searchBarInput' type={'text'} placeholder="Search..."/>
        <button className='searchBarSubmit' type='submit'><FaSearch/></button>
      </form>
    </div>
  )
}

export default Searchbar