import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"


const RecuperarPassword = () => {

    const { token } = useParams()

    const [ password, setPassword ] = useState('')
    const [ confirmado, setConfirmado ] = useState(false)
    const [ alerta, setAlerta ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const { data } = await clienteAxios(`/api/recuperar-password/${token}`)
                setConfirmado(true)
                setAlerta({msg: data?.msg})
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
        verificarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if([password].includes('')) {
          setAlerta({
            msg: 'Todos los campos son obligatorios',
            type: 'error'
          })
          return
        }

        try {
            const { data } = await clienteAxios.post(`/api/recuperar-password/${token}`, {password})
            setPassword('')
            setAlerta({msg: data?.msg})
            navigate('/login')
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

    const { msg } = alerta

  return (
    <div className="bg-indigo-200 px-5 py-5 md:p-20 max-w-2xl w-full rounded-lg shadow-lg shadow-indigo-500">
      <h1 className="text-4xl text-center font-bold">Crea una cuenta y <span className="text-indigo-600">Adimistra tu Negocio</span></h1>

        {msg && <Alerta alerta={alerta} />}

      {confirmado ? (
        <form 
            className="flex flex-col gap-3 mt-10"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-bold uppercase text-md">Password</label>
                <input 
                    className="p-1 pl-2 rounded-lg"
                    type="password"
                    placeholder="Tu Password"
                    id="password"
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                className="mt-4 p-1 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 cursor-pointer w-28"
            />
        </form>
      ) : ''}
    </div>
  )
}

export default RecuperarPassword