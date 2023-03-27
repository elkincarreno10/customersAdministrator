import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth, cerrarSesionAuth } = useAuth()

  return (
    <aside className='max-w-xs flex-0 min-h-screen px-4 lg:px-8 py-10 bg-indigo-300'>
      <h1 className='mb-14 text-3xl text-center font-bold'><span className='text-indigo-800'>Administra tu empresa</span> creando clientes y obreros</h1>
      <div className='mb-12'>
        <h2 className='font-extrabold text-lg'>Bienvenido: <span className='text-indigo-800'>{auth?.name}</span></h2>
      </div>
      <nav className='flex flex-col gap-6'>
        <Link to='/clientes' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Clientes</Link>
        <Link to='/campesinos' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Campesinos</Link>
        <Link to='/obreros' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Obreros</Link>
      </nav>

      <button
        className='bg-gray-800 hover:bg-gray-700 text-white p-3 mt-16 rounded-lg'
        onClick={cerrarSesionAuth}
      >Cerrar Sesión</button>
    </aside>
  )
}

export default Sidebar
