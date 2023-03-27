import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import PrincipalLayout from "./layouts/PrincipalLayout"

import Login from "./paginas/Login"
import CrearCuenta from "./paginas/CrearCuenta"
import Confirmar from "./paginas/Confirmar"
import OlvidePassword from "./paginas/OlvidePassword"
import RecuperarPassword from "./paginas/RecuperarPassword"

import Clientes from "./paginas/Clientes"
import CrearCliente from "./paginas/clientes/CrearCliente"
import EditarCliente from "./paginas/clientes/EditarCliente"

import FacturasCliente from "./paginas/clientes/Facturas"
import CrearFacturaCliente from "./paginas/clientes/CrearFactura"
import EditarFacturaCliente from "./paginas/clientes/EditarFactura"

import AbonosCliente from "./paginas/clientes/Abonos"
import CrearAbonoCliente from "./paginas/clientes/CrearAbono"
import EditarAbonoCliente from "./paginas/clientes/EditarAbono"

import Campesinos from "./paginas/Campesinos"
import CrearCampesino from "./paginas/campesinos/CrearCampesino"
import EditarCampesino from "./paginas/campesinos/EditarCampesino"

import FacturasCampesino from "./paginas/campesinos/Facturas"
import CrearFacturaCampesino from "./paginas/campesinos/CrearFactura"
import EditarFacturaCampesino from "./paginas/campesinos/EditarFactura"

import AbonosCampesino from "./paginas/campesinos/Abonos"
import CrearAbonoCampesino from "./paginas/campesinos/CrearAbono"
import EditarAbonoCampesino from "./paginas/campesinos/EditarAbono"

import Obreros from "./paginas/Obreros"
import CrearObrero from "./paginas/CrearObrero"
import EditarObrero from "./paginas/EditarObrero"

import { AuthProvider } from "./context/authProvider"
import { ClienteProvider } from "./context/clientesProvider"
import { ObreroProvider } from "./context/obrerosProvider"
import { CampesinoProvider } from "./context/campesinosProvider"


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ClienteProvider>
          <CampesinoProvider>
            <ObreroProvider>
              <Routes>
                <Route path='/login' element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path='crear-cuenta' element={<CrearCuenta />} />
                  <Route path='confirmar/:token' element={<Confirmar />} />
                  <Route path='olvide-password' element={<OlvidePassword />} />
                  <Route path='recuperar-password/:token' element={<RecuperarPassword />} />
                </Route>

                <Route path='/' element={<PrincipalLayout />}>
                  <Route path="clientes" element={<Clientes />} />
                  <Route path="crear-cliente" element={<CrearCliente />} />
                  <Route path="editar-cliente" element={<EditarCliente />} />

                  <Route path="facturas-cliente/:id" element={<FacturasCliente />} />
                  <Route path="crear-factura-cliente" element={<CrearFacturaCliente />} />
                  <Route path="editar-factura-cliente" element={<EditarFacturaCliente />} />

                  <Route path="abonos-cliente/:id" element={<AbonosCliente />} />
                  <Route path="crear-abono-cliente" element={<CrearAbonoCliente />} />
                  <Route path="editar-abono-cliente" element={<EditarAbonoCliente />} />

                  <Route path="campesinos" element={<Campesinos />} />
                  <Route path="crear-campesino" element={<CrearCampesino />} />
                  <Route path="editar-campesino" element={<EditarCampesino />} />

                  <Route path="facturas-campesino/:id" element={<FacturasCampesino />} />
                  <Route path="crear-factura-campesino" element={<CrearFacturaCampesino />} />
                  <Route path="editar-factura-campesino" element={<EditarFacturaCampesino />} />

                  <Route path="abonos-campesino/:id" element={<AbonosCampesino />} />
                  <Route path="crear-abono-campesino" element={<CrearAbonoCampesino />} />
                  <Route path="editar-abono-campesino" element={<EditarAbonoCampesino />} />

                  <Route path="obreros" element={<Obreros />} />
                  <Route path="crear-obrero" element={<CrearObrero />} />
                  <Route path="editar-obrero" element={<EditarObrero />} />
                </Route>
              </Routes>
            </ObreroProvider>
          </CampesinoProvider>
        </ClienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
