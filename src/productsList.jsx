import Style from './productsList.module.css'
import { useState, useEffect } from 'react'
import { api } from './api/api'

export default function ProductsList(){

    const [prod, setProd] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState('')


    useEffect(() => {
        async function fetchProducts(){
            try{
                const response = await api.get('/list')
                setProd(response.data)
                console.log(response.data)  
              }catch(error){
                  setErro('Erro ao carregar usuarios' + error)
              }finally{
                  setLoading(false)
              }
        }
        fetchProducts()
     },[])

     if(loading) return <p>Carregando produtos...</p>
     if(erro) return <p className={{color: 'red'}}>Erro ao carregar os produtos</p>;


     return(
        <div style={Style.list_conteiner}>
            <h1>Lista de Produtos</h1>
            <ul>
                {prod.map((item) => (
                    <li className={Style.product_txt}>
                        <strong>{item.description}</strong> - R${item.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}