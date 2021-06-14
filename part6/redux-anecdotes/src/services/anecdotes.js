import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const incrementVotes = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/`)
  console.log(response)
}

export default { getAll, createNew, incrementVotes }