import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

const DisplayCountry = ({displaycountry}) => {
    const [ weather, setWeather ] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    useEffect(()=> {
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${displaycountry.name}`
        axios.get(url)
        .then(response => {
          setWeather(response.data.current)
          console.log('weather', response.data.current)
        })
    }, [displaycountry])

    if(displaycountry.name == null){
        return (<div></div>)
    }

    return(
    <div>
        <h1>{displaycountry.name}</h1>
        <p>capital {displaycountry.capital}</p>
        <p>population {displaycountry.population}</p>

        <br />
        <h2>languages</h2>
        <p>{displaycountry.languages.map(language => <li key = {language.name}>{language.name}</li>)}</p>

        <br />
        <img src = {displaycountry.flag} 
            alt = '' 
            style = {{width: 150, height:100}}
        />

        <br />
        <h2>Weather in {displaycountry.capital}</h2>
        <Weather weather = {weather} />
        
    </div>)
}

export default DisplayCountry;