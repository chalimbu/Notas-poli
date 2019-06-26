const { authEstudiante } = require('../midleware/auth')
const PlanillaDigital = require('../models/planillaDigital')

const express = require('express')
const router = new express.Router()

router.get('/estudiante/materias', authEstudiante, async(req, res) => {
    try {
        const materias = await PlanillaDigital.obtenerMateriasMatriculadas(req.usuario)
        if (materias.length === 0) {
            return res.status(404).send()
        }
        return res.status(200).send(materias)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/estudiante/materias/:id', authEstudiante, async(req, res) => {
    debugger
    const _id = req.params.id
        //console.log(_id)
        //console.log(req.usuario)
    try {
        const planilla = await PlanillaDigital.obtenerNotasEstudiante(req.usuario, _id)

        if (!planilla) {
            return res.status(404).send()
        }
        res.send(planilla)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router