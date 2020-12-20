const Blog = require('../models/blog')

const dummy = () => 1

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'joe schmoe',
    url: 'website.com',
    likes: 3,
  },
  {
    title: 'test blog 2',
    author: 'jack johnson',
    url: 'random.com',
    likes: 5,
  },
]

const totalLikes = blogs => {
  let likes = 0
  for (let i = 0; i < blogs.length; i++) {
    const current = blogs[i]
    likes += current.likes
  }
  return likes
}

module.exports = { dummy, totalLikes, initialBlogs }
