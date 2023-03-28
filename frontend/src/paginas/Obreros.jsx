import { Link, useNavigate } from 'react-router-dom'
import useObreros from "../hooks/useObreros"
import Alerta from '../components/Alerta'
import { formatearPrecio } from '../helpers/formatearDinero'

const Obreros = () => {

  const navigate = useNavigate()

  const { obreros, setObreroEditar, eliminarObrero, alerta, cargando } = useObreros()
  
  const handleEditarObrero = cliente => {
    setObreroEditar(cliente)
    navigate('/editar-obrero')
  }

  const { msg } = alerta

  if(cargando) return 'Cargando...'

    return (
      <div className="bg-gray-50 flex-1 flex flex-col gap-3 py-10 px-10 lg:px-24">
        <h1 className="text-2xl font-bold text-center">Obreros</h1>
        <Link to='/crear-obrero' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 text-center w-32 mb-2">Nuevo Obrero</Link>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-8">
          {obreros?.length ? 
            obreros.map(obrero => (
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg flex justify-between items-center" key={obrero.id}>
                <div className="flex flex-col">
                  <h1 className="font-bold">{obrero.name}</h1>
                  <h1>Saldo: $ <span className="text-indigo-600 font-bold">{formatearPrecio(obrero.saldo)}</span></h1>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEditarObrero(obrero)}
                    className="bg-amber-500 px-3 py-1 rounded-lg hover:bg-amber-600 text-white"
                  >Editar</button>
                  <button 
                    onClick={() => eliminarObrero(obrero.id)}
                    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                  >Eliminar</button>
                </div>

              </div>
            ))
          : <p className="text-center text-xl font-bold">No hay obreros registrados aún</p>}
        </div>
      </div>
    )
  }
  
  export default Obreros