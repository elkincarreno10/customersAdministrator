import { useState } from "react"
import useClientes from "../../hooks/useClientes"
import { Link } from "react-router-dom"
import { formatearPrecio } from '../../helpers/formatearDinero'

const EditarCliente = () => {

  const { clienteEditar, handleEditarCliente } = useClientes()

  const [ name, setName ] = useState(clienteEditar.name)
  const [ saldo, setSaldo ] = useState(clienteEditar.saldo)
  const [ saldoActualizado, setSaldoActualizado ] = useState(saldo)


  const actualizarSaldo = e => {
    const saldoNuevo = (+e.target.value) + (+saldo)
    setSaldoActualizado(saldoNuevo)
  }

  const editarCliente = e => {
    e.preventDefault()
    handleEditarCliente({name: clienteEditar.name, nameNuevo: name, saldo: saldoActualizado})
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto mt-16 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl mb-6">Cliente: <span className="text-indigo-800">{clienteEditar.name}</span></h1>
        <Link to='/clientes' className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2">Volver</Link>
      </div>
      <form
        className="mt-4 bg-gray-200 rounded-lg shadow-lg p-10 space-y-5"
        onSubmit={editarCliente}
      >
        <div className="flex gap-1 items-center">
            <label htmlFor="name" className="font-bold uppercase text-md">Nombre: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="text"
                placeholder="Ingresa el nombre de su Cliente"
                id="name"
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
        <div className="flex gap-1 items-center">
            <label htmlFor="saldo" className="font-bold uppercase text-md">Saldo: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="number"
                placeholder="Ingresa el saldo a actualizar"
                id="saldo"
                name='saldo'
                onChange={actualizarSaldo}
            />
        </div>
        <p>Saldo Total: $ {formatearPrecio(saldoActualizado)}</p>
        <input 
            type="submit" 
            className="mt-4 p-1 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 cursor-pointer w-28"
            value='Actualizar'
        />
      </form>
    </div>
  )
}

export default EditarCliente
