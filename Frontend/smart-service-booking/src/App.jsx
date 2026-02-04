
import './App.css'
import Home from './Pages/Home.jsx'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Services from './Pages/Services.jsx'
import Bookings from './Pages/Bookings.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'

function App() {

  return (
   
    <>
     <NavBar/>
   
   <Routes>
    <Route path='/register' element={ <Register/>}/>
    <Route path='/login' element={ <Login/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/bookings" element={<Bookings/>}/>
   </Routes>
   </>
  )
}

export default App
