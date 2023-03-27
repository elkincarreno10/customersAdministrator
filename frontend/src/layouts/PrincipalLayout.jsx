import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Sidebar from "../components/Sidebar"

const PrincipalLayout = () => {

  const { auth, cargando } = useAuth()

  if(cargando) return 'Caragando...'
  return (
    <>
      {auth.id ?
      (
        <>
          <main className="flex">
            <Sidebar />
            <Outlet />
          </main>
        </>
      ) : <Navigate to='/login' />}
    </>
  )
}

export default PrincipalLayout