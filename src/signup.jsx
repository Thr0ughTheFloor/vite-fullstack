import Style from './signup.module.css'
import { useState, useEffect } from 'react'
import { api } from './api/api'

function SignUp(){
    return(
        <section>
            <div className={Style.wrapForm}>
                <form action="">
                <input type="text" placeholder='Name' required/>
                <input type="email" placeholder='Email' required/>
                <input type="password" placeholder='Senha' required/>
                <button type='submit'>Entrar</button>
                </form>
            </div>
        </section>
    )
}
export default SignUp