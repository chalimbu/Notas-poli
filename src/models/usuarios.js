const mongoose = require('mongoose')
const validator = require('validator')

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true,
        minlength: [5, 'To little password'],
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    nivelAcceso: {
        type: Number,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

usuarioSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
        //console.log(userObject)

    delete userObject.clave
    delete userObject.tokens

    return userObject
}

usuarioSchema.pre('save', async function(next) {
    const usuario = this
    if (usuario.isModified('password')) {
        usuario.password = await bcrypt.hash(user.password, 8)
    }
    next() //indica qeu la funcion termino, antes de guardar
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario