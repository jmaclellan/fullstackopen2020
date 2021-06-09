import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Blog component renders correctly', () => {
  const blog = {
    url: 'test.com',
    title: 'My Sample Blog',
    author: 'Albert Einstein',
    like: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.likes)
  expect(component.container).not.toHaveTextContent(blog.url)
})

test('renders url and likes when expanded', () => {
  const blog = {
    url: 'test.com',
    title: 'My Sample Blog',
    author: 'Albert Einstein',
    like: 0,
    user: {
      name: 'Jack Black'
    }
  }

  const component = render(
    <Blog blog={blog} {...other} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
})

test('when liked twice, the event handler gets called twice', () => {
  const blog = {
    url: 'test.com',
    title: 'My Sample Blog',
    author: 'Albert Einstein',
    like: 0,
    user: {
      name: 'Jack Black'
    }
  }

  other.handleLike = jest.fn()

  const component = render(
    <Blog blog={blog} {...other} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(other.handleLike.mock.calls.length).toBe(2)
})