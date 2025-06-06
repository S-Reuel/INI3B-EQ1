import { useState } from "react";
import { postLogin } from "../data/services/API.jsx";
import loginStyle from '../ui/styles/Login/Login.module.css'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 

    const onSave = async (e) => {
        e.preventDefault()
        let mensagem = await postLogin({email, password})
        document.getElementById("response").innerHTML = mensagem
    } 

    return (
        
        <div className={loginStyle.login}>
            <div className={loginStyle.logo}>
                <img 
                    src="src/ui/icons/codra-icon-dark.svg" 
                    alt="codra icone"
                    className={loginStyle.logoImage}
                />
            </div>
            <center className={loginStyle.center}>
                <h1 className={loginStyle.loginText}>Login</h1>
                <h3 id="response"></h3>
                <form onSubmit={onSave} className={loginStyle.form}>
                        <label>
                            E-mail<br/>
                            <input 
                                className={loginStyle.inputEmail}
                                type="email" name="email"
                                placeholder="Digite seu e-mail" required
                                value={email} autoComplete='off'
                                onChange={(e)=> setEmail(e.target.value)}    
                            />
                        </label>
                        <br/>
                        <label>
                            Senha<br/>
                            <input 
                                className={loginStyle.inputPassword}
                                type="password" name="senha"
                                placeholder="Digite sua senha" required
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            <br/>
                            <br/>
                        </label>
                    <button type="submit" className={loginStyle.formButton}>Continuar</button>
                </form>
                <div className={loginStyle.SignUpForgot}>
                    
                    <p>
                       Esqueceu a senha?   <a href="/login/esqueciSenha" className={loginStyle.linkForgotPassword}>Redefinir</a><br/>
                       Não tem uma conta?   <a href="/add/usuario" className={loginStyle.linkSignUp}>Cadastre-se</a>
                    </p>
                    <br/>
                </div>
            </center>
        </div>
    );
}