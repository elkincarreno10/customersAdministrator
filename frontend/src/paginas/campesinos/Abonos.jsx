import { Link, useNavigate } from 'react-router-dom'
import useCampesinos from "../../hooks/useCampesinos"
import Alerta from "../../components/Alerta"
import { formatearFecha } from '../../helpers/formatearFecha'
import { formatearPrecio } from '../../helpers/formatearDinero'

const AbonosCampesino = () => {

    const navigate = useNavigate()

    const { abonos, setAbonoEditar, eliminarAbono, alerta, cargando } = useCampesinos()


    const handleEditarAbono = abono => {
        setAbonoEditar(abono)
        navigate('/editar-abono-campesino')
    }

    const { msg } = alerta

    if(cargando) return 'Cargando...'

  return (
    <div className="bg-gray-50 flex-1 flex flex-col gap-3 py-10 px-10 lg:px-24">
        <h1 className="text-2xl font-bold text-center">Abonos</h1>
        <div className="flex justify-between">
            <Link to='/crear-abono-campesino' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 text-center w-32 mb-2">Nuevo Abono</Link>
            <Link to='/campesinos' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 mb-2">Volver</Link>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-8">
        {abonos?.length ? 
            abonos.map(abono => (
            <div className='bg-gray-300 p-4 rounded-lg shadow-lg flex justify-between items-center' key={abono.id}>
                <div className="flex flex-col">
                    <h1 className="font-bold">{abono.descripcion}</h1>
                    <h1>$ <span className="text-indigo-600 font-bold">{formatearPrecio(abono.saldo)}</span></h1>
                    <p className='text-sm'>{formatearFecha(abono.fecha)}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <button 
                        onClick={() => handleEditarAbono(abono)}
                        className="bg-amber-500 px-3 py-1 rounded-lg hover:bg-amber-600 text-white"
                    >Editar</button>
                    <button 
                        onClick={() => eliminarAbono(abono.id)}
                        className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                    >Eliminar</button>
                </div>

            </div>
            ))
        : <p className="text-center text-xl font-bold">No hay abonos registrados aún</p>}
        </div>
    </div>
  )
}

export default AbonosCampesino