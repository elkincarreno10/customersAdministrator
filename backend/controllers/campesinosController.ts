import Campesino from "../models/Campesinos"
import FacturaCampesino from "../models/FacturasCampesinos"
import AbonoCampesino from "../models/AbonosCampesinos"

const campesinos = async (req, res) => {

    const campesinos = await Campesino.findAll({ 
        where: { usuarioId: req.usuario.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({
        campesinos
    })
}

const crearCampesino = async (req, res) => {
    const { name } = req.body

    const existeCampesino = await Campesino.findOne({ where: { name, usuarioId: req.usuario.id }})
    if(existeCampesino) {
        return res.status(403).json({
            msg: 'El campesino ya existe',
            type: 'error'
        })
    }

    const campesino: any = await Campesino.create({ name, usuarioId: req.usuario.id })

    res.json({
        msg: 'Campesino Creado Correactamente',
        campesino
    })
}

const updateCampesino = async (req, res) => {
    const { name, nameNuevo, saldo } = req.body

    const campesino: any = await Campesino.findOne({ where: { name }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    campesino.name = nameNuevo
    campesino.saldo = saldo
    await campesino.save()

    res.json({
        msg: 'Campesino Actualizado Correctamente'
    })
}

const eliminarCampesino = async (req, res) => {
    const { id } = req.params

    const campesino: any = await Campesino.findOne({ where: { id }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await campesino.destroy()

    res.json({
        msg: 'El campesino fue eliminado correctamente'
    })
}

const obtenerFacturas = async (req, res) => {
    const { id } = req.params

    const campesino: any = await Campesino.findOne({ where: { id }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const facturas = await FacturaCampesino.findAll({ 
        where: { usuarioId: req.usuario.id, campesinoId: campesino.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({facturas})
}

const crearFactura = async (req, res) => {
    const { campesinoId, descripcion, saldo, fecha } = req.body

    const campesino: any = await Campesino.findOne({ where: { id: campesinoId }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const factura = await FacturaCampesino.create({ campesinoId, descripcion, saldo, fecha, usuarioId: req.usuario.id })

    campesino.saldo += saldo
    await campesino.save()

    res.json({
        msg: 'Factura Guardada Correctamente',
        factura
    })
}

const updateFactura = async (req, res) => {
    const { id, campesinoId, descripcion, saldo, fecha } = req.body

    const campesino: any = await Campesino.findOne({ where: { id: campesinoId }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const factura: any = await FacturaCampesino.findOne({ where: { id } })

    campesino.saldo = campesino.saldo + saldo - factura.saldo
    await campesino.save()

    factura.descripcion = descripcion
    factura.saldo = saldo
    factura.fecha = fecha

    await factura.save()

    res.json({
        msg: 'Factura Actualizada Correctamente'
    })
}

const eliminarFactura = async (req, res) => {
    const { id } = req.params

    const factura: any = await FacturaCampesino.findOne({ where: { id }})

    if(factura.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await factura.destroy()

    res.json({
        msg: 'La factura fue eliminada correctamente'
    })
}

const cambiarEstado = async (req, res) => {
    const { id } = req.params

    const factura: any = await FacturaCampesino.findOne({ where: { id }})

    if(factura.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    if(factura.estado === 0) {
        factura.estado = 1
    } else {
        factura.estado = 0
    }
    await factura.save()

    res.json({
        msg: 'Actualizado Correctamente'
    })
}

const obtenerAbonos = async (req, res) => {
    const { id } = req.params

    const campesino: any = await Campesino.findOne({ 
        where: { id }
    })

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abonos = await AbonoCampesino.findAll({ 
        where: { usuarioId: req.usuario.id, campesinoId: campesino.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({abonos})
}

const crearAbono = async (req, res) => {
    const { campesinoId, descripcion, saldo, fecha } = req.body

    const campesino: any = await Campesino.findOne({ where: { id: campesinoId }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abono = await AbonoCampesino.create({ campesinoId, descripcion, saldo, fecha, usuarioId: req.usuario.id })

    campesino.saldo -= saldo
    await campesino.save()

    res.json({
        msg: 'Abono Guardado Correctamente',
        abono
    })
}

const updateAbono = async (req, res) => {
    const { id, campesinoId, descripcion, saldo, fecha } = req.body

    const campesino: any = await Campesino.findOne({ where: { id: campesinoId }})

    if(campesino.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abono: any = await AbonoCampesino.findOne({ where: { id } })

    campesino.saldo = campesino.saldo - saldo + abono.saldo
    await campesino.save()

    abono.descripcion = descripcion
    abono.saldo = saldo
    abono.fecha = fecha

    await abono.save()

    res.json({
        msg: 'Abono Actualizado Correctamente'
    })
}

const eliminarAbono = async (req, res) => {
    const { id } = req.params

    const abono: any = await AbonoCampesino.findOne({ where: { id }})

    if(abono.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await abono.destroy()

    res.json({
        msg: 'El abono fue eliminado correctamente'
    })
}


export {
    campesinos,
    crearCampesino,
    updateCampesino,
    eliminarCampesino,
    obtenerFacturas,
    crearFactura,
    updateFactura,
    eliminarFactura,
    cambiarEstado,
    obtenerAbonos,
    crearAbono, 
    updateAbono, 
    eliminarAbono
}