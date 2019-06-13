const Usuario = require('../models/usuarios')
const mongoose = require('mongoose')

const planillaDigitalSchema = new mongoose.Schema({
    nombreMateria: {
        type: String,
        trim: true,
        required: true
    },
    codigoMateria: {
        type: String,
        trim: true,
        required: true
    },
    grupo: {
        type: Number,
        required: true,
    },
    docente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    encabezadoNotas: [{
        encabezado: {
            id: {
                type: Number,
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            porcentaje: {
                type: Number,
                required: true
            }
        }
    }],
    notas: [{
        nota: {
            estudiante: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Usuario'
            },
            calificacion: [{
                type: Number,
                required: true
            }]
        }
    }]
})
planillaDigitalSchema.statics.crearSiNoExiste = async(planilla) => {
    const Planilla = await PlanillaDigital.findOne({
        codigoMateria: planilla.codigoMateria,
        grupo: planilla.grupo
    })
    if (!Planilla) {
        const docente = await Usuario.findOne({ id: planilla.docente })
        if (!docente) {
            throw new Error('El docente no existe')
        }
        planilla.docente = docente._id

        const encabezado1 = { encabezado: { id: 1, nombre: 'parcial 1', porcentaje: 25 } }
        const encabezado2 = { encabezado: { id: 2, nombre: 'parcial 2', porcentaje: 25 } }
        planilla.encabezadoNotas = [encabezado1]
        planilla.encabezadoNotas.push(encabezado2)
        const planillaNueva = new PlanillaDigital(planilla)
            //planillaNueva.encabezadoNotas = []
            //CoinArray.push(new Coin('123'));
            //planillaNueva.encabezadoNotas.push(new encabezado(encabezado1))
            //planillaNueva.encabezadoNotas.encabeado = planillaNueva.encabezadoNotas.encabezado.concat({ encabezado2 })
        await planillaNueva.save()
        return planillaNueva
    }
}
planillaDigitalSchema.statics.cargaMasiva = async(planillas) => {
    var errores = 0
    var correctos = 0
    var resultados = []
    for (i = 0; i < planillas.length; i++) {
        //console.log(usuarios[i])
        if (planillas[i].nombreMateria && planillas[i].codigoMateria && planillas[i].grupo && planillas[i].docente && planillas[i].estudiante) {
            const materiaACrear = {
                nombreMateria: planillas[i].nombreMateria,
                codigoMateria: planillas[i].codigoMateria,
                grupo: planillas[i].grupo,
                docente: planillas[i].docente
            }
            try {
                await PlanillaDigital.crearSiNoExiste(materiaACrear)
                const planillaCreada = await PlanillaDigital.findOne({ codigoMateria: planillas[i].codigoMateria, grupo: planillas[i].grupo })
                try {
                    planillaCreada.addStudent(planillas[i].estudiante)
                    correctos++
                } catch (e) {
                    errores++
                    resultados.push({ id: 3, info: 'el elemento ' + i + ' fallo por que el estudiante no existe' + e })
                }
            } catch (e) {
                errores++
                resultados.push({ id: 3, info: 'el elemento ' + i + ' fallo en la creacion de la materia por validaciones internas' + e })
            }
        } else {
            errores++
            resultados.push({ id: 3, info: 'al elemento ' + i + ' le faltan parametros para crear una matricula' })
        }
    }
    resultados.push({ id: 1, info: 'se realizaron ' + correctos + ' operaciones correctas' })
    resultados.push({ id: 2, info: 'no se pudieron realizar ' + errores + ' operaciones' })
    return resultados
}

planillaDigitalSchema.statics.obtenerMateriasMatriculadas = async(usuario) => {
    const id = usuario._id
        //console.log(id)
    const materiasMatriculadas = []
    const planilllasTodas = await PlanillaDigital.find({})
        //console.log(planilllasTodas)
    for (i = 0; i < planilllasTodas.length; i++) {
        planilla = planilllasTodas[i]
            //console.log(planilla)
        for (j = 0; j < planilla.notas.length; j++) {
            if (planilla.notas[j].nota.estudiante.equals(id)) {
                materiasMatriculadas.push(planilla)
            }
        }
    }
    console.log(materiasMatriculadas)
    for (i = 0; i < materiasMatriculadas.length; i++) {
        materiasMatriculadas[i].encabezadoNotas = []
        materiasMatriculadas[i].notas = []
        materiasMatriculadas[i].encabezadoNotas = undefined
        materiasMatriculadas[i].notas = undefined
        await materiasMatriculadas[i].populate('docente').execPopulate()
    }
    console.log(materiasMatriculadas)
        //await
        //console.log(materias_matriculadas)
    return materiasMatriculadas
}

planillaDigitalSchema.methods.addStudent = async function(id) {
    const planilla = this
    var existeEstudianteEnPlanilla = false
    const estudiante = await Usuario.findOne({ id: id })
    if (!estudiante) {
        throw new Error('The user does not exist')
    }
    for (i = 0; i < planilla.notas.length; i++) {
        if (planilla.notas[i].nota.estudiante.equals(estudiante._id)) {
            //console.log('ya esta')
            existeEstudianteEnPlanilla = true
            break;
        }
    }

    if (!existeEstudianteEnPlanilla) {
        //console.log(planilla.encabezadoNotas.length)

        const calificaciones = []
        for (var i = 0; i < planilla.encabezadoNotas.length; i++) {
            calificaciones.push(0)
        }
        //console.log(calificaciones.length)
        planilla.notas.push({ nota: { estudiante: estudiante._id, calificacion: calificaciones } })

        await planilla.save()
    }
}
planillaDigitalSchema.statics.obtenerNotasEstudiante = async(usuario, idPlanilla) => {
    //console.log('entro')
    const id = usuario._id
    const planilla = await PlanillaDigital.findOne({ _id: idPlanilla })
        ///console.log(planilla)
    if (!planilla) {
        return null
    } else {
        console.log(planilla.notas)
        planilla.notas = planilla.notas.filter((myNota) => {
            return myNota.nota.estudiante.equals(usuario._id)
        })
        console.log(planilla.notas)
        if (planilla.notas.length === 0) { //el usuario no le corresponde a esta planilla
            return null
        }
        return planilla
            //.nota.estudiante.equals(estudiante._id)
    }
}

const PlanillaDigital = mongoose.model('PlanillaDigital', planillaDigitalSchema)

module.exports = PlanillaDigital