const { authAdmin } = require('../midleware/auth')
const Usuario = require('../models/usuarios')
const PlanillaDigital = require('../models/planillaDigital')
const mail = require('../utils/correo')
var util = require('util')

const express = require('express')
const multer = require('multer')
const router = new express.Router()


const upload = multer({
    limits: {
        fileSize: 1000000 //1 megabyte, 500 if to big
    },
    fileFilter(req, file, cb) {
        //console.log(file.originalname)
        if (!file.originalname.match(/.(json)$/)) {
            return cb(new Error('Favor suba el archivo en formato json'))
        }
        cb(undefined, true)
            //cb(new Error('file must be document'))
            //cb(undefined,true)
    }
})

router.post('/admin/cargaUsuarios', authAdmin, upload.single('usuarios'), async(req, res) => {
    console.log(util.inspect(req))
        //res.send(util.inspect(req))
    if (typeof req.file === 'undefined') {
        return await res.status(400).send({ error: 'falta el archivo' })
    }
    try {
        //console.log(String(req.file.buffer))
        const jsonString = String(req.file.buffer)
        const jsonObject = await JSON.parse(jsonString);
        //console.log(jsonObject.length);
        if (jsonObject.length) {
            res.send(await Usuario.cargaMasiva(jsonObject))
        } else {
            return res.status(400).send({ erro: 'deber ser un array con los datos' })
        }
    } catch (e) {
        console.log(e)
        return res.status(400).send({ error: 'no json valido:' + e })
    }
    // req.user.avatar = buffer
    // await req.user.save()

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/admin/cargaMatriculas', authAdmin, upload.single('matriculas'), async(req, res) => {

    if (typeof req.file === 'undefined') {
        return await res.status(400).send({ error: 'falta el archivo' })
    }
    try {
        //console.log(String(req.file.buffer))
        const jsonString = String(req.file.buffer)
        const jsonObject = await JSON.parse(jsonString);
        console.log(jsonObject.length);
        if (jsonObject.length) {
            res.send(await PlanillaDigital.cargaMasiva(jsonObject))
        } else {
            return res.status(400).send({ erro: 'deber ser un array con los datos' })
        }
    } catch (e) {
        console.log(e)
        return res.status(400).send({ error: 'no json valido ' + e })
    }
    // req.user.avatar = buffer
    // await req.user.save()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.delete('/admin/eliminarTodo', authAdmin, async(req, res) => {
    await PlanillaDigital.deleteMany({})
    await Usuario.deleteMany({ nivelAcceso: { $ne: 3 } })
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/admin/enviarCorreos', authAdmin, async(req, res) => {
    const usuariosNoAdmin = await Usuario.find({ nivelAcceso: { $ne: 3 } })
    var enviarCorrectos = 0
    var enviarIncorrecto = 0
    for (i = 0; i < usuariosNoAdmin.length; i++) {
        try {
            mail(usuariosNoAdmin[i])
            enviarCorrectos++
        } catch (e) {
            enviarIncorrecto++
        }
    }
    res.send({ enviarCorrectos, enviarIncorrecto })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


module.exports = router