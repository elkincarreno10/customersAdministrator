import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext({})

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                return setCargando(false)
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/perfil', config)
                setAuth(data)
                navigate('/clientes')
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext