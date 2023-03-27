import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"


const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
      e.preventDefault()

      if([email, password].includes('')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          type: 'error'
        })
        return
      }

      try {
        const { data } = await clienteAxios.post('/api/', {email, password})
        localStorage.setItem('token', data?.token)
        setEmail('')
        setPassword('')
        setAlerta({})
        setAuth(data)
        navigate('/clientes')
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
      <h1 className="text-4xl text-center font-bold">Inicia Sesión y <span className="text-indigo-600">Adimistra tu Negocio</span></h1>

        {msg && <Alerta alerta={alerta} />}

      <form 
        className="flex flex-col gap-3 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold uppercase text-md">Email</label>
            <input 
                className="p-1 pl-2 rounded-lg"
                type="email"
                placeholder="Ingresa con tu usuario"
                id="email"
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
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

      <div className="flex flex-col gap-1 mt-6 text-center">
        <Link to='/login/crear-cuenta' className="text-sm text-gray-600 hover:text-gray-800">¿No tienes una cuenta? Crea una</Link>
        <Link to='/login/olvide-password' className="text-sm text-gray-600 hover:text-gray-800">¿Olvidaste tu password? Recuperalo Aquí</Link>
      </div>
    </div>
  )
}

export default Login
