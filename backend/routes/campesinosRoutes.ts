import express from "express";
import { campesinos, crearCampesino, updateCampesino, eliminarCampesino, obtenerFacturas, crearFactura, updateFactura, eliminarFactura, cambiarEstado, obtenerAbonos, crearAbono, updateAbono, eliminarAbono } from "../controllers/campesinosController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router()

router.get('/', checkAuth, campesinos)
router.post('/crear-campesino', checkAuth, crearCampesino)
router.post('/actualizar-campesino', checkAuth, updateCampesino)
router.get('/eliminar-campesino/:id', checkAuth, eliminarCampesino)


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