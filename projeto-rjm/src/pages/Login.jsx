import { useState } from "react";
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