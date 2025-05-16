import React, { useState } from "react";
import { postLogin } from "../data/services/API.jsx";
import { onSession } from "../data/services/Session.jsx";

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 

    const onSave = async (e) => {
        e.preventDefault()
        let r = await postLogin({email, password}) 
        if(!(r.data.error == "unauthorized")){
            let t = r.data.token
            onSession('authToken', t)
            location.href = '/usuarios'
        } else {
            document.getElementById("response").innerHTML = JSON.stringify(mensagem)
        }
    } 

    return (
        <div className='login'>
            <center>
                <h1>Faça seu Login!</h1>
                <h3 id="response"></h3>
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
                            <a href="login/esqueciSenha">Esqueci minha senha</a>
                            <br/>
                        </label>
                    <button type="submit">Entrar</button>
                </form>
                <a href="/add/usuario"><button>Cadastre-se</button></a>
                <a href="/"><button>Voltar</button></a>
            </center>
        </div>
    );
}