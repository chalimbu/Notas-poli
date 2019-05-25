const faltanParametros = () => {
    return {
        response: undefined,
        error: {
            id: 20
        }
    }
}

const usuarioIncorrecto = () => {
    return {
        response: undefined,
        error: {
            id: 30
        }
    }
}

const baseDatosDesconectada = () => {
    return {
        response: undefined,
        error: {
            id: 40
        }
    }
}

const imposibleInsertarEnBd = () => {
    return {
        response: undefined,
        error: {
            id: 50
        }
    }
}

const usuarioCorrectoAcceso1 = () => {
    return {
        response: {
            id: 10,
            accesso: 1
        },
        error: undefined
    }
}

const usuarioCorrectoAcceso2 = () => {
    return {
        response: {
            id: 10,
            accesso: 2
        },
        error: undefined
    }
}

const usuarioCorrectoAcceso3 = () => {
    return {
        response: {
            id: 10,
            accesso: 3
        },
        error: undefined
    }
}



module.exports = {
    faltanParametros,
    usuarioIncorrecto,
    baseDatosDesconectada,
    usuarioIncorrecto,
    usuarioCorrectoAcceso1,
    usuarioCorrectoAcceso2,
    usuarioCorrectoAcceso3,
    imposibleInsertarEnBd
}