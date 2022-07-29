const UserRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


UserRouter.get('/', async (request, response)=>{
    const AllUsersInDb = await User.find({})
    response.json(AllUsersInDb)
})

UserRouter.post('/', async (request, response)=>{
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log(passwordHash);
    const newUser = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = UserRouter