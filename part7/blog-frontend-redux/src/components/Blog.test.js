import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import PostForm from './PostForm'

describe('<Blog />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    const blog = {
      likes: 10,
      title: 'testing title 10',
      author: 'test author 10',
      url: 'test10.com',
      date: '2020-05-29T14:27:19.152Z',
      user: {
        username: 'root',
        id: '5ecfc77227b3ff1f48bd1a3c'
      },
      id: '5ed11bc735644d3b70e5be2a'
    }

    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleLike = {mockHandler} />
    )
  })

  test('blog information correctly retrieved and assigned', () => {
    const resultHeader = component.container.querySelector('.postHeader')
    const resultContent = component.container.querySelector('.togglableContent')
    
    expect(resultHeader).toHaveTextContent('testing title 10')
    expect(resultHeader).toHaveTextContent('test author 10')

    expect(resultContent).not.toHaveTextContent('testing title 10')
    expect(resultContent).not.toHaveTextContent('test author 10')
    expect(resultContent).toHaveTextContent('test10.com')
    expect(resultContent).toHaveTextContent('root')
    expect(resultContent).toHaveTextContent('10')
  
  })

  test('post header displayed initially', () => {
    const resultHeader = component.container.querySelector('.postHeader')
    const resultContent = component.container.querySelector('.togglableContent')

    expect(resultHeader).not.toHaveStyle('display: none')
    expect(resultContent).toHaveStyle('display: none')
  })

  test('post header and content displayed after toggle', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const resultHeader = component.container.querySelector('.postHeader')
    const resultContent = component.container.querySelector('.togglableContent')
    expect(resultHeader).not.toHaveStyle('display: none')
    expect(resultContent).not.toHaveStyle('display: none')
  })

  test('clicking the like button', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

describe('<PostForm />', () => {
  test('blog post posted with the correct information in the right fields', () => {
    const mockHandler = jest.fn()
    const component = render(
      <PostForm handleCreateNewPost={mockHandler} />
    )
    
    const form = component.container.querySelector('form')
    const inputList = component.container.querySelectorAll('input')
    fireEvent.change(inputList[0], {
      target: {value: 'test author 1'}
    })
    fireEvent.change(inputList[1], {
      target: {value: 'test title 1'}
    })
    fireEvent.change(inputList[2], {
      target: {value: 'http://testurl1'}
    })
    fireEvent.change(inputList[3], {
      target: {value: 11}
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

    const request = mockHandler.mock.calls[0][0]
    expect(request.author).toBe('test author 1')
    expect(request.title).toBe('test title 1')
    expect(request.url).toBe('http://testurl1')
    expect(request.likes).toBe('11')
  })
})
