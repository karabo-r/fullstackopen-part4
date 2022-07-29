function errorHandler(error, request, response, next){
    if(error){
        response.status(400).send(error.message)
    }
    if(error.code === 11000){
        response.status(400).send({message: 'username already in use'})
    }

    next()
}

module.exports = errorHandler