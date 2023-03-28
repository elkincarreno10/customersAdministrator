import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth, cerrarSesionAuth } = useAuth()
    const [ menu, setMenu ] = useState(false)


    const mostrarMenu = () => {
      setMenu(!menu)
    }

  
  return (
    <aside className='md:max-w-xs md:flex-0 md:min-h-screen px-4 lg:px-8 py-4 md:py-10 bg-indigo-300'>
      <div className='max-w-md mx-auto'>
        <h1 className='mb-4 md:mb-14 text-3xl text-center font-bold'><span className='text-indigo-800'>Administra tu empresa</span> creando clientes y obreros</h1>
        <div className='mb-3 md:mb-12 hidden md:block'>
          <h2 className='font-extrabold text-lg'>Bienvenido: <span className='text-indigo-800'>{auth?.name}</span></h2>
        </div>
        <div className='md:hidden'>
          <img 
            className='w-12 mx-auto mb-4 cursor-pointer' 
            src="menu.png" 
            alt="Menu de Hamburguesa" 
            onClick={mostrarMenu}
          />
        </div>
        <div className={`${menu ? 'block' : 'hidden'} md:block`}>
          <nav className='flex flex-col gap-6'>
            <Link to='/clientes' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Clientes</Link>
            <Link to='/campesinos' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Campesinos</Link>
            <Link to='/obreros' className='bg-indigo-600 text-center text-white p-1 rounded-lg hover:bg-indigo-700' >Obreros</Link>
          </nav>

          <button
            className='bg-gray-800 hover:bg-gray-700 text-white p-3 mt-4 md:mt-16 rounded-lg'
            onClick={cerrarSesionAuth}
          >Cerrar Sesión</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
