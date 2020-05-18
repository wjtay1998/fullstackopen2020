import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = (props) => {
    const total = props.course.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    },0)

    return(
        <div>
        <br />
        <Header name = {props.course.name} />
        <Content parts = {props.course.parts} />

        <b>
            total of {total} exercises
        </b>
        </div>
    )
}

export default Course;