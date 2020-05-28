// Tests for blog_api before tokenisation

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

describe('initial db setup tests', () => {
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
})


describe('viewing a specific post', () => {
  test('succeeds with a valid id', async () => {
    const postsAtStart = await helper.postsInDb()

    const postToView = postsAtStart[0]

    const resultPost = await api
      .get(`/api/blogs/${postToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultPost.body).toEqual(postToView)
  })

  test('fails with statuscode 404 if post does not exist', async () => {
    const invalidId = await helper.nonExistingId()
    console.log(invalidId)
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(404)

  })

  test('fails with statuscode 400 if id is an invalid id', async () => {
    const invalidId = '12345'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)

  })

})

describe('additon of a new post', () => {
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

  test('likes defaults to 0 if value is mssing', async () => {
    const newValidPost = {
      title: 'a newValidPost was added',
      author: 'test author',
      url: 'https://testingurl.com/',
    }

    await api
      .post('/api/blogs')
      .send(newValidPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)

    const contents = postsAtEnd.map(p => p.likes)
    expect(contents).toContain(
      0
    )
  })

  test('fails with status code 400 if title is empty', async () => {
    const newInvalidPost = {
      title: '',
      author: 'test author',
      url: 'https://testingurl.com/',
      likes: 999,
    }

    await api
      .post('/api/blogs')
      .send(newInvalidPost)
      .expect(400)
  })

  test('fails with status code 400 if url is empty', async () => {
    const newInvalidPost = {
      title: 'testing title',
      author: 'testing author',
      url: '',
      likes: 999,
    }

    await api
      .post('/api/blogs')
      .send(newInvalidPost)
      .expect(400)
  })

})

describe('deletion of a post', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const postsAtStart = await helper.postsInDb()

    const postToDelete = postsAtStart[0]

    await api
      .delete(`/api/blogs/${postToDelete.id}`)
      .expect(204)
  })
})

describe('updating of a post', () => {
  test('succeeds with likes updated', async () => {
    const postsAtStart = await helper.postsInDb()

    const postToUpdate = postsAtStart[0]
    postToUpdate.likes = 111

    const postUpdated = await api
      .put(`/api/blogs/${postToUpdate.id}`)
      .send(postToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(postUpdated.body.likes).toEqual(111)
  })
})


afterAll(() => {
  mongoose.connection.close()
})