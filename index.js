const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(`${config.MONGO_URI}`).then(console.log('connected'))

app.use(cors())
app.use(express.json())

app.get('/',(request, response)=>{
    response.send('hello mom')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      console.log('blog has been saved');
    })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})