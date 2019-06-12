const Usuario = require('../models/usuarios')
const { auth } = require('../midleware/auth')
const express = require('express')

//da
const router = new express.Router()


router.post('/usuarios/login', async(req, res) => {
    try {

        //const user = await User.findByCredential(req.body.email, req.body.password)
        const usuario = await Usuario.encontrarPorIdCorreo(req.body.id, req.body.clave)
        const token = await usuario.generarTokenAutentificacion()

        res.send({ usuario, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/usuarios/deslogeo', auth, async(req, res) => {
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.usuario.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router