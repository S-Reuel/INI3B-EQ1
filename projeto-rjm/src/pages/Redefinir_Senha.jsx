import { useState } from "react";
import { redefinirSenha } from "../data/services/API";

import eyeOFF from "../ui/icons/eyeOFF.svg";
import eyeON from "../ui/icons/eyeON.svg";

import redefinirStyle from '../ui/styles/Shared/FormConta.module.css'

export default function RedefinirSenha() {
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    
    const [showPassword, setShowPassword] = useState('password')
    const [eye, setEye] = useState(eyeON)

    const onSave = async (e) => {
        e.preventDefault()
        if (password1 == password2) {
            let mensagem = await redefinirSenha(token, email, password1)
            if (mensagem == 'Senha redefinida com sucesso!') {
                location.href = '../login'
            } else {
                document.getElementById("response").innerHTML = mensagem
            }
        }
    }

    const toggleShowPassword = () => {
        if (showPassword === 'password') {
            setShowPassword("text")
            setEye(eyeOFF)
        }
        else {
            setShowPassword("password")
            setEye(eyeON)
        }
    }

    return (
        <div className={redefinirStyle.page}>
            <div className={redefinirStyle.logo}>
                <img
                    /*a imagem é carregada em  projeto-rjm\src\ui\styles\Shared\FormConta.module.css*/
                    alt="codra icone"
                    className={redefinirStyle.logoImage}
                />
            </div>
            <center className={redefinirStyle.center}>
                <h1 className={redefinirStyle.pageText}>Redefinir Senha</h1>
                <h3 className={redefinirStyle.response} id="response"></h3>
                <h4 className={redefinirStyle.pageDescription}>Um código de recuperação foi enviado para você. Complete os campos.</h4>
                <form onSubmit={onSave} className={redefinirStyle.form}>
                    <label>
                        <p>Digite o token</p>
                        <input
                            className={redefinirStyle.input}
                            type="text" name="token"
                            placeholder="Cole o token aqui" required
                            value={token} autoComplete='off'
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Digite seu e-mail</p>
                        <input
                            className={redefinirStyle.input}
                            type="email" name="email"
                            placeholder="E-mail" required
                            value={email} autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Digite sua nova senha</p>
                        <input
                            className={redefinirStyle.input}
                            type={showPassword} name="password1"
                            placeholder="Nova senha" required
                            value={password1} autoComplete='off'
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                        <div className={redefinirStyle.ab}>
                            <img className={redefinirStyle.passwordEye} src={eye} onClick={() => toggleShowPassword()} />
                        </div>
                    </label>
                    <label>
                        <p>Redigite sua nova senha</p>
                        <input
                            className={redefinirStyle.input}
                            type={showPassword} name="password2"
                            placeholder="Confirme a senha" required
                            value={password2} autoComplete='off'
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <div className={redefinirStyle.ab}>
                            <img className={redefinirStyle.passwordEye} src={eye} onClick={() => toggleShowPassword()} />
                        </div>
                    </label><br />
                    <button className={redefinirStyle.formButton} type="submit">Enviar</button>
                </form>
            </center>
        </div>
    )

}