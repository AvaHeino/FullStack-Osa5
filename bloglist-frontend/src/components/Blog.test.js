import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const likeFunction = () => {
	return() => {
		console.log('blog was liked!')
	}
		
}

const removeFunction = () => {
	return() => {
		console.log('blog was removed!')
	}
		
}

describe.only('<Blog />', () => {
	it('after clicking name the details are displayed', () => {
	const title='Testing Interfaces 2.0'
	const author = 'John Doe'
	const url = 'www.thefullstacklife.fi'
	const user = 'John Doe'
	const likes = 1
	const blogTitleComponent = shallow(<Blog
		title={title}
		author={author}
		url= {url}
		likes={likes}
		addLike={likeFunction}
		remove={removeFunction}
		user= {user}
		id= '12345ABC'
		/>
		)
	const nameDiv = blogTitleComponent.find('.title')
	expect(nameDiv.text()).toContain(title)
	expect(nameDiv.text()).toContain(author)

	nameDiv.simulate('click')

	const detailDiv = blogTitleComponent.find('.details')
	expect(detailDiv.text()).toContain(url)
	expect(detailDiv.text()).toContain(user)
	expect(detailDiv.text()).toContain(likes)

	})
})