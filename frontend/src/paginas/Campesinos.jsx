import { Link, useNavigate } from 'react-router-dom'
import useCampesinos from "../hooks/useCampesinos"
import Alerta from '../components/Alerta'
import { formatearPrecio } from '../helpers/formatearDinero'

const Campesinos = () => {

  const navigate = useNavigate()

  const { campesinos, setCampesinoEditar, eliminarCampesino, obtenerFacturas, alerta, obtenerAbonos } = useCampesinos()
  
  const handleEditarCampesino = campesino => {
    setCampesinoEditar(campesino)
    navigate('/editar-campesino')
  }

  const handleFacturas = id => {
    obtenerFacturas(id)
    navigate(`/facturas-campesino/${id}`)
  }

  const handleAbonos = id => {
    obtenerAbonos(id)
    navigate(`/abonos-campesino/${id}`)
  }

  const { msg } = alerta

    return (
      <div className="bg-gray-50 flex-1 flex flex-col gap-3 py-10 px-10 lg:px-24">
        <h1 className="text-2xl font-bold text-center">Campesinos</h1>
        <Link to='/crear-campesino' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 text-center w-40 mb-2">Nuevo Campesino</Link>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-8">
          {campesinos?.length ? 
            campesinos.map(campesino => (
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg flex justify-between items-center" key={campesino.id}>
                <div className="flex flex-col">
                  <h1 className="font-bold">{campesino.name}</h1>
                  <h1>Se le debe: $ <span className="text-indigo-600 font-bold">{formatearPrecio(campesino.saldo)}</span></h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                  <button 
                    onClick={() => handleAbonos(campesino.id)}
                    className="bg-indigo-500 px-3 py-1 rounded-lg hover:bg-indigo-600 text-white"
                  >Abonos</button>
                  <button 
                    onClick={() => handleFacturas(campesino.id)}
                    className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 text-white"
                  >Facturas</button>
                  <button 
                    onClick={() => handleEditarCampesino(campesino)}
                    className="bg-amber-500 px-3 py-1 rounded-lg hover:bg-amber-600 text-white"
                  >Editar</button>
                  <button 
                    onClick={() => eliminarCampesino(campesino.id)}
                    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                  >Eliminar</button>
                </div>

              </div>
            ))
          : <p className="text-center text-xl font-bold">No hay campesinos registrados aún</p>}
        </div>
      </div>
    )
  }
  
  export default Campesinos