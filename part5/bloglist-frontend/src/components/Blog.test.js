import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    url: 'test.com',
    title: 'My Sample Blog',
    author: 'Albert Einstein',
    likes: 500,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'My Sample Blog'
  )
})