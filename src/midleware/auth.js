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

const authAdmin = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token, nivelAcceso: 3 })

        if (!user) {
            throw new Error('.')
        }
        req.token = token
        req.usuario = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'favor logearse.' })
    }
}

const authEstudiante = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token, nivelAcceso: 1 })

        if (!user) {
            throw new Error('.')
        }
        req.token = token
        req.usuario = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'favor logearse.' })
    }
}

const authDocente = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token, nivelAcceso: 2 })

        if (!user) {
            throw new Error('.')
        }
        req.token = token
        req.usuario = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'favor logearse.' })
    }
}

module.exports = { auth, authAdmin, authEstudiante, authDocente }