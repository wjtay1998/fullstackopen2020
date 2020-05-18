import React from 'react'

const Weather = ({weather}) => {
    if(weather != null){
        return (
            <div>
                {console.log('print', weather.weather_icons ? weather.weather_icons[0] : null)}
                <p><b>temperature</b> {weather.temperature}</p>
                <img src={weather.weather_icons ? weather.weather_icons[0] : null} alt='' />
                <p><b>wind {weather.wind_speed}</b></p>
            </div>
        )
    }else{
        return (<div></div>)
    }
}

export default Weather