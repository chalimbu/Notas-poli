const Usuario = require('../models/usuarios')
const PlanillaDigital = require('../models/planillaDigital')
    //const bcrypt = require('bcryptjs')
    //const mongoose = require('mongoose')

const cargarDb = async() => {
    //crear los usuarios 6 usuarios, admins,1 profesor(2 grupos), 5 estudiatn
    var plantillaUsuario = {
        nombre: 'admin',
        id: 3001,
        clave: 'admin123',
        correo: 'admin@correo.com',
        nivelAcceso: 3
    }
    await Usuario.guardarOActualizar(plantillaUsuario)

    plantillaUsuario.nivelAcceso = 2
    plantillaUsuario.nombre = 'profe1'
    plantillaUsuario.id = 2001
    plantillaUsuario.clave = 'profe1'

    await Usuario.guardarOActualizar(plantillaUsuario)

    plantillaUsuario.nivelAcceso = 1
    for (x = 0; x < 5; x++) {
        plantillaUsuario.nombre = 'estudiante' + x
        plantillaUsuario.id = 100 + x
        plantillaUsuario.clave = 'estudiante' + x
        await Usuario.guardarOActualizar(plantillaUsuario)
    }

    var planilaDigital = {
        nombreMateria: 'Fisica del movimiento',
        codigoMateria: 'FIS-001',
        grupo: 1,
        docente: 2001,
    }

    await PlanillaDigital.crearSiNoExiste(planilaDigital)
    const planillaCreada = await PlanillaDigital.findOne({ codigoMateria: 'FIS-001', grupo: 1 })
    await planillaCreada.populate('docente').execPopulate()
    await planillaCreada.addStudent(100)
    await planillaCreada.addStudent(101)
    await planillaCreada.addStudent(102)
    await planillaCreada.addStudent(103)


    var planilaDigital = {
        nombreMateria: 'Programacion y algoritmos',
        codigoMateria: 'ING-003',
        grupo: 2,
        docente: 2001,
    }
    await PlanillaDigital.crearSiNoExiste(planilaDigital)
    const planillaCreada2 = await PlanillaDigital.findOne({ codigoMateria: 'ING-003', grupo: 2 })
        //await planillaCreada.populate('docente').execPopulate()
    await planillaCreada2.addStudent(100)
    await planillaCreada2.addStudent(101)
    await planillaCreada2.addStudent(102)
    await planillaCreada2.addStudent(104)

    const usuario = await Usuario.findOne({ id: 101 })
        //console.log(usuario)
    console.log(await PlanillaDigital.obtenerMateriasMatriculadas(usuario))

}
module.exports = cargarDb