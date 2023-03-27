import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import Swal from 'sweetalert2'

const CampesinoContext = createContext({})

const CampesinoProvider = ({children}) => {

    const { auth } = useAuth()

    const [ campesinos, setCampesinos ] = useState([])
    const [ campesinoEditar, setCampesinoEditar ] = useState({})
    const [ campesinoFacturas, setCampesinoFacturas ] = useState()
    const [ facturas, setFacturas ] = useState([])
    const [ facturaEditar, setFacturaEditar ] = useState({})
    const [ campesinoAbonos, setCampesinoAbonos ] = useState()
    const [ abonos, setAbonos ] = useState([])
    const [ abonoEditar, setAbonoEditar ] = useState({})
    const [ alerta, setAlerta ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
      const obtenerCampesinos = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios('/campesinos', config)
            setCampesinos(data.campesinos)
        } catch (error) {
            console.log(error)
        }
      }
      obtenerCampesinos()
    }, [auth])

    
    const nuevoCampesino = async name => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/crear-campesino', {name: name}, config)
            const campesino = data.campesino
            setCampesinos([ campesino, ...campesinos ])
            navigate('/campesinos')
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
  
    const handleEditarCampesino = async campesino => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/actualizar-campesino', campesino, config)
            setAlerta({
                msg: data.msg
            })

            // Actualizar en el DOM
            campesinos.map(campesinoDOM => {
                if(campesinoDOM.id === campesinoEditar.id) {
                    campesinoDOM.name = campesino.nameNuevo
                    campesinoDOM.saldo = campesino.saldo
                } else {
                    return campesinoDOM
                }
            })

            setCampesinoEditar({})

            navigate('/campesinos')
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCampesino = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Si eliminas un campesino no podrás recuperarlo!",
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
                    const eliminarCampesino = async () => {
                        const { data } = await clienteAxios(`/campesinos/eliminar-campesino/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data.msg,
                            'success'
                        )
                        setCampesinos(campesinos.filter(campesino => campesino.id !== id))
                    }
                    eliminarCampesino()
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const obtenerFacturas = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios(`/campesinos/facturas/${id}`, config)
            setFacturas(data.facturas)
            setCampesinoFacturas(id)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevaFactura = async factura => {
        const datos = {...factura, id: auth.id}
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/crear-factura', datos, config)
            const factura = data.factura
            setAlerta({
                msg: data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const campesinosActualizados = campesinos.map(campesino => {
                if(campesino.id === datos.campesinoId) {
                    campesino.saldo += datos.saldo
                    return campesino
                } else {
                    return campesino
                }
            })

            setCampesinos(campesinosActualizados)

            obtenerFacturas(campesinoFacturas)
            navigate(`/facturas-campesino/${campesinoFacturas}`)
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarFactura = async factura => {
        const datos = {...factura, id: facturaEditar.id}
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/editar-factura', datos, config)
            setAlerta({
                msg: data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const campesinosActualizados = campesinos.map(campesino => {
                if(campesino.id === datos.campesinoId) {
                    campesino.saldo = campesino.saldo + datos.saldo - facturaEditar.saldo
                    return campesino
                } else {
                    return campesino
                }
            })

            setCampesinos(campesinosActualizados)

            obtenerFacturas(campesinoFacturas)
            navigate(`/facturas-campesino/${campesinoFacturas}`)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarFactura = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Si eliminas una factura no podrás recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarla!'
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
                    const destruirFactura = async () => {
                        const { data } = await clienteAxios(`/campesinos/eliminar-factura/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data.msg,
                            'success'
                        )
                        setFacturas(facturas.filter(factura => factura.id !== id))
                    }
                    destruirFactura()
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const obtenerAbonos = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios(`/campesinos/abonos/${id}`, config)
            setAbonos(data.abonos)
            setCampesinoAbonos(id)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoAbono = async abono => {
        const datos = {...abono, id: auth.id}
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/crear-abono', datos, config)
            const abono = data.abono
            setAlerta({
                msg: data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const campesinosActualizados = campesinos.map(campesino => {
                if(campesino.id === datos.campesinoId) {
                    campesino.saldo -= datos.saldo
                    return campesino
                } else {
                    return campesino
                }
            })

            setCampesinos(campesinosActualizados)

            obtenerAbonos(campesinoAbonos)
            navigate(`/abonos-campesino/${campesinoAbonos}`)
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarAbono = async abono => {
        const datos = {...abono, id: abonoEditar.id}
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/campesinos/editar-abono', datos, config)
            setAlerta({
                msg: data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const campesinosActualizados = campesinos.map(campesino => {
                if(campesino.id === datos.campesinoId) {
                    campesino.saldo = campesino.saldo - datos.saldo + abonoEditar.saldo
                    return campesino
                } else {
                    return campesino
                }
            })

            setCampesinos(campesinosActualizados)

            obtenerAbonos(campesinoAbonos)
            navigate(`/abonos-campesino/${campesinoAbonos}`)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarAbono = async id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Si eliminas un abono no podrás recuperarlo!",
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
                    const destruirAbono = async () => {
                        const { data } = await clienteAxios(`/campesinos/eliminar-abono/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data.msg,
                            'success'
                        )
                        setAbonos(abonos.filter(abono => abono.id !== id))
                    }
                    destruirAbono()
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }


    return (
        <CampesinoContext.Provider
            value={{
                campesinos,
                setCampesinos,
                nuevoCampesino,
                campesinoEditar,
                setCampesinoEditar,
                handleEditarCampesino,
                eliminarCampesino,
                facturas,
                setFacturas,
                obtenerFacturas,
                campesinoFacturas,
                nuevaFactura,
                actualizarFactura,
                facturaEditar,
                setFacturaEditar,
                eliminarFactura,
                alerta,
                setAlerta,
                abonos,
                setAbonos,
                obtenerAbonos,
                campesinoAbonos,
                nuevoAbono,
                actualizarAbono,
                abonoEditar,
                setAbonoEditar,
                eliminarAbono
            }}
        >
            {children}
        </CampesinoContext.Provider>
    )
}

export {
    CampesinoProvider
}

export default CampesinoContext