const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part name={part.name} exercises={part.exercises}/>
      )}
    </>
  )
}

const Part = (parts) => {
  return (
    <p>
      {parts.name} {parts.exercises}
    </p>
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
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App