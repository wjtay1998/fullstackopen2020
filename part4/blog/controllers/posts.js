const PostsRouter = require('express').Router()
const Post = require('../models/post')

PostsRouter.get('/', (request, response) => {
  Post.find({}).then(posts => {
    response.json(posts.map(post => post.toJSON()))
  })
})

PostsRouter.get('/:id', async (request, response) => {
  // Post.findById(request.params.id)
  //   .then(post => {
  //     if (post) {
  //       response.json(post.toJSON())
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
  const post = await Post.findById(request.params.id)
  if (post) {
    response.json(post.toJSON())
  } else {
    response.status(404).end()
  }
})

PostsRouter.post('/', async (request, response) => {
  const body = request.body

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    date: new Date(),
  })

  const savedPost = await post.save()
  response.json(savedPost.toJSON())
})

PostsRouter.delete('/:id', (request, response, next) => {
  Post.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

PostsRouter.put('/:id', (request, response, next) => {
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
    .catch(error => next(error))
})

module.exports = PostsRouter