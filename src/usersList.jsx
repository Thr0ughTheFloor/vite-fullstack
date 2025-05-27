import Style from './usersList.module.css'
import { useEffect, useState } from 'react'
import { api } from './api/api'


export const UsersList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function fetchUsers(){
            try{
              const response = await api.get('/users')
              setUsers(response.data)
              console.log(response.data)  
            }catch(error){
                setErro('Erro ao carregar usuarios' + error)
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    if(loading) return <p>Carregando Usuarios...</p>
    if(erro) return <p>{erro}</p>

    return(
        <div className={Style.wrapAll}>
            <h1>Lista de usuarios</h1>
            <ul>
                {users.map((item) => (
                    <li>
                        <strong>{item.name}</strong> - {item.id}
                    </li>
                ))}
            </ul>
        </div>
    )
}