const express = require('express')
require("./db/mongoose")

const usuarioRouter = require('./routers/usuario')
const administradorRouter = require('./routers/administrador')
const estudianteRouter = require('./routers/estudiante')
const docenteRouter = require('./routers/docente')


const cargarAplicacionRouter = require('./temporales/routerCargarDb')

const app = express()
const port = process.env.PORT //para despliegue en heroku

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(usuarioRouter)
app.use(cargarAplicacionRouter)
app.use(administradorRouter)
app.use(estudianteRouter)
app.use(docenteRouter)

app.listen(port, () => {
    console.log('Servidor up en puerto ' + port)
})

//const Usuario = require('./models/usuarios')
//const PlanillaDigital = require('./models/planillaDigital')