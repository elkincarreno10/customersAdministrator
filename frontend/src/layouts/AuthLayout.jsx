import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="bg-gray-200 flex items-center justify-center h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout
