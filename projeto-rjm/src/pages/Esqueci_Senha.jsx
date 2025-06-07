// import styles from '../ui/components/Rec/Rec.module.css'
import { useState } from "react"
import { esqueciSenha } from "../data/services/API"
import { voltar } from "./util/functions"

export default function EsqueciSenha() {
    const [email, setEmail] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        let r = await esqueciSenha(email)
        let mensagem = r.data.alert
        if(mensagem == 'Um email de redefinição foi enviado'){
            location.href = '/login/redefinirSenha'
        } else {
            document.getElementById("response").innerHTML = JSON.stringify(mensagem)
        }
    } 

    return(
        <div>
            <center>
                <h1>Esqueceu sua Senha?</h1>
                <h3 id="response"></h3>
                <h4>Um código de recuperação será enviado</h4>
                <form onSubmit={onSave}>
                    <label>
                        <input 
                            type="email" name="email" 
                            placeholder="Digite seu e-mail" required
                            value={email} autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit">Enviar</button>
                </form>
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}