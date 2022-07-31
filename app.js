const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config");
const errorHandler = require("./utils/errorHandler")
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blog')
const UserRouter = require('./controllers/user');
const LoginRouter = require('./controllers/login')

mongoose
.connect(config.MONGO_URI)
.then(console.log("connected to database"));

app.use(cors())
app.use(express.json())
app.use('/api/blogs', BlogRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)

app.get('/',(request, response)=>{
    response.send('hello mom')
})

app.use(errorHandler)
module.exports = app
