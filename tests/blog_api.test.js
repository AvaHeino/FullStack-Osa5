const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { formatBlog, testBlogs, blogsInDb, usersInDb } = require('./test_helpers')

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

describe.only('when there is initially one user at db', async () => {
	beforeAll(async () => {
		await User.remove({})
		const user = new User({ 
			username: 'root',
			name: 'Jane Doe',
			password: 'secret',
			adult: true
		})
		await user.save()
	})


	test('POST /api/users succeeds with a new username', async () => {
		const usersBeforeOperation = await usersInDb()

		const newUser = {
			username: 'testUser',
			name: 'John Doe',
			password: 'testSecret',
			adult: false
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type',/application\/json/)

		const usersAfterOperation = await usersInDb()
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
		const usernames = usersAfterOperation.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('POST api/users fails with proper statuscode and message if username is already taken', async () => {
		const usersBeforeOperation = await usersInDb()

		const newUser = {
			username: 'root',
			name: 'Lisa Anonym',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body).toEqual({ error: 'username must be unique'})

		const usersAfterOperation = await usersInDb()
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
	})

	test('POST api/users fails with proper statuscode and message if password is too short', async () => {
		const usersBeforeOperation = await usersInDb()

		const newUser = {
			username: 'passwordGuy',
			name: 'Matti Matikainen',
			password: 'aa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type, /application\/json/')

		expect(result.body).toEqual({error: 'Password must be at least 3 characters long'})

		const usersAfterOperation = await usersInDb()
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
	})
})


afterAll(()=> {
	server.close()
})