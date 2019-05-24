const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'NotasPoli'

//make the connection, the url, ot read well url, and callback
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to dabase')
    }
    const db = client.db(databaseName)

    // db.collection('usuarios').insertMany([{
    //         nombre: 'pablito',
    //         identificador: 1058230434,
    //         clave: 'miclavesegura1',
    //         correo: 'pablito24@elpoli.edu.co',
    //         nivelAcceso: 1

    //     },
    //     {
    //         nombre: 'joselito',
    //         identificador: 1062330434,
    //         clave: 'miclavesegura2',
    //         correo: 'joselito93@elpoli.edu.co',
    //         nivelAcceso: 2
    //     },
    //     {
    //         nombre: 'admin',
    //         identificador: 1062330434,
    //         clave: 'admin123',
    //         correo: 'administracion@elpoli.edu.co',
    //         nivelAcceso: 3
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('imposible insertar usuarios')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('grupos').insertOne({
    //     nombreMateria: 'Fisica',
    //     codigo: 'bas-220',
    //     numeroGrupo: 2,
    //     docente: new ObjectID('5ce07bae4037a32c74b2d22d'),

    // }, (error, result) => {
    //     if (error) {
    //         return console.log('imposible los grupos')
    //     }
    //     console.log(result.ops)
    // })

    db.collection('Encabezados de notas').insertOne({
        grupo: new ObjectID('5ce07bae4037a32c74b2d22d'),
        encabezados: [{
            nombre: 'parcial1',
            porcentaje: 25
        }, {
            nombre: 'parcial2',
            porcentaje: 25
        }]
    })

    db.collection('planillaDigital').insertOne({
        grupo: new ObjectID('5ce07bae4037a32c74b2d22d'),
        estudiantes: [{
            nombre: 'pablito',
            id: new ObjectID('5ce07bae4037a32c74b2d22c'),
            notas: [0, 0]
        }]
    })
})


// }
// ])