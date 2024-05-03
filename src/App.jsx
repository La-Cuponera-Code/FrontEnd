import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import RegistroCuponero from "./pages/RegistroCuponero"
import RegistroVendedor from "./pages/RegistroVendedor";
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import PreLanzamiento from './pages/PreLanzamiento'
import Verify from './pages/Verify'
import Cuponeros from "./pages/Cuponeros"
import Vendedor from './pages/Vendedor';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

//CSS
import './App.css'
import "./css/home.css"
import "./css/map.css"
import "./css/nav.css"
import "./css/registro_cuponero.css"
import "./css/registro_vendedor.css"
import "./css/lanzamiento.css"
import "./css/container_map.css"
import "./css/vendedor.css"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup/cuponero/" element={<RegistroCuponero/>}/>
        <Route path="/signup/vendedor/" element={<RegistroVendedor/>}/>
        <Route path="/signup/verify/:userType/:email" element={<Verify />} />
        <Route path="/signin/" element={<SignIn/>}/>
        <Route path="/forgot-password/" element={<ForgotPassword/>}/>
        <Route path="/thank-you/:type" element={<PreLanzamiento/>}/>
        <Route path="/cuponeros" element={<Cuponeros/>}/>
        <Route path="/vendedor" element={<Vendedor/>}/>
      </Routes>
    </>
  )
}

export default App 
