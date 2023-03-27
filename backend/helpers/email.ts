import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {

    const { email, name, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: '"Administra tu Negocio" <cuentas@administratunegocio.com>',
        to: email,
        subject: 'Administra tu Negocio - Comprubea tu cuenta',
        text: 'Comprueba tu cuenta en Administra tu Negocio',
        html: `<p>Hola: ${name} Comprueba tu cuenta en Administra tu Negocio</p>
        <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/login/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}


export const emailOlvidePassword = async (datos) => {

    const { email, name, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: '"Administra tu Negocio" <cuentas@administratunegocio.com>',
        to: email,
        subject: 'Administra tu Negocio - Reestablece tu password',
        text: 'Reestablece tu password',
        html: `<p>Hola: ${name} has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/login/recuperar-password/${token}">Reestablecer Password</a>
        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        `
    })
}