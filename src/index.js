const express = require('express')
require("./db/mongoose")

const Usuario = require('./models/usuarios')

const usuario = new Usuario({
    nombre: 'admin',
    id: 3000,
    clave: 'admin123',
    correo: 'admin@correo.com',
    nivelAcceso: 3
})
usuario.save()