import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { login, registrar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/loginController.js";

const router = express.Router()

router.post('/', login)
router.post('/registrar', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.get('/recuperar-password/:token', comprobarToken)
router.post('/recuperar-password/:token', nuevoPassword)

router.get('/perfil', checkAuth, perfil)

export default router