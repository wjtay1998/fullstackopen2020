const listHelper = require('../utils/list_helper')

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },

  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },

  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },

  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },

  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },

  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(listWithManyBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list only has one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })

})

describe('favourite blog', () => {
  test('of empty list returns null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(null)
  })

  test('when list only has one blog it is the favourite blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)

    const expected = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    expect(result).toEqual(expected)
  })

  test('of a bigger list returns the most liked blog', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)

    const expected = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }

    expect(result).toEqual(expected)
  })


})

describe('most blogs', () => {
  test('list with no blogs', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('list with 1 blog to return the only blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    expect(result).toEqual(expected)
  })

  test('list with many blogs to return author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(result).toEqual(expected)
  })
})

describe('most likes', () => {
  test('list with no blogs', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('list with 1 blog to return the only author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    expect(result).toEqual(expected)
  })

  test('list with many blogs to return author with most blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(result).toEqual(expected)
  })
})

