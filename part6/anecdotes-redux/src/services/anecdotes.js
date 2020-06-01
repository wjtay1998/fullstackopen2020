import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async(newContent) => {
  const response = await axios.post(baseUrl, {content: newContent, votes: 0})
  return response.data
}

const votePost = async(id) => {
  const initial = await axios.get(`${baseUrl}/${id}`)
  const body = initial.data
  const update = {...body, votes: body.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, update)
  return response.data
}

export default {
  getAll,
  createNew,
  votePost
}