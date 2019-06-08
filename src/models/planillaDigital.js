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
        type: String,
        required: true
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

const PlanillaDigital = mongoose.model('PlanillaDigital', planillaDigitalSchema)

module.exports = PlanillaDigital