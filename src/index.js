const express = require('express')
require("./db/mongoose")

const usuarioRouter = require('./routers/usuario')


const cargarAplicacionRouter = require('./temporales/routerCargarDb')

const app = express()
const port = process.env.PORT //para despliegue en heroku

app.use(express.json())
app.use(usuarioRouter)
app.use(cargarAplicacionRouter)

app.listen(port, () => {
    console.log('Servidor up en puerto ' + port)
})

//const Usuario = require('./models/usuarios')
//const PlanillaDigital = require('./models/planillaDigital')