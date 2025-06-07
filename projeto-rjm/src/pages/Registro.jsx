// import styles from '../ui/components/Registro/Registro.module.css'
import { useState } from 'react'
import { postUser } from '../data/services/API.jsx'
import registroStyle from '../ui/styles/Registro/Registro.module.css'
import { voltar } from "./util/functions"

export default function Registro() {
    const [nome, setNome] = useState('')
    const [password, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    const excluido = false

    const onSave = async (e) => {
        e.preventDefault()
        let res = postUser({nome, email, password, user_git, excluido})
        if(res.error == ""){
            
        } else {
            
        }
        
    }

    return (
        <div className={registroStyle.login}>
            <div className={registroStyle.logo}>
                <img 
                    src="/src/ui/icons/codra-icon-dark.svg" 
                    alt="codra icone"
                    className={registroStyle.logoImage}
                />
            </div>
            <center className={registroStyle.center}>
                <h1 className={registroStyle.loginText}>Faça seu Cadastro!</h1>
                <form className={registroStyle.form}>
                    <label>
                        Nome:<br/>
                        <input 
                            className={registroStyle.input}
                            type="text" nome="nome" 
                            placeholder="Digite seu nome" required 
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label >
                        Senha:
                        <br/>
                        <input 
                            className={registroStyle.input}
                            type="password" nome="senha" 
                            placeholder="Digite sua senha" required 
                            onChange={(e) => setSenha(e.target.value)}   
                        />
                    </label>
                    <br/>
                    <label>
                        E-mail:<br/>
                        <input               
                            className={registroStyle.input}
                            type="mail" nome="email" 
                            placeholder="Digite seu e-mail" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                    Nome no Github:<br/>
                    <input 
                        className={registroStyle.input}
                        type="text" nome="ng" 
                        placeholder="Digite seu nome no github" required
                        onChange={(e) => setNg(e.target.value)}
                    />
                    </label>
                    <br/>
                    <button type="submit" onClick={onSave} className={registroStyle.formButton}>Enviar</button>
                </form>
                    <div className={registroStyle.SignUpForgot}>
                        <p>
                            Já tem uma conta?   <a href="/login" className={registroStyle.link}>Login</a>
                        </p>
                    </div>            
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}