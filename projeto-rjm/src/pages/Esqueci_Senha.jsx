// import styles from '../ui/components/Rec/Rec.module.css'
import { useState } from "react";
import { esqueciSenha } from "../data/services/API";
import esqueciStyle from '../ui/styles/EsqueciSenha/EsqueciSenha.module.css'

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
        <div className={esqueciStyle.login}>
            <div className={esqueciStyle.logo}>
                <img 
                    src="/src/ui/icons/codra-icon-dark.svg" 
                    alt="codra ícone"
                    className={esqueciStyle.logoImage}
                />
            </div>
            <center className={esqueciStyle.center}>
                <h1 className={esqueciStyle.loginText}>Esqueceu sua Senha?</h1>
                <h3 id="response"></h3>
                <h4>Um código de recuperação será enviado</h4>
                <form onSubmit={onSave} className={esqueciStyle.form}>
                    <label>
                        E-mail<br/>
                        <input 
                            className={esqueciStyle.input}
                            type="email" name="email" 
                            placeholder="Digite seu e-mail" required
                            value={email} autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit" className={esqueciStyle.formButton}>Enviar</button>
                </form>
                <div className={esqueciStyle.SignUpForgot}>
                    <p>
                        Lembrou a sua senha?   <a href="/login" className={esqueciStyle.link}>Login</a>
                    </p>
                </div>
                

            </center>
        </div>
    )
}