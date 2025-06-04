import { useNavigate } from 'react-router'
import style from './dashboard.module.css'
import { useEffect, useState } from 'react'
import { Menu } from './components/menu'
import { api } from './api/api'


function Dashboard(){
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0)
    const [productCount, setProductCount] = useState(0)


    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(!storedUser) navigate('/')
    }, [navigate])

    useEffect(() => {
        async function fetchData(){
            try{
                const[usersRes, productsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/list')
                ])
                setUserCount(usersRes.data.length)
                setProductCount(productsRes.data.length)
            }catch(err){
                console.error("Erro ao buscar os dados")
            }
        }
        fetchData()
    }, [])
    

    console.log(userCount, productCount)

    return(
        <section>
            <Menu/>
            <div className={style.wrapNav}>
                <div className={style.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar Produto</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('/#')}>
                    <p>Lista de Produtos</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar Usuario</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('/userslist')}>
                    <p>Lista de Usuario</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;