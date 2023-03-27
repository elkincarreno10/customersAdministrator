import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const Confirmar = () => {

    const { token } = useParams()
    const [ alerta, setAlerta ] = useState({})
    const [ confirmado, setConfirmado ] = useState(false)

    useEffect(() => {
        const verificarToken = async () => {
          try {
              const { data } = await clienteAxios.get(`/confirmar/${token}`)
              setConfirmado(true)
              setAlerta({msg: data.msg})
          } catch (error) {
              setAlerta({
                  msg: error.response.data.msg,
                  type: error.response.data.type
              })
              console.log('hi')
  
              setTimeout(() => {
                  setAlerta({})
              }, 3000);
          }
        }

        verificarToken()
    }, [])

    const { msg } = alerta

  return (
    <div className="bg-indigo-200 px-5 py-5 md:p-20 max-w-2xl w-full rounded-lg shadow-lg shadow-indigo-500">
      <h1 className="text-4xl text-center font-bold">Confirma tu cuenta y <span className="text-indigo-600">Adimistra tu Negocio</span></h1>

        {msg && <Alerta alerta={alerta} />}

      {confirmado ? (
        <div className="flex flex-col gap-1 mt-6 text-center">
            <Link to='/login' className="text-sm text-gray-600 hover:text-gray-800">Inicia Sesión</Link>
        </div>
      ) : ''}
    </div>
  )
}

export default Confirmar