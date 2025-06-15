import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router' 
import './index.css'
import App from './App.jsx'
import { UsersList } from './usersList.jsx'
import Dashboard from './dashboard.jsx'
import ProductsList from './productsList.jsx'
import SignUp from './signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/userslist' element={<UsersList />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/productslist' element={<ProductsList/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
    </BrowserRouter>
  </StrictMode>,
)
