const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
	return {
		id: blog._id,
		title: blog.title,
  	author: blog.author,
  	url: blog.url,
  	likes: blog.likes
	}
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error:'Something went wrong'})

  }
})

blogsRouter.post('/', async  (request, response) => {
  try {
    const body = request.body

    if (body.title === undefined || body.url === undefined){
      return response.status(400).json({error: 'Title or url missing!'})
    }

    const blog = new Blog ({
      title: body.title,
      author: body.author, 
      url: body.url,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.json(formatBlog(savedBlog))
  
} catch (exception) {
  console.log(exception)
  response.status(400).send({error: 'Something went wrong'})
}
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'Something went wrong' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author, 
      url: body.url,
      likes: body.likes || 0
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true} )
    response.status(200).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'Something went wrong' })
  }
})

module.exports = blogsRouter