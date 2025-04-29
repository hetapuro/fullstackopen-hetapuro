import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = (props) => {
  return (
    <div>
      Find countries <input value={props.show} onChange={props.handleShowChange}/>
    </div>
  )
}

const Countries = ({countries, handleShowCountry}) => {
  if (countries.length > 10) 
    return <div>Too many matches, specify another filter</div>
  else {
    if (countries.length === 1) {
      return (
        <Country country={countries[0]} />
      )
    }
    else {
      return (
        <ul>
          {countries.map(country =>
            <li key={country.name.common}>{country.name.common} <button onClick={() => handleShowCountry(country)} type="button">Show</button></li>
          )}
        </ul>
      )
    }
  }
}

const Country = ({country}) => {
  const languages = Object.values(country.languages)
  console.log(languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <ul>
        <li>Capital {country.capital}</li>
        <li>Area {country.area}</li>
      </ul>
      <h3>Languages</h3>
      <ul>
        {languages.map(lan =>
          <li key={lan}>{lan}</li>
        )}
      </ul>
      <img src={country.flags.svg} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [show, setShow] = useState('')

  useEffect(() => {
    console.log('effect')
    countryService
      .getAll()
      .then(response => {
        console.log(response.data)
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleShowCountry = (country) => {
    setCountry(country)
  }

  const handleShowChange = (event) => {
    setShow(event.target.value)
  }

  const countriesToShow = show === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(show.toLowerCase()))

  return (
    <div>
      <Filter show={show} handleShowChange={handleShowChange} />
      <Countries countries={countriesToShow} handleShowCountry={handleShowCountry}/>
      {country != null &&
        <Country country={country} />
      }
    </div>
  )
}

export default App
