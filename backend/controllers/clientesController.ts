import Cliente from "../models/Clientes"
import FacturaCliente from "../models/FacturasClientes"
import AbonoCliente from "../models/AbonosClientes"

const clientes = async (req, res) => {

    const clientes = await Cliente.findAll({ 
        where: { usuarioId: req.usuario.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({
        clientes
    })
}

const crearCliente = async (req, res) => {
    const { name } = req.body

    const existeCliente = await Cliente.findOne({ where: { name, usuarioId: req.usuario.id }})
    if(existeCliente) {
        return res.status(403).json({
            msg: 'El cliente ya existe',
            type: 'error'
        })
    }

    const cliente: any = await Cliente.create({ name, usuarioId: req.usuario.id })

    res.json({
        msg: 'Cliente Creado Correactamente',
        cliente
    })
}

const updateCliente = async (req, res) => {
    const { name, nameNuevo, saldo } = req.body

    const cliente: any = await Cliente.findOne({ where: { name }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    cliente.name = nameNuevo
    cliente.saldo = saldo
    await cliente.save()

    res.json({
        msg: 'Cliente Actualizado Correctamente'
    })
}

const eliminarCliente = async (req, res) => {
    const { id } = req.params

    const cliente: any = await Cliente.findOne({ where: { id }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await cliente.destroy()

    res.json({
        msg: 'El cliente fue eliminado correctamente'
    })
}

const obtenerFacturas = async (req, res) => {
    const { id } = req.params

    const cliente: any = await Cliente.findOne({ where: { id }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const facturas = await FacturaCliente.findAll({ 
        where: { usuarioId: req.usuario.id, clienteId: cliente.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({facturas})
}

const crearFactura = async (req, res) => {
    const { clienteId, descripcion, saldo, fecha } = req.body

    const cliente: any = await Cliente.findOne({ where: { id: clienteId }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const factura = await FacturaCliente.create({ clienteId, descripcion, saldo, fecha, usuarioId: req.usuario.id })

    cliente.saldo += saldo
    await cliente.save()

    res.json({
        msg: 'Factura Guardada Correctamente',
        factura
    })
}

const updateFactura = async (req, res) => {
    const { id, clienteId, descripcion, saldo, fecha } = req.body

    const cliente: any = await Cliente.findOne({ where: { id: clienteId }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const factura: any = await FacturaCliente.findOne({ where: { id } })

    cliente.saldo = cliente.saldo + saldo - factura.saldo
    await cliente.save()

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

    const factura: any = await FacturaCliente.findOne({ where: { id }})

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

    const factura: any = await FacturaCliente.findOne({ where: { id }})

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

    const cliente: any = await Cliente.findOne({ 
        where: { id }
    })

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abonos = await AbonoCliente.findAll({ 
        where: { usuarioId: req.usuario.id, clienteId: cliente.id },
        order: [['createdAt', 'DESC']]
    })

    res.json({abonos})
}

const crearAbono = async (req, res) => {
    const { clienteId, descripcion, saldo, fecha } = req.body

    const cliente: any = await Cliente.findOne({ where: { id: clienteId }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abono = await AbonoCliente.create({ clienteId, descripcion, saldo, fecha, usuarioId: req.usuario.id })

    cliente.saldo -= saldo
    await cliente.save()

    res.json({
        msg: 'Abono Guardado Correctamente',
        abono
    })
}

const updateAbono = async (req, res) => {
    const { id, clienteId, descripcion, saldo, fecha } = req.body

    const cliente: any = await Cliente.findOne({ where: { id: clienteId }})

    if(cliente.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    const abono: any = await AbonoCliente.findOne({ where: { id } })

    cliente.saldo = cliente.saldo - saldo + abono.saldo
    await cliente.save()

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

    const abono: any = await AbonoCliente.findOne({ where: { id }})

    if(abono.usuarioId !== req.usuario.id) {
        return res.status(403).json({msg: 'Acción no Permitida', type: 'error' })
    }

    await abono.destroy()

    res.json({
        msg: 'El abono fue eliminado correctamente'
    })
}


export {
    clientes,
    crearCliente,
    updateCliente,
    eliminarCliente,
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