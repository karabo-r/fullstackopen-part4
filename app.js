const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config");
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blog')
const UserRouter = require('./controllers/user')

mongoose
.connect(config.MONGO_URI)
.then(console.log("connected to database"));

app.use(cors())
app.use(express.json())
app.use('/api/blogs', BlogRouter)
app.use('/api/users', UserRouter)
app.get('/',(request, response)=>{
    response.send('hello mom')
})

module.exports = app
