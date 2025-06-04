import Style from './productsList.module.css'
import { useState, useEffect } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'

export default function ProductsList(){

    const [prod, setProd] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState('')
    const [editProdId, setEditProdId] = useState(null);
    const [editProdData, setEditProdData] = useState({description: '', price: '', quantity: '', Image: ''});


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



     const handleDelete = async (id) => {
        try{
            await api.delete(`/list/${id}`)
            console.log(data.id)
        }catch(err){
            setErro('Erro ao deletar usuario', err)
        }
    }

    const handleEditClick = (user) => {
        setEditProdId(user.id);
        setEditProdData({name: user.name, email: user.email, password: ''})
    }

    const handleEditChange = (e) => {
        const {name, value} = e.target
        setEditProdData({...editProdData, [name]: value})
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            await api.get(`/list/${setEditProdId}`, editProdData);
            setEditProdId(null);
            fetchProducts();
        }catch(err){
            setErro('Erro ao atualizar usuario' + err)
        }
    }

     if(loading) return <p>Carregando produtos...</p>
     if(erro) return <p className={{color: 'red'}}>Erro ao carregar os produtos</p>;

     return (
        <section>
          <Menu />
          <div className={Style.list_conteiner}>
            <h1>Lista de Produtos</h1>
            <div className={Style.wrapNav}>
              {prod.map((prod) => (
                <div key={prod.id} className={Style.wrapCards}>
                  {editProdId === prod.id ? (
                    <form
                      onSubmit={handleUpdate}
                      style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}
                    >
                      <input
                        type="text"
                        name="description"
                        value={editProdData.description}
                        onChange={handleEditChange}
                        required
                      />
                      <input
                        type="text"
                        name="quantity"
                        value={editProdData.quantity}
                        onChange={handleEditChange}
                        required
                      />
                      <input
                        type="text"
                        name="price"
                        value={editProdData.price}
                        onChange={handleEditChange}
                        placeholder="Novo preço"
                        required
                      />
                      <button type="submit">SALVAR</button>
                      <button type="button" onClick={() => setEditProdId(null)}>
                        CANCELAR
                      </button>
                    </form>
                  ) : (
                    <>
                      <img src={prod.Image} alt="Imagem do produto" />
                      <li className={Style.product_txt}>
                        <strong>{prod.description}</strong>
                        <p>Quantidade: {prod.quantity}</p>
                        <p>R$ {prod.price}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => handleEditClick(prod)}>EDITAR</button>
                          <button onClick={() => handleDelete(prod.id)}>DELETAR</button>
                        </div>
                      </li>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );      
}