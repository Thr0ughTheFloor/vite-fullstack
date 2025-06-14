/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
      navigate('/dashboard')
    }
  }, [navigate])


  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const response = await api.post('/login', { email, password });
      const user = response.data;
  

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/dashboard')
    }catch(err){
      setMessage('erro no login', err)
    }
  }


  // const handleSign = async(e) => {
  //   e.preventDefault()
  //   try{

  //   }catch(){

  //   }
  // }

  return (
    <div className='wrapLogin'>
      <div className='wrapImg'>
          <div className='degrade'></div>
      </div>
      <div className='wrapForm'>
            <form onSubmit={handleLogin}>
              <h2>login</h2>
              <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <input type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button type='submit'>Entrar</button>
              <p style={{color: 'red'}}>{message}</p>
              <button type='button' className='SignBtn' onClick={() => {navigate('/signup')}}>Criar conta</button>
            </form>
          </div>
    </div>
  )
}

export default App
