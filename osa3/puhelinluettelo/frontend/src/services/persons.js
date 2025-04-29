import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, changedObject) => {
    return axios.put(`${baseUrl}/${id}`, changedObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
} 

export default { 
  getAll: getAll, 
  create: create,
  update: update,
  deletePerson: deletePerson
}