const codRespuesta = require('./codigos-respuesta.js')
const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'NotasPoli'

//recibe el body objeto mandado y el userAgent
const logeo = ({ usuario, contra } = {}, userAgent, callback) => {
    if (usuario && contra) {
        buscarUser(usuario, contra, (error, usuarioInterno) => {

            if (error) {
                //console.log(error)
                return callback(codRespuesta.baseDatosDesconectada())
            }
            if (!usuarioInterno) {
                return callback(codRespuesta.usuarioIncorrecto())
            } else {
                //console.log(usuario, contra, userAgent)
                registrarIngreso(usuario, contra, userAgent, (error, client) => {
                    //console.log(error)
                    if (error) {
                        return callback(codRespuesta.imposibleInsertarEnBd())
                    } else {
                        if (client) {
                            console.log(usuarioInterno)
                                //usuarioInterno
                            return callback(asignarTipoIngreso(usuarioInterno.response.accesso))
                        } else {
                            //console.log('no encontro el usuario a actualizar')
                            return callback({ hi: '3234' })
                        }
                    }
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
            return callback(error, null)
        } else {
            const db = client.db(databaseName)

            db.collection('usuarios').findOne({ identificador: usuario, clave: contra }, (error, usuario) => {
                if (error) {
                    return callback(codRespuesta.imposibleInsertarEnBd(), null);
                } else {
                    if (usuario) {
                        return callback(null, asignarTipoIngreso(usuario.nivelAcceso))
                    } else {
                        return callback(null, null)
                    }
                }

            })
        }
    })
}

const registrarIngreso = (usuario, contra, userAgent, callback) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return callback(error, null)
        } else {
            const db = client.db(databaseName)
                //console.log(usuario, contra, userAgent)

            db.collection('usuarios').updateOne({ identificador: usuario, clave: contra }, {
                $set: {
                    userAgent
                }
            }, (error, usuario) => {

                return callback(error, usuario);
            })
        }
    })

}

const asignarTipoIngreso = (tipoAcceso) => {

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