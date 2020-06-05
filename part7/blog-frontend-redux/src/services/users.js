import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getSpecificUser = async (user) => {
  const response = await axios.get(`${baseUrl}/${user.id}`)
  return response.data
}

export default { getAllUsers, getSpecificUser}


