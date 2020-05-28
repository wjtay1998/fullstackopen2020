// Tests for blog api functions after tokenisation

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Post = require('../models/post')

const bcrypt = require('bcrypt')
const User = require('../models/user')

let token = ''
let validId = null

beforeEach(async () => {
  await User.deleteMany({})
  await Post.deleteMany({})

  var passwordHash = await bcrypt.hash('rootsecret', 10)
  var user = new User({ username: 'root', passwordHash })
  await user.save()

  var passwordHash2 = await bcrypt.hash('root2secret', 10)
  var user2 = new User({ username: 'root2', passwordHash2 })
  await user2.save()

  const login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'rootsecret'
    })

  token = 'bearer ' + login.body.token
  validId = await login.id
})

describe('addition of posts', () => {
  test('successful addition of post by valid user and token', async () => {

    const newPost = {
      title: 'test title 7',
      author: 'test author',
      url: 'testingurl.com',
      likes: 1234,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unsuccessful addition with correct status returned due to invalid token', async () => {
    const newPost = {
      title: 'test title 8',
      author: 'test author',
      url: 'testingurl.com',
      likes: 1234,
    }
    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', token.substring(0,10))
      .expect(401)
  })
})

describe('deletion of a post', () => {
  test('successful deletion of post by creator id and token', async () => {
    const postsAtStart = await helper.postsInDb()

    const newPost = {
      title: 'test title 9',
      author: 'test author',
      url: 'testingurl.com',
      likes: 1234,
    }

    const savedPost = await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', token)

    await api
      .delete(`/api/blogs/${savedPost.body.id}`)
      .set('Authorization', token)
      .expect(204)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(postsAtStart.length)
  })

  test('unsuccessful deletion of post by non-creator token', async () => {
    const postsAtStart = await helper.postsInDb()

    const newPost = {
      title: 'test title 9',
      author: 'test author',
      url: 'testingurl.com',
      likes: 1234,
    }

    const savedPost = await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', token)

    await api
      .delete(`/api/blogs/${savedPost.body.id}`)
      .set('Authorization', token.substring(0,10))
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(postsAtStart.length + 1)
  })

})

afterAll(() => {
  mongoose.connection.close()
})