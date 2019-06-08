const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')
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




    // const usuario = await Usuario.findOne({ id: 3001 })
    // console.log(usuario)
    // const planilla = new PlanillaDigital({
    //     nombreMateria: 'biologia',
    //     codigoMateria: 'bca-830',
    //     grupo: 3,
    //     docente: usuario._id,
    //     encabezadoNotas: ['parcial1', 'parcial2']
    // })
    // await planilla.save()
    console.log(await bcrypt.compare('sebas', await bcrypt.hash('sebas', 8)))
}

module.exports = cargarDb