import { useState } from "react"
import useClientes from "../../hooks/useClientes"
import { Link } from "react-router-dom"
import Alerta from "../../components/Alerta"

const CrearCliente = () => {

  const { nuevoCliente, alerta, setAlerta } = useClientes()

  const [ name, setName ] = useState('')

  const agregarCliente = e => {
    e.preventDefault()

    if(name === '') {
        setAlerta({
            msg: 'Coloca un Nombre Válido',
            type: 'error'
        })
        return
    }

    setAlerta({})
    nuevoCliente(name)
  }

  const { msg } = alerta

  return (
    <div className="flex-1 max-w-2xl mx-auto mt-16 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl mb-6">Agregar Nuevo Cliente</h1>
        <Link to='/clientes' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2">Volver</Link>
      </div>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="mt-4 bg-gray-200 rounded-lg shadow-lg p-10 space-y-5"
        onSubmit={agregarCliente}
      >
        <div className="flex gap-1 items-center">
            <label htmlFor="name" className="font-bold uppercase text-md">Nombre: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="text"
                placeholder="Ingresa el nombre del Nuevo Cliente"
                id="name"
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            className="mt-4 p-1 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 cursor-pointer w-28"
            value='Agregar'
        />
      </form>
    </div>
  )
}

export default CrearCliente