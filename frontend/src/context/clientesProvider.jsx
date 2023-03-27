import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import Swal from 'sweetalert2'

const ClienteContext = createContext({})

const ClienteProvider = ({children}) => {

    const { auth } = useAuth()

    const [ clientes, setClientes ] = useState([])
    const [ clienteEditar, setClienteEditar ] = useState({})
    const [ clienteFacturas, setClienteFacturas ] = useState()
    const [ facturas, setFacturas ] = useState([])
    const [ facturaEditar, setFacturaEditar ] = useState({})
    const [ clienteAbonos, setClienteAbonos ] = useState()
    const [ abonos, setAbonos ] = useState([])
    const [ abonoEditar, setAbonoEditar ] = useState({})
    const [ alerta, setAlerta ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
      const obtenerClientes = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios('/api/clientes', config)
            setClientes(data?.clientes)
        } catch (error) {
            console.log(error)
        }
      }
      obtenerClientes()
    }, [auth])

    const nuevoCliente = async name => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/api/clientes/crear-cliente', {name: name}, config)
            const cliente = data?.cliente
            setClientes([...clientes, cliente])
            navigate('/clientes')
            setAlerta({
                msg: data?.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error?.response?.data?.msg,
                type: error?.response?.data?.type
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }
  
    const handleEditarCliente = async cliente => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/api/clientes/actualizar-cliente', cliente, config)
            setAlerta({
                msg: data?.msg
            })

            // Actualizar en el DOM
            clientes.map(clienteDOM => {
                if(clienteDOM.id === clienteEditar.id) {
                    clienteDOM.name = cliente.nameNuevo
                    clienteDOM.saldo = cliente.saldo
                } else {
                    return clienteDOM
                }
            })

            setClienteEditar({})

            navigate('/clientes')
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCliente = id => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Si eliminas un cliente no podrás recuperarlo!",
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
                    const eliminarCliente = async () => {
                        const { data } = await clienteAxios(`/api/clientes/eliminar-cliente/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data?.msg,
                            'success'
                        )
                        setClientes(clientes.filter(cliente => cliente.id !== id))
                    }
                    eliminarCliente()
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
    
            const { data } = await clienteAxios(`/api/clientes/facturas/${id}`, config)
            setFacturas(data?.facturas)
            setClienteFacturas(id)
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
    
            const { data } = await clienteAxios.post('/api/clientes/crear-factura', datos, config)
            const factura = data?.factura
            setAlerta({
                msg: data?.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const clientesActualizados = clientes.map(cliente => {
                if(cliente.id === datos.clienteId) {
                    cliente.saldo += datos.saldo
                    return cliente
                } else {
                    return cliente
                }
            })

            setClientes(clientesActualizados)

            obtenerFacturas(clienteFacturas)
            navigate(`/facturas-cliente/${clienteFacturas}`)
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
    
            const { data } = await clienteAxios.post('/api/clientes/editar-factura', datos, config)
            setAlerta({
                msg: data?.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const clientesActualizados = clientes.map(cliente => {
                if(cliente.id === datos.clienteId) {
                    cliente.saldo = cliente.saldo + datos.saldo - facturaEditar.saldo
                    return cliente
                } else {
                    return cliente
                }
            })

            setClientes(clientesActualizados)

            obtenerFacturas(clienteFacturas)
            navigate(`/facturas-cliente/${clienteFacturas}`)
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
                        const { data } = await clienteAxios(`/api/clientes/eliminar-factura/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data?.msg,
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
    
            const { data } = await clienteAxios(`/api/clientes/abonos/${id}`, config)
            setAbonos(data?.abonos)
            setClienteAbonos(id)
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
    
            const { data } = await clienteAxios.post('/api/clientes/crear-abono', datos, config)
            const abono = data?.abono
            setAlerta({
                msg: data?.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const clientesActualizados = clientes.map(cliente => {
                if(cliente.id === datos.clienteId) {
                    cliente.saldo -= datos.saldo
                    return cliente
                } else {
                    return cliente
                }
            })

            setClientes(clientesActualizados)

            obtenerAbonos(clienteAbonos)
            navigate(`/abonos-cliente/${clienteAbonos}`)
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
    
            const { data } = await clienteAxios.post('/api/clientes/editar-abono', datos, config)
            setAlerta({
                msg: data?.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

            const clientesActualizados = clientes.map(cliente => {
                if(cliente.id === datos.clienteId) {
                    cliente.saldo = cliente.saldo - datos.saldo + abonoEditar.saldo
                    return cliente
                } else {
                    return cliente
                }
            })

            setClientes(clientesActualizados)

            obtenerAbonos(clienteAbonos)
            navigate(`/abonos-cliente/${clienteAbonos}`)
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
                        const { data } = await clienteAxios(`/api/clientes/eliminar-abono/${id}`, config)
                        Swal.fire(
                            'Eliminado!',
                            data?.msg,
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
        <ClienteContext.Provider
            value={{
                clientes,
                setClientes,
                nuevoCliente,
                clienteEditar,
                setClienteEditar,
                handleEditarCliente,
                eliminarCliente,
                facturas,
                setFacturas,
                obtenerFacturas,
                clienteFacturas,
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
                clienteAbonos,
                nuevoAbono,
                actualizarAbono,
                abonoEditar,
                setAbonoEditar,
                eliminarAbono
            }}
        >
            {children}
        </ClienteContext.Provider>
    )
}

export {
    ClienteProvider
}

export default ClienteContext