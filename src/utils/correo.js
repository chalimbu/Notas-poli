const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const enviarCorreoRecordatorio = ({ correo, nombre, nivelAcceso }) => {
    if (nivelAcceso === 1) {
        enviarRecordatorioEstudiante(correo, nombre)
    } else {
        enviarRecordatorioDocente(correo, nombre)
    }

}

const enviarRecordatorioDocente = (email, name) => {
    console.log(1)
    sgMail.send({
        to: email,
        from: 'appNotasPolis@elpoli.edu.co',
        subject: 'Recordatorio subir notas',
        text: `Saludos respetado profesor(a), ${name}. El dia de hoy le escribimos para recordarle que suba las nota al sistema de notas y de este modo mantenga a sus estudiantes al dia, gracias.
        Este mensaje ha sido generado automaticamente porfavor no lo responda`,
        //html:'' allows the email to be send 
    })
}
const enviarRecordatorioEstudiante = (email, name) => {
    sgMail.send({
        to: email,
        from: 'appNotasPolis@elpoli.edu.co',
        subject: 'Recordatorio revisar su notas',
        text: `Saludos respetado estudiante, ${name}. El dia de hoy le escribimos para recordarle que revise sus notas en el sistema de notas y de este modo se mantenga informado sobre el estado academico de sus materias
        Este mensaje ha sido generado automaticamente porfavor no lo responda`,
        //html:'' allows the email to be send 
    })
}

module.exports = enviarCorreoRecordatorio