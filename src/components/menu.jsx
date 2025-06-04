import { useNavigate } from 'react-router'
import style from './menu.module.css'
import menuImg from '../assets/menuIcon.png'
import { useState } from 'react';

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToUsers = () => navigate('/userslist')
    const goToDashboard = () => navigate('/dashboard')
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    };

    return(
        <nav className={open ? style.NavBar : style.NavBarClosed}>
            <img src={menuImg} alt="logo"s onClick={() => setOpen(prev => !prev)}/>
            <p onClick={goToDashboard}>Dashboard</p>
            <p>Criar Usuario</p>
            <p onClick={goToUsers}>Lista de Usuario</p>
            <p>Criar Produto</p>
            <p>Lista de Produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}