// import styles from '../ui/components/Registro/Registro.module.css'
import { useState } from 'react'
import { postUser } from '../data/services/API.jsx'
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
        <div className='registro'>
            <center>
                <h1>Faça seu Cadastro!</h1>
                <form>
                    <label>
                        Nome:<br/>
                        <input 
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
                            type="password" nome="senha" 
                            placeholder="Digite sua senha" required 
                            onChange={(e) => setSenha(e.target.value)}   
                        />
                    </label>
                    <br/>
                    <label>
                        E-mail:<br/>
                        <input 
                            type="mail" nome="email" 
                            placeholder="Digite seu e-mail" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                    Nome no Github:<br/>
                    <input 
                        type="text" nome="ng" 
                        placeholder="Digite seu nome no github" required
                        onChange={(e) => setNg(e.target.value)}
                    />
                    </label>
                    <br/>
                    <button type="submit" onClick={onSave}>Enviar</button>
                </form>
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}