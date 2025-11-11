import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CustomerAuth from './pages/CustomerAuth'
import WorkerAuth from './pages/WorkerAuth'
import "./index.css"; 
import About from './pages/about'


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customer-auth" element={<CustomerAuth/>}/>
        <Route path="/worker-auth" element={<WorkerAuth/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)