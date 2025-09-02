// import styles from '../ui/components/Rec/Rec.module.css'
import { useState } from "react";
import { esqueciSenha } from "../data/services/API";
import esqueciStyle from '../ui/styles/Shared/FormConta.module.css'
import { redirecionar } from "./util/functions";

export default function EsqueciSenha() {
    const [email, setEmail] = useState('')
    const [botaoDesativado, setBotaoDesativado] = useState('') /*--TO DO-diego:com Regex, daria pra ativar o botao assim que um email valido fosse enviado */

    const onSave = async (e) => {
        let emailEnviado = email
        setEmail("")
        setBotaoDesativado("disabled")
        e.preventDefault()
        let mensagem = await esqueciSenha(emailEnviado)
        if (mensagem == 'Um email de redefinição foi enviado') {
            location.href = '/login/redefinirSenha'
        } else {
            setBotaoDesativado("")
            document.getElementById("response").innerHTML = JSON.stringify(mensagem)
        }
    }

    if (!localStorage.getItem('authToken')) {
        return (
            <div className={esqueciStyle.page}>
                <div className={esqueciStyle.logo}>
                    <img
                        /*a imagem é carregada em  \projeto-rjm\src\ui\styles\Shared\FormConta.module.css*/
                        alt="codra ícone"
                        className={esqueciStyle.logoImage}
                    />
                </div>
                <center className={esqueciStyle.center}>
                    <h1 className={esqueciStyle.pageText}>Esqueceu sua Senha?</h1>
                    <h3 id="response"></h3>
                    <h4>Um código de recuperação será enviado</h4>
                    <form onSubmit={onSave} className={esqueciStyle.form}>
                        <label>
                            E-mail<br />
                            <input
                                className={esqueciStyle.input}
                                type="email" name="email"
                                placeholder="Digite seu e-mail" required
                                value={email} autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <button type="submit" className={esqueciStyle.formButton} disabled={botaoDesativado}>Enviar</button>
                    </form>
                    <div className={esqueciStyle.SignUpForgot}>
                        <p>
                            Lembrou a sua senha?   <a href="/login" className={esqueciStyle.link}>Login</a>
                        </p>
                    </div>


                </center>
            </div>
        )
    } else {
        return (redirecionar("prin"))
    }

}
