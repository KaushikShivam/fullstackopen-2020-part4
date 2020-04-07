const listHelper = require('../utils/list_helper')

// Exported these 2 variables out of the first describe to reuse it
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const listWithMultipleBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.blog1.com',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Title 2',
    author: 'Author 2',
    url: 'www.blog2.com',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Title 3',
    author: 'Author 3',
    url: 'www.blog3.com',
    likes: 15,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Title 4',
    author: 'Author 4',
    url: 'www.blog4.com',
    likes: 20,
    __v: 0,
  },
]

const blogsWithMultipleAuthors = [
  {
    title: 'Title 4',
    author: 'Author 4',
    url: 'www.blog4.com',
    likes: 30,
    __v: 0,
  },
  {
    title: 'Title 4',
    author: 'Author 4',
    url: 'www.blog4.com',
    likes: 20,
    __v: 0,
  },
  {
    title: 'Title 3',
    author: 'Author 3',
    url: 'www.blog3.com',
    likes: 20,
    __v: 0,
  },
  {
    title: 'Title 3',
    author: 'Author 3',
    url: 'www.blog3.com',
    likes: 20,
    __v: 0,
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'www.blog2.com',
    likes: 20,
    __v: 0,
  },
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.blog1.com',
    likes: 10,
    __v: 0,
  },
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.blog1.com',
    likes: 10,
    __v: 0,
  },
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.blog1.com',
    likes: 10,
    __v: 0,
  },
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.blog1.com',
    likes: 10,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlog)
    expect(result).toBe(50)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toBeUndefined()
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    })
  })

  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Title 4',
      author: 'Author 4',
      url: 'www.blog4.com',
      likes: 20,
      __v: 0,
    })
    expect(result.likes).toBe(20)
  })
})

describe('Most Blogs', () => {
  test('with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', count: 1 })
  })

  test('with multiple blogs', () => {
    const result = listHelper.mostBlogs(blogsWithMultipleAuthors)
    expect(result).toEqual({ author: 'Author 1', count: 4 })
  })
})

describe('Most Likes', () => {
  test('with 1 blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('with multiple blogs', () => {
    const result = listHelper.mostLikes(blogsWithMultipleAuthors)
    expect(result).toEqual({
      author: 'Author 4',
      likes: 50,
    })
  })
})
