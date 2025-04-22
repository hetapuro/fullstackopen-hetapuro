import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1> {text} </h1>
  )
}

const StatisticLine = ({text, counter}) => {

  return (    
    <>
      <tr>
        <td width={60}>{text}</td>
        <td>{counter}</td>
      </tr>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {

  const sum = (a, b, c) => {
    return a + b + c
  }
  const average = (a, b, c) => {
    return (a*1 + b*0 + c*(-1)) / (a + b + c)
  }
  const positive = (a, b, c) => {
    return (a / (a + b + c)) * 100
  }

  if (sum(props.good, props.neutral, props.bad) == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text='Good' counter={props.good}/>
          <StatisticLine text='Neutral' counter={props.neutral}/>
          <StatisticLine text='Bad' counter={props.bad}/>
          <StatisticLine text='All' counter={sum(props.good, props.neutral, props.bad)} />
          <StatisticLine text='Average' counter={average(props.good, props.neutral, props.bad)}/>
          <StatisticLine text='Positive' counter={positive(props.good, props.neutral, props.bad)} />
        </tbody>
      </table>
    )
  }
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Header text="Give feedback" />
      <Button 
        handleClick={goodFeedback}
        text='good'
      />
      <Button 
        handleClick={neutralFeedback}
        text='neutral'
      />
      <Button
        handleClick={badFeedback}
        text='bad'
      />
      <Header text="Statistics" />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App