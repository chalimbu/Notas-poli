const express = require('express')
const cargarDB = require('./cargarBaseDatos')

const router = new express.Router()


router.post('/cargarAplicacion', async(req, res) => {
    try {
        cargarDB()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router