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
import SearchPage from './pages/SearchPage'
import WorkerProfileEdit from './pages/WorkerProfileEdit'
import NotFound from './pages/NotFound'
import UserProfile from './pages/cust-Profile'
import Messages from './pages/cust-Messages'
import WorkerMessages from './pages/WorkerMessages'
import Favorites from './pages/Favorites'
import WorkerReviews from './pages/WorkerReviews'
import WorkersSearch from './pages/WorkersSearch'
import WorkerDetail from './pages/WorkerDetail'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customer-auth" element={<CustomerAuth/>}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/customer-Favorites" element={<Favorites/>}/>
        <Route path="/Messages" element={<Messages/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/worker-auth" element={<WorkerAuth/>}/>
        <Route path="/worker-dashboard" element={<WorkerDashboard/>}/>
        <Route path="/worker-profile-edit" element={<WorkerProfileEdit/>}/>
        <Route path="/worker-messages" element={<WorkerMessages/>}/>
        <Route path="/worker-reviews" element={<WorkerReviews/>}/>
        <Route path="/workers-search" element={<WorkersSearch/>}/>
        <Route path="/worker-detail/:id" element={<WorkerDetail />} />
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)