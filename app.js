const express = require('express')
const app = express()
const cors = require('cors')
const BlogRouter = require('./controllers/blog')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', BlogRouter)

app.get('/',(request, response)=>{
    response.send('hello mom')
})

module.exports = app
