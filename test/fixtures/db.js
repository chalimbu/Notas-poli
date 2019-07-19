const mongoose = require('mongoose')
const request = require('supertest')
const PlanillaDigital = require('../../src/models/planillaDigital')
const Usuario = require('../../src/models/usuarios')
const app = require('../../src/app')


const eliminarTodo = async() => {
    await PlanillaDigital.deleteMany({})
    await Usuario.deleteMany({})
}

const usuarioAdmin = {
    nombre: "Mike",
    id: 3001,
    clave: "admin123",
    correo: "admin@correo.com",
    nivelAcceso: 3,
    tokens: [{
        token: "tokenx.."
    }]
}

const cargarUsuarioAdmin = async() => {
    await new Usuario(usuarioAdmin).save()
}

const cargar3usuarios = async() => {
    await request(app)
        .post('/admin/cargaUsuarios')
        .set('Authorization', 'Bearer ' + usuarioAdmin.tokens[0].token)
        .attach('usuariosr', 'test/fixtures/3usuarios.json')
        .expect(200)
        //     const user = await User.findById(userOneId)
        //     expect(user.avatar).toEqual(expect.any(Buffer))
        //         //expect.any(puede ser String,Number,Buffer)
        // })
}


module.exports = { eliminarTodo, cargarUsuarioAdmin, cargar3usuarios }