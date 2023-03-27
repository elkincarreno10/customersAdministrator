import { useState } from "react"
import useCampesinos from "../../hooks/useCampesinos"
import { Link } from "react-router-dom"
import Alerta from "../../components/Alerta"
import { formatearPrecio } from '../../helpers/formatearDinero'

const CrearAbonoCampesino = () => {

  const { campesinoAbonos, nuevoAbono, alerta, setAlerta } = useCampesinos()

  const [ descripcion, setDescripcion ] = useState('')
  const [ saldo, setSaldo ] = useState(0)
  const [ fecha, setFecha ] = useState('')

  const agregarAbono = e => {
    e.preventDefault()

    if(descripcion === '' || saldo === 0 || fecha === '') {
        setAlerta({
            msg: 'Todos los Campos son Obligatorios',
            type: 'error'
        })
        setTimeout(() => {
            setAlerta({})
        }, 3000);
        return
    }

    setAlerta({})

    nuevoAbono({ descripcion, saldo, fecha, campesinoId: campesinoAbonos })

  }

  const { msg } = alerta

  return (
    <div className="flex-1 max-w-2xl mx-auto mt-16 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl mb-6">Agregar Nuevo Abono</h1>
        <Link to={`/abonos-campesino/${campesinoAbonos}`} className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg p-2">Volver</Link>
      </div>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="mt-4 bg-gray-200 rounded-lg shadow-lg p-10 space-y-5"
        onSubmit={agregarAbono}
      >
        <div className="flex gap-1 items-center">
            <label htmlFor="descripcion" className="font-bold uppercase text-md">Descripción: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="text"
                placeholder="Ingresa la descripción del abono"
                id="descripcion"
                name='descripcion'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <div className="flex gap-1 items-center">
            <label htmlFor="saldo" className="font-bold uppercase text-md">Saldo: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="number"
                placeholder="Ingresa el valor del abono"
                id="saldo"
                name='saldo'
                onChange={e => setSaldo(+e.target.value)}
            />
        </div>
        <p>Saldo Total: $ {formatearPrecio(saldo)}</p>
        <div className="flex gap-1 items-center">
            <label htmlFor="fecha" className="font-bold uppercase text-md">Fecha: </label>
            <input 
                className="p-1 pl-2 rounded-lg flex-1 ml-1"
                type="date"
                placeholder="Ingresa el saldo a actualizar"
                id="fecha"
                name='fecha'
                onChange={e => setFecha(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            className="mt-4 p-1 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 cursor-pointer w-28"
            value='Crear Abono'
        />
      </form>
    </div>
  )
}

export default CrearAbonoCampesino