import express from "express";
import { obreros, crearObrero, updateObrero, eliminarObrero } from "../controllers/obrerosController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router()

router.get('/', checkAuth, obreros)
router.post('/crear-obrero', checkAuth, crearObrero)
router.post('/actualizar-obrero', checkAuth, updateObrero)
router.get('/eliminar-obrero/:id', checkAuth, eliminarObrero)

export default router