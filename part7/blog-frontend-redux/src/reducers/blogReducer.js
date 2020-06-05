import blogService from '../services/blogs'
import { setNotif, setError } from './notificationReducer'


const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_POST':
    return action.data.sort(byLikes)
  case 'CREATE_POST':
    return [...state, action.data]
  case 'LIKE_POST':
    const liked = action.data
    return state.map(a => a.title === liked.title ? liked : a).sort(byLikes)
  case 'DELETE_POST':
    const deleted = action.data
    const cleaned = state.filter(a => !(a.id === deleted.id))
    return cleaned
  case 'COMMENT_POST':
    const update = action.data
    return state.map(a => a.title === update.title ? update : a)
  default:
    return state
  }
}

export const createPost = (post) => {
  return async dispatch => {
    try{
      const data = await blogService.create(post)
      dispatch({
        type: 'CREATE_POST',
        data
      })
      dispatch(setNotif(`Successfully created ${data.title}`))
    } catch (exception){
      dispatch(setError(`Failed to like ${post.title}`))
    }
  }
}

export const initializeAllPosts = () => {
  return async dispatch => {
    const data = await blogService.getAllPosts()
    dispatch({
      type: 'INIT_POST',
      data
    })

  }
}

export const likePost = (post) => {
  return async dispatch => {
    try {
      const toLike = { ...post, likes: post.likes + 1 }
      const data = await blogService.update(toLike)
      dispatch({
        type: 'LIKE_POST',
        data
      })
      dispatch(setNotif(`Successfully liked ${post.title}`))
    } catch (exception){
      dispatch(setError(`Failed to like ${post.title}`))
    }
    
  }
}

export const commentPost = (post, newComment) => {
  return async dispatch => {
    try {
      console.log('post', newComment)
      const toComment = {...post}
      if(!toComment.comment){
        toComment.comment = []
      }
      toComment.comment.push(newComment)
      console.log('toComment', toComment)
      const data = await blogService.update(toComment)
      dispatch({
        type: 'COMMENT_POST',
        data
      })
      dispatch(setNotif(`Successfully added comment '${newComment}' to ${post.title}`))
    } catch (exception){
      dispatch(setError(`Failed to add comment to ${post.title}`))
    }
    
  }
}

export const deletePost = (data) => {
  return async dispatch => {
    try{
      await blogService.remove(data)
      dispatch({
        type: 'DELETE_POST',
        data
      })
      dispatch(setNotif(`Successfully deleted ${data.title}`))
    } catch (exception){
      dispatch(setError(`Failed to delete ${data.title}`))
    }
  }
}

export default blogReducer