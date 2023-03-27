import express from "express";
import { clientes, crearCliente, updateCliente, eliminarCliente, obtenerFacturas, crearFactura, updateFactura, eliminarFactura, cambiarEstado, obtenerAbonos, crearAbono, updateAbono, eliminarAbono } from "../controllers/clientesController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router()

router.get('/', checkAuth, clientes)
router.post('/crear-cliente', checkAuth, crearCliente)
router.post('/actualizar-cliente', checkAuth, updateCliente)
router.get('/eliminar-cliente/:id', checkAuth, eliminarCliente)


router.get('/facturas/:id', checkAuth, obtenerFacturas)
router.post('/crear-factura', checkAuth, crearFactura)
router.post('/editar-factura', checkAuth, updateFactura)
router.get('/eliminar-factura/:id', checkAuth, eliminarFactura)
router.get('/cambiar-estado/:id', checkAuth, cambiarEstado)

router.get('/abonos/:id', checkAuth, obtenerAbonos)
router.post('/crear-abono', checkAuth, crearAbono)
router.post('/editar-abono', checkAuth, updateAbono)
router.get('/eliminar-abono/:id', checkAuth, eliminarAbono)

export default router