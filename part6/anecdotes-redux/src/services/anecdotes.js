import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async(newContent) => {
  const response = await axios.post(baseUrl, {content: newContent, votes: 0})
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  createNew
}