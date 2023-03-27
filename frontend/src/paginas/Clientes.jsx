import { Link, useNavigate } from 'react-router-dom'
import useClientes from "../hooks/useClientes"
import Alerta from '../components/Alerta'
import { formatearPrecio } from '../helpers/formatearDinero'

const Clientes = () => {

  const navigate = useNavigate()

  const { clientes, setClienteEditar, eliminarCliente, obtenerFacturas, alerta, obtenerAbonos } = useClientes()
  
  const handleEditarCliente = cliente => {
    setClienteEditar(cliente)
    navigate('/editar-cliente')
  }

  const handleFacturas = id => {
    obtenerFacturas(id)
    navigate(`/facturas-cliente/${id}`)
  }

  const handleAbonos = id => {
    obtenerAbonos(id)
    navigate(`/abonos-cliente/${id}`)
  }

  const { msg } = alerta

    return (
      <div className="bg-gray-50 flex-1 flex flex-col gap-3 py-10 px-10 lg:px-24">
        <h1 className="text-2xl font-bold text-center">Clientes</h1>
        <Link to='/crear-cliente' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2 text-center w-32 mb-2">Nuevo Cliente</Link>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-8">
          {clientes.length ? 
            clientes.map(cliente => (
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg flex justify-between items-center" key={cliente.id}>
                <div className="flex flex-col">
                  <h1 className="font-bold">{cliente.name}</h1>
                  <h1>Debe: $ <span className="text-indigo-600 font-bold">{formatearPrecio(cliente.saldo)}</span></h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                  <button 
                    onClick={() => handleAbonos(cliente.id)}
                    className="bg-indigo-500 px-3 py-1 rounded-lg hover:bg-indigo-600 text-white"
                  >Abonos</button>
                  <button 
                    onClick={() => handleFacturas(cliente.id)}
                    className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 text-white"
                  >Facturas</button>
                  <button 
                    onClick={() => handleEditarCliente(cliente)}
                    className="bg-amber-500 px-3 py-1 rounded-lg hover:bg-amber-600 text-white"
                  >Editar</button>
                  <button 
                    onClick={() => eliminarCliente(cliente.id)}
                    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                  >Eliminar</button>
                </div>

              </div>
            ))
          : <p className="text-center text-xl font-bold">No hay clientes registrados aún</p>}
        </div>
      </div>
    )
  }
  
  export default Clientes
  