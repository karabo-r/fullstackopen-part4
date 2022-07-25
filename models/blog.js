const config = require('../utils/config')
const mongoose = require('mongoose')

mongoose
.connect(config.MONGO_URI)
.then(console.log('connected to database'))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)