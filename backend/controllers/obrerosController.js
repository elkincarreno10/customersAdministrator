import Obrero from "../models/Obreros.js"

const obreros = async (req, res) => {

    const obreros = await Obrero.findAll({ 
        where: { usuarioId: req.usuario.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({
        obreros
    })
}

const crearObrero = async (req, res) => {
    const { name } = req.body

    const existeObrero = await Obrero.findOne({ where: { name }})
    if(existeObrero) {
        return res.json({
            msg: 'El Obrero ya existe',
            type: 'error'
        })
    }

    const obrero = await Obrero.create({ name, usuarioId: req.usuario.id })

    res.json({
        msg: 'Obrero Creado Correactamente',
        obrero
    })
}

const updateObrero = async (req, res) => {
    const { name, nameNuevo, saldo } = req.body

    const obrero = await Obrero.findOne({ where: { name }})

    if(obrero.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    obrero.name = nameNuevo
    obrero.saldo = saldo
    await obrero.save()

    res.json({
        msg: 'Obrero Actualizado Correctamente'
    })
}

const eliminarObrero = async (req, res) => {
    const { id } = req.params

    const obrero = await Obrero.findOne({ where: { id }})

    if(obrero.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await obrero.destroy()

    res.json({
        msg: 'El obrero fue eliminado correctamente'
    })
}

export {
    obreros,
    crearObrero,
    updateObrero,
    eliminarObrero
}