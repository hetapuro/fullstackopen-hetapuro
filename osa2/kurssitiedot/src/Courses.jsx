import React from 'react'

const Courses = ({courses}) => {

    return (
     <ul>
       {courses.map(course => <Course key ={course.id} course={course}/>)}
     </ul>
    )
  }
  
  const Course = ({course}) => {
  
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }
  
  const Header = (props) => {
  
    return (
      <>
        <h1>{props.name}</h1>
      </>
    )
  }
  
  const Content = ({parts}) => {
  
    return (
        <ul>
          {parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )}
        </ul>
    )
  }
  
  const Part = (parts) => {
  
    return (
      <li>
        {parts.name} {parts.exercises}
      </li>
    )
  }
  
  const Total = ({parts}) => {
    var amount = parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
  
    return (
      <div>
        <p>
          Number of exercises {amount}
        </p>
      </div>
    )
  }

  export default Courses