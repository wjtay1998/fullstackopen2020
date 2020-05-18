import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setSearch ] = useState('')
  const [ selectCountry, setSelectCountry ] = useState([])   

  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectCountry('')
  }

  const result = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  const handleShow = (event) => {
    setSelectCountry(result[event.target.value])
  }

  const countriesToShow = () => {
    let counter = 0
    
    if(result.length > 10){
      return(<p>Too many matches, specify another filter</p>)
    }else if(result.length === 1){
      return(
        <DisplayCountry displaycountry = {result[0]} />
      )
    }
    else{
      return(result.map(country => <p key = {country.name}> 
      {country.name} <button onClick = {handleShow} value = {counter++}>show </button></p>))
    }

    
  }
  
  return (
    <div>
      <SearchBar newSearch = {newSearch} handleSearch = {handleSearch} />
      {countriesToShow()}
      <DisplayCountry displaycountry = {selectCountry}/>
    </div>
  );

  
}

export default App;
