import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CustomerAuth from './pages/CustomerAuth'
import WorkerAuth from './pages/WorkerAuth'
import "./index.css"; 
import About from './pages/about'
import CustomerDashboard from './pages/cust-dashboard'
import WorkerDashboard from './pages/WorkerDashboard'



function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customer-auth" element={<CustomerAuth/>}/>
        <Route path="/worker-auth" element={<WorkerAuth/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/worker-dashboard" element={<WorkerDashboard/>}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)