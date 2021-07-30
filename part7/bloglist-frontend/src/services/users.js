import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/users')
  return request.then(response => response.data)
}

export default { getAll }