const PostsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


PostsRouter.get('/', async (request, response) => {
  const posts = await Post
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(posts.map(post => post.toJSON()))
})

PostsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) {
    response.json(post.toJSON())
  } else {
    response.status(404).end()
  }
})

PostsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    date: new Date(),
    user: user.id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost.id)
  await user.save()

  response.json(savedPost.toJSON())
})

PostsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const toRemove = await Post
    .findById(request.params.id)

  if(!(toRemove.user.toString() === user.id.toString())){
    return response.status(401).json({ error: 'deletion of post by non-creator' })
  }

  await Post.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

PostsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    date: new Date(),
  }

  Post.findByIdAndUpdate(request.params.id, post, { new: true })
    .then(updatedPost => {
      response.json(updatedPost.toJSON())
    })
})

module.exports = PostsRouter