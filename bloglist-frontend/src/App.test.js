import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
jest.mock('./services/login')
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'


describe('<App />', () => {
	let app 
	beforeAll(() => {
		app = mount(<App />)
		console.log(app.debug())
	})

	it('When user is not logged it, the login form is displayyed', () => {
		app.update()
		const loginForm = app.find('.kirjaudu')
		expect(loginForm.text()).toContain('Kirjaudu')

	})
})