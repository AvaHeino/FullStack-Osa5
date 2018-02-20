const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => {
    console.log('conneted to database', process.env.MONGODB_URI)
  })
  .catch (err => {
    console.log(err)
  })

  mongoose.Promise = global.Promise

/*app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})*/

/*app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error=> {
      console.log(error)
      response.status(404).end()
    })
})*/

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})