const codRespuesta = require('./codigos-respuesta.js')
const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'NotasPoli'

//recibe el body objeto mandado y el userAgent
const logeo = ({ usuario, contra } = {}, userAgent, callback) => {
    if (usuario && contra) {

        buscarUser(usuario, contra, (error, usuario) => {

            if (error) {

                return callback(codRespuesta.baseDatosDesconectada())
            }

            if (!usuario) {
                return callback(codRespuesta.usuarioIncorrecto())
            } else {
                registrarIngreso(usuario, contra, userAgent, () => {
                    return callback(asignarTipoIngreso(usuario.nivelAcceso))
                })
            }

        })
    } else {

        return callback(codRespuesta.faltanParametros())
    }
}

const buscarUser = (usuario, contra, callback) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

        if (error) {
            return callback(error, undefined)
        } else {
            const db = client.db(databaseName)

            db.collection('usuarios').findOne({ identificador: usuario, clave: contra }, (error, usuario) => {

                return callback(error, usuario);
            })
        }
    })
}

const registrarIngreso = (usuario, contra, userAgent, callback) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return callback(error, undefined)
        } else {
            const db = client.db(databaseName)
            console.log(userAgent)
            db.collection('usuarios').updateOne({ identificador: usuario, clave: contra }, {
                userAgent: userAgent
            }, (error, usuario) => {
                return callback(error, usuario);
            })
        }
    })

}

const asignarTipoIngreso = (tipoAcceso) => {
    console.log(tipoAcceso)
    if (tipoAcceso === 1) {
        return codRespuesta.usuarioCorrectoAcceso1()
    } else if (tipoAcceso === 2) {
        return codRespuesta.usuarioCorrectoAcceso2()
    } else if (tipoAcceso === 3) {
        return codRespuesta.usuarioCorrectoAcceso3()
    }
}


module.exports = {
    logeo
}