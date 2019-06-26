const { authDocente } = require('../midleware/auth')
const PlanillaDigital = require('../models/planillaDigital')


const express = require('express')
const router = new express.Router()

router.get('/docente/materias', authDocente, async(req, res) => {
    try {
        const materias = await PlanillaDigital.obtenerMateriasDicta(req.usuario)
        if (materias.length === 0) {
            return res.status(404).send()
        }
        return res.status(200).send(materias)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/docente/materias/:id', authDocente, async(req, res) => {
    const _id = req.params.id

    try {
        const planilla = await PlanillaDigital.findOne({ _id, docente: req.usuario._id })
        if (!planilla) {
            return res.status(404).send()
        }
        if (planilla.creada === false) {
            return res.status(405).send({ error: 'no se han creado las actividades para la planilla' })
        }
        await planilla.populate('docente').execPopulate()
        await planilla.popularEstudiantes()

        res.send(planilla)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/docente/materias/:id', authDocente, async(req, res) => {
    const _id = req.params.id
    const actividades = req.body
    try {
        const planilla = await PlanillaDigital.findOne({ _id, docente: req.usuario._id })

        if (!planilla) {
            return res.status(404).send()
        }
        if (planilla.creada === true) {
            return res.status(403).send({ error: "planilla ya ha sido creada" })
        }
        await planilla.creandoActividadesEvaluativas(actividades)
        res.send(planilla)
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

router.patch('/docente/materias/cambiarNota', authDocente, async(req, res) => {
    try {
        const _id = req.body.planilla
        const myPlanilla = await PlanillaDigital.findOne({ _id })
        if (!myPlanilla) {
            res.status(404).send({ e: "planilla no encontrada" })
        }
        await myPlanilla.cambiarNota(req.body.estudiante, req.body.notaPoscision, req.body.nota)
        res.send()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

module.exports = router