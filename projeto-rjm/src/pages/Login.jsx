import { useState } from "react";
import { postLogin } from "../data/services/API.jsx";
import { redirecionar } from "./util/functions.jsx";

import eyeOFF from "../ui/icons/eyeOFF.svg";
import eyeON from "../ui/icons/eyeON.svg";

import loginStyle from '../ui/styles/Shared/FormConta.module.css'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState('password')
    const [eye, setEye] = useState(eyeON)
    const onSave = async (e) => {
        e.preventDefault()
        let mensagem = await postLogin({ email, password })
        if (mensagem != undefined) {
            document.getElementById("response").innerHTML = "Credenciais inválidas"
        }
    }

    const toggleShowPassword = () => {
        if(showPassword === 'password')
        {
            setShowPassword("text") 
            setEye(eyeOFF)
        }
        else
        {
            setShowPassword("password")
            setEye(eyeON)
        }
    }

    if (!localStorage.getItem('authToken')) {
        return (
            <div className={loginStyle.page}>
                <div className={loginStyle.logo}>
                    <img
                        /*a imagem é carregada em  projeto-rjm\src\ui\styles\Shared\FormConta.module.css*/
                        alt="codra icone"
                        className={loginStyle.logoImage}
                    />
                </div>
                <center className={loginStyle.center}>
                    <h1 className={loginStyle.pageText}>Login</h1>
                    <h3 className={loginStyle.response} id="response"></h3>
                    <form onSubmit={onSave} className={loginStyle.form}>
                        <label>
                            E-mail<br />
                            <input
                                className={loginStyle.input}
                                type="email" name="email"
                                placeholder="Digite seu e-mail" required
                                value={email} autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            Senha<br />
                            <div>
                                    <input
                                        className={loginStyle.input}
                                        type={showPassword} name="senha"
                                        placeholder="Digite sua senha" required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                <div className={loginStyle.ab}>
                                    <img className={loginStyle.passwordEye} src={eye} onClick={() => toggleShowPassword()}/>
                                </div>
                            </div>
                            <br />
                            <br />
                        </label>
                        <button type="submit" className={loginStyle.formButton}>Continuar</button>
                    </form>
                    <div className={loginStyle.SignUpForgot}>

                        <p>
                            Esqueceu a senha?   <a href="/login/esqueciSenha" className={loginStyle.link}>Redefinir</a><br />
                            Não tem uma conta?   <a href="/add/usuario" className={loginStyle.link}>Cadastre-se</a>
                        </p>
                        <br />
                    </div>
                </center>
            </div>
        );
    } else {
        return (redirecionar("prin"))
    }

}