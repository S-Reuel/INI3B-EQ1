import '../ui/components/Login/Login.css'
import React, { useState } from "react";
import { postLogin } from "../data/services/API.jsx";

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 

    const onSave = async (e) => {
        e.preventDefault()
        let mensagem = await postLogin({email, password})
        document.getElementById("response").innerHTML = mensagem
    } 

    return (
        <div className='login'>
            <div className='quadrado'>
                
                    <h1 className='titulo'>Faça seu Login!</h1>
                    <form onSubmit={onSave}>
                            <label>
                                E-mail:<br/>
                                <input 
                                    type="email" name="email"
                                    placeholder="Digite seu e-mail" required
                                    value={email} autoComplete='off'
                                    onChange={(e)=> setEmail(e.target.value)}    
                                />
                            </label>
                            <br/>
                            <label >
                                Senha:<br/>
                                <input 
                                    type="password" name="senha"
                                    placeholder="Digite sua senha" required
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                />
                                <br/>
                                <a href="login/recSenha">Esqueci minha senha</a>
                                <br/>
                            </label>
                        <button type="submit">Entrar</button>
                    </form>
                    <a href="/registro"><button>Cadastre-se</button></a>
                    <a href="/"><button>Voltar</button></a>
            </div>
        </div>
    );
}