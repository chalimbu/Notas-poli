const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

usuarioSchema.statics.guardarOActualizar = async(usuario) => {
    const user = await Usuario.findOne({ id: usuario.id })
    if (user) {
        return await Usuario.actualizar(user, usuario)
    }
    const usuario1 = new Usuario(usuario)
    await usuario1.save()


}

usuarioSchema.statics.actualizar = async(usuarioActual, camposActualizar) => {
    const updates = Object.keys(camposActualizar)
    const allowUpdates = ['nombre', 'id', 'clave', 'correo', 'nivelAcceso']
    const isValidOperation = updates.every(updates => allowUpdates.includes(updates))
    if (!isValidOperation) {
        throw new Error('Campos no validos')
    }
    try {
        updates.forEach((update) => usuarioActual[update] = camposActualizar[update])
        await usuarioActual.save()
    } catch (e) {
        throw new Error('Error de sistema')
    }
}

usuarioSchema.statics.encontrarPorIdCorreo = async(id, clave) => {

    const user = await Usuario.findOne({ id })
        //console.log(user)
    if (!user) {
        throw new Error('Unable to log in')
    }
    //limpia y generada
    const isMatch = await bcrypt.compare(clave, user.clave)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error('Unable to log in')
    } else {
        //console.log('acabo esperado')
        return user
    }

}

usuarioSchema.methods.generarTokenAutentificacion = async function() {
    try {
        const user = this
            //console.log(user)
        const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
            //console.log(token)
        user.tokens = user.tokens.concat({ token })
        console.log(user)
        await user.save()
        return token
    } catch (e) {
        console.log(e)
    }
}

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
        //console.log(usuario.isModified('clave'))
    if (usuario.isModified('clave')) {
        //console.log(usuario.clave)
        usuario.clave = await bcrypt.hash(usuario.clave, 8)
    }
    next() //indica qeu la funcion termino, antes de guardar
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario