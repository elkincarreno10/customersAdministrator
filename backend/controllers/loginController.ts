import generarJWT from "../helpers/generarJWT"
import generarToken from "../helpers/generarToken"
import Usuario from "../models/Usuarios"
import { emailRegistro, emailOlvidePassword } from "../helpers/email"

type usuario = {
    name: string,
    email: string,
    password: string,
    token: string | null,
    confirmado: number
}

const login = async (req, res) => {
    const { email, password } = req.body as usuario

    const usuario = await Usuario.findOne({ where : {email} })

    if(!usuario) {
        return res.status(403).json({
            msg: 'El usuario no existe',
            type: 'error'
        })
    }

    if(!usuario.verificarPassword(password)) {
        return res.status(403).json({
            msg: 'Password Incorrecto',
            type: 'error'
        })
    }

    res.json({
        id: usuario.id,
        name: usuario.name,
        token: generarJWT(usuario.id)
    })
}

const registrar = async (req, res) => {
    const { name, email, password } = req.body as usuario

    const existeUsuario = await Usuario.findOne({ where: {email}})

    if(existeUsuario) {
        return res.json({
            msg: 'El usuario ya existe',
            type: 'error'
        })
    }

    try {
        const usuario = await Usuario.create({name, email, password})
        usuario.token = generarToken()
        await usuario.save()
    
        // Email de confirmación de la cuenta
        emailRegistro({
            email,
            name,
            token: usuario.token
        })
        
        res.json({
            msg: 'Te hemos enviado un correo para que confirmes tu cuenta'
        })
    } catch (error) {
        console.log(error)
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuario = await Usuario.findOne({ where: {token}})

    if(!usuario) {
        return res.status(404).json({
            msg: 'El usuario no existe',
            type: 'error'
        })
    }

    try {
        usuario.confirmado = 1
        usuario.token = null
        await usuario.save()

        res.json({
            msg: 'Usuario confirmado correctamente, ya puedes iniciar sesión'
        })
    } catch (error) {
        console.log(error)
    }

}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({ where: {email}})

    if(!usuario) {
        return res.status(404).json({
            msg: 'El usuario no existe',
            type: 'error'
        })
    }

    usuario.token = generarToken()
    await usuario.save()

    try {
        emailOlvidePassword({
            name: usuario.name,
            email,
            token: usuario.token
        })

        res.json({
            msg: 'Hemos enviado las instrucciones a tu correo'
        })

    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params

    const usuario = await Usuario.findOne({ where: {token}})

    if(usuario) {
        res.json({msg: 'El token es correcto'})
    } else {
        const error = new Error('Token no válido')
        return res.status(404).json({msg: error.message, type: 'error'})
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ where: {token}})

    if(usuario) {
        usuario.password = password
        usuario.token = null

        try {
            await usuario.save()
            res.json({msg: 'Password Modificado Correctamente'})
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token no válido')
        res.status(404).json({msg: error.message, type: 'error'})
    }
}


const perfil = (req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    login,
    registrar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}