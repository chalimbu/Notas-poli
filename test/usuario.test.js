const request = require('supertest')
const app = require('../src/app')
const { eliminarTodo, cargarUsuarioAdmin, cargar3usuarios } = require('./fixtures/db')



beforeEach(async() => {
    await eliminarTodo()
    await cargarUsuarioAdmin()
    await cargar3usuarios()
})

test('login incorrecto', async() => {
    const response = await request(app).post('/usuarios/login').send({
        "id": "3001",
        "clave": "admin1234"
    }).expect(400)
})

test('login admin correcto', async() => {
    const response = await request(app).post('/usuarios/login').send({
        "id": "3001",
        "clave": "admin123"
    }).expect(200)
})