import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return(
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if(good + neutral + bad === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table><tbody>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={good + neutral + bad} />
      <Statistic text="average" value ={(good - bad)/(good + neutral + bad)} />
      <Statistic text="positive" value ={(good)/(good + neutral + bad)*100 + '%'} />
      </tbody></table>
    </div>
  )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick = {handleGoodClick} text = 'good' />
      <Button handleClick = {handleNeutralClick} text = 'neutral' />
      <Button handleClick = {handleBadClick} text = 'bad' />

      <h1> statistics </h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)