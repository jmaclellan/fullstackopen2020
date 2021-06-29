import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const result = await axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        setCountry({data: result.data[0], found: true})
      } catch (error) {
        setCountry({found: false})
      }
    }
    getCountry()
  }, [name])

  return country
}