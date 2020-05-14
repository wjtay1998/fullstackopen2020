import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <div>
      {props.course.name}
    </div>
  )
}

const Content = (props) => {
  const listparts = props.course.parts.map(prop => 
    <Part part = {prop.name} exercises = {prop.exercises} />
  );

  return(
    <div>
      {listparts}
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Total = (props) => {
  let total = 0
  const sumtotal = props.course.parts.map(prop => total += prop.exercises)
  return(
    <div>
      Number of excercises {total}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content course = {course}/>
      <Total course = {course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))