const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Post = require('../models/post')

beforeEach(async () => {
  await Post.deleteMany({})

  const postObjects = helper.initialPosts
    .map(post => new Post(post))
  const promiseArray = postObjects.map(post => post.save())
  await Promise.all(promiseArray)
})

test('posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('post _id are returned as id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('all posts are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialPosts.length)
})

test('a specific post is within the returned posts', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'React patterns'
  )
})

// describe('viewing a specific note', () => {
//   test('succeeds with a valid id', async () => {
//     const response = await api.get(`/api/blogs/${helper.validId}`)
//     console.log('response', response.body)
//     expect(response.body[0].title).toContain(
//       'willremovethissoon'
//     )
//   })


// })

test('a valid post can be added ', async () => {
  const newValidPost = {
    title: 'a newValidPost was added',
    author: 'test author',
    url: 'https://testingurl.com/',
    likes: 999,
  }

  await api
    .post('/api/blogs')
    .send(newValidPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)

  const contents = postsAtEnd.map(p => p.title)
  expect(contents).toContain(
    'a newValidPost was added'
  )
})

afterAll(() => {
  mongoose.connection.close()
})