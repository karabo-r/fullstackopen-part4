const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.post('/', async (request, response)=>{
    const {username, name, passwordHash} = request.body

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = UserRouter