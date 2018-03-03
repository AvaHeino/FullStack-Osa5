import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const clickFunction = () => {
	return() => {
		console.log('blog was liked!')
	}
		
}

describe.only('<SimpleBlog />', () => {
	it('renders title,author and likes', () => {
		const blog = {
			title: 'Blogien testaus kaytannossa',
			author: 'Jon Doe',
			likes: '10',
		}

		const blogComponent = shallow(<SimpleBlog blog={blog} onClick={clickFunction} />)
		const titleDiv = blogComponent.find('.title')

		expect(titleDiv.text()).toContain(blog.title)
		expect(titleDiv.text()).toContain(blog.author)

		const likeDiv = blogComponent.find('.likes')
		expect(likeDiv.text()).toContain(blog.likes)
	})

	it('When the like button is pressed twice, two calls are made', () => {
		const blog = {
			title: 'Blogien testaus kaytannossa',
			author: 'Jon Doe',
			likes: '10',
		}
		const mockHandler = jest.fn()
		const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

		const button = blogComponent.find('button')
		button.simulate('click')
		button.simulate('click')

		expect(mockHandler.mock.calls.length).toBe(2)

		


	})

})