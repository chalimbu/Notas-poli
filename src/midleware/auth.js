const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarios')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('.')
        }
        req.token = token
        req.usuario = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please autheticate.' })
    }
}

module.exports = auth