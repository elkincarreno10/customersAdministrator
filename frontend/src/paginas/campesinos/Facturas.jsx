import { Link, useNavigate } from 'react-router-dom'
import useCampesinos from "../../hooks/useCampesinos"
import Alerta from "../../components/Alerta"
import { formatearFecha } from '../../helpers/formatearFecha'
import { formatearPrecio } from '../../helpers/formatearDinero'
import clienteAxios from '../../config/clienteAxios'

const FacturasCampesino = () => {

    const navigate = useNavigate()

    const { facturas, setFacturas, setFacturaEditar, eliminarFactura, alerta } = useCampesinos()


    const { msg } = alerta

    const handleEditarFactura = factura => {
        setFacturaEditar(factura)
        navigate('/editar-factura-campesino')
    }

    const handleEditarEstado = async facturaActualizada => {
        const facturasNuevo = facturas.map(factura => {
            if(factura.id === facturaActualizada.id) {
                if(factura.estado === 0) {
                    factura.estado = 1
                } else {
                    factura.estado = 0
                }
                return factura
            } else {
                return factura
            }
        })
        setFacturas(facturasNuevo)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const cambio = await clienteAxios(`/campesinos/cambiar-estado/${facturaActualizada.id}`, config)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="bg-gray-50 flex-1 flex flex-col gap-3 py-10 px-10 lg:px-24">
        <h1 className="text-2xl font-bold text-center">Facturas</h1>
        <div className="flex justify-between">
            <Link to='/crear-factura-campesino' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 text-center w-32 mb-2">Nueva Factura</Link>
            <Link to='/campesinos' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 mb-2">Volver</Link>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-8">
        {facturas.length ? 
            facturas.map(factura => (
            <div className={`${factura.estado ? 'bg-blue-300' : 'bg-orange-200'} p-4 rounded-lg shadow-lg flex justify-between items-center`} key={factura.id}>
                <div className="flex flex-col">
                    <h1 className="font-bold">{factura.descripcion}</h1>
                    <h1>$ <span className="text-indigo-600 font-bold">{formatearPrecio(factura.saldo)}</span></h1>
                    <p className='text-sm'>{formatearFecha(factura.fecha)}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <button 
                        onClick={() => handleEditarEstado(factura)}
                        className={`${factura.estado ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-400 hover:bg-orange-600'} px-3 py-1 rounded-lg text-white`}
                    >{`${factura.estado ? 'Pagada' : 'Sin Pagar'}`}</button>
                    <button 
                        onClick={() => handleEditarFactura(factura)}
                        className="bg-amber-500 px-3 py-1 rounded-lg hover:bg-amber-600 text-white"
                    >Editar</button>
                    <button 
                        onClick={() => eliminarFactura(factura.id)}
                        className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                    >Eliminar</button>
                </div>

            </div>
            ))
        : <p className="text-center text-xl font-bold">No hay facturas registrados aún</p>}
        </div>
    </div>
  )
}

export default FacturasCampesino