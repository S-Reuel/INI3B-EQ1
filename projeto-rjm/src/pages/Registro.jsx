// import styles from '../ui/components/Registro/Registro.module.css'
import { useState } from 'react'
import { obterValor, postUser } from '../data/services/API.jsx'
import { redirecionar } from './util/functions.jsx'

import eyeOFF from "../ui/icons/eyeOFF.svg";
import eyeON from "../ui/icons/eyeON.svg";

import registroStyle from '../ui/styles/Shared/FormConta.module.css'

export default function Registro() {
    const [nome, setNome] = useState('')
    const [password, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')

    const [eye, setEye] = useState(eyeON)
    const [showPassword, setShowPassword] = useState('password')

    const excluido = false

    const onSave = async (e) => {
        e.preventDefault()
        let res = postUser({ nome, email, password, user_git, excluido })
        if (await obterValor(res) == true) {
            redirecionar('login')
        } else {
            alert('Credenciais inválidas')
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
            <div className={registroStyle.page}>
                <div className={registroStyle.logo}>
                    <img
                        /*a imagem é carregada em  projeto-rjm\src\ui\styles\Shared\FormConta.module.css*/
                        alt="codra icone"
                        className={registroStyle.logoImage}
                    />
                </div>
                <center className={registroStyle.center}>
                    <h1 className={registroStyle.pageText}>Faça seu Cadastro!</h1>
                    <form className={registroStyle.form}>
                        <label>
                            Nome:<br />
                            <input
                                className={registroStyle.input}
                                type="text" nome="nome"
                                placeholder="Digite seu nome" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            E-mail:<br />
                            <input
                                className={registroStyle.input}
                                type="mail" nome="email"
                                placeholder="Digite seu e-mail" required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Nome no Github:<br />
                            <input
                                className={registroStyle.input}
                                type="text" nome="ng"
                                placeholder="Digite seu nome no github" required
                                onChange={(e) => setNg(e.target.value)}
                            />
                        </label>
                        <br />
                        <div > 
                            <label >
                                Senha:
                                <br />
                                <input
                                    className={registroStyle.input}
                                     type={showPassword}  nome="senha"
                                    placeholder="Digite sua senha" required
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </label>
                            <div className={registroStyle.ab}>
                                <img className={registroStyle.passwordEye} src={eye} onClick={() => toggleShowPassword()}/>
                            </div>
                        </div>
                        <br />
                        <button type="submit" onClick={onSave} className={registroStyle.formButton}>Enviar</button>
                    </form>
                    <div className={registroStyle.SignUpForgot}>
                        <p>
                            Já tem uma conta?   <a href="/login" className={registroStyle.link}>Login</a>
                        </p>
                    </div>
                </center>
            </div>
        )
    } else {
        return (redirecionar("prin"))
    }

}