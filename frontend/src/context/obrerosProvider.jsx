import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import Swal from 'sweetalert2'

const ObreroContext = createContext({})

const ObreroProvider = ({children}) => {

    const { auth } = useAuth()

    const [ obreros, setObreros ] = useState([])
    const [ obreroEditar, setObreroEditar ] = useState({})
    const [ alerta, setAlerta ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
      const obtenerObreros = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios('/obreros', config)
            setObreros(data.obreros)
        } catch (error) {
            console.log(error)
        }
      }
      obtenerObreros()
    }, [auth])

    const nuevoObrero = async name => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/obreros/crear-obrero', {name: name}, config)
            const obrero = data.obrero
            setObreros([...obreros, obrero])
            navigate('/obreros')
            setAlerta({
                msg: data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                type: error.response.data.type
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }
  
    const handleEditarObrero = async obrero => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/obreros/actualizar-obrero', obrero, config)
            setAlerta({
                msg: data.msg
            })

            // Actualizar en el DOM
            obreros.map(obreroDOM => {
                if(obreroDOM.id === obreroEditar.id) {
                    obreroDOM.name = obrero.nameNuevo
                    obreroDOM.saldo = obrero.saldo
                } else {
                    return obreroDOM
                }
            })

            setObreroEditar({})

            navigate('/obreros')
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarObrero = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Si eliminas un obrero no podrás recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token')
                    if(!token) return
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const eliminarObrero = async () => {
                        const { data } = await clienteAxios(`/obreros/eliminar-obrero/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data.msg,
                            'success'
                        )
                        setObreros(obreros.filter(obrero => obrero.id !== id))
                    }
                    eliminarObrero()
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <ObreroContext.Provider
            value={{
                obreros,
                setObreros,
                nuevoObrero,
                obreroEditar,
                setObreroEditar,
                handleEditarObrero,
                eliminarObrero,
                alerta,
                setAlerta
            }}
        >
            {children}
        </ObreroContext.Provider>
    )
}

export {
    ObreroProvider
}

export default ObreroContext