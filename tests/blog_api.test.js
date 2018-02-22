const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { formatBlog, testBlogs, blogsInDb } = require('./test_helpers')

describe('When there is initially some blogs saved', async () => {
	beforeAll(async () => {
		await Blog.remove({})

		const blogObjects = testBlogs.map(blog => new Blog(blog))
		const promiseArray = blogObjects.map(blog => blog.save())

		await Promise.all(promiseArray)
	})

	test('all blogs are returned', async () => {
		const blogsInDatabase = await blogsInDb()

		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)


		expect(response.body.length).toBe(blogsInDatabase.length)

		const returnedTitles = response.body.map(b => b.title)
		blogsInDatabase.forEach(blog => {
			expect(returnedTitles).toContain(blog.title)
		})
	})
})

describe('Adding a new blog', async () => {
	test('A blog can be added', async () => {
	const blogsAtStart = await blogsInDb()

	//create data for a new blog object
		const newBlog = {
			title: "Programming is fun",
    		author: "Juuso Makikokkila",
    		url: "https://funthingstodo.com/",
    		likes: 100
		}

	//post new blog object to the test database
		await api 
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

	const blogsAfterOperation = await blogsInDb()

	expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
	const titles = blogsAfterOperation.map(b => b.title)
	expect(titles).toContain("Programming is fun")
	
	})

	test('If a blog is added without likes, the likes will be 0', async () => {
	//create a new blog object without likes 
		const newBlog = {
			title: "Blog about cats",
			author: "Miika Kivinen",
			url: "www.cutecats.org"
		}


	//add the blog to the test database
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)

	//find the added blog and check that the likes are set to 0
		const addedBlog = await Blog.find({title: newBlog.title})
		console.log(addedBlog)
		expect(addedBlog[0].likes).toBe(0)

	})

	test('If a blog is added without a url, the response code will be 400', async () => {
		const newBlog = {
			title: 'Blog without URL',
			author: 'Mila McDonald',
			likes: 1
		}

		const blogsAtStart = await blogsInDb()

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAfterOperation = await blogsInDb()

		expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
	})

	test('If a blog is added without a title, the response code will be 400', async () => {
		const newBlog = {
			author: 'Mila mcDonald',
			url: 'www.milagotafarmhouse.org',
			likes: 1000
		}

		const blogsAtStart = await blogsInDb()

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAfterOperation = await blogsInDb()

		expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

	})
 })


afterAll(()=> {
	server.close()
})