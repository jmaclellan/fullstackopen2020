import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: {Authorization: `bearer ${storage.loadUser().token}`}
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = blog => {
  const response = axios.post(baseUrl, blog, getConfig())
  return response.then(response => response.data)
}

const update = blog => {
  const request = axios.put(`${baseUrl}/${id}`, blog, getConfig())
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const comment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, comment}