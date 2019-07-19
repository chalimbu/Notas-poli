const app = require('../src/app')

const port = process.env.PORT //para despliegue en heroku

app.listen(port, () => {
    console.log('Servidor up en puerto ' + port)
})

//const Usuario = require('./models/usuarios')
//const PlanillaDigital = require('./models/planillaDigital')