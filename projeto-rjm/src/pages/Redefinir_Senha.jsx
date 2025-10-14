import { useState } from "react";
import { redefinirSenha } from "../data/services/API";
import CryptoJS from "crypto-js"
import eyeOFF from "../ui/icons/eyeOFF.svg";
import eyeON from "../ui/icons/eyeON.svg";
import redefinirStyle from '../ui/styles/Shared/FormConta.module.css'
import { redirecionar } from "./util/functions";

export default function RedefinirSenha() {
    const [token, setToken] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [showPassword, setShowPassword] = useState('password')
    const [eye, setEye] = useState(eyeON)

    const onSave = async (e) => {
        e.preventDefault()
        var result = localStorage.getItem('authEmail')
        var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
        var bytes = CryptoJS.AES.decrypt(result, key)
        var email = bytes.toString(CryptoJS.enc.Utf8)
        if (password1 == password2) {
            if (await redefinirSenha(token, email, password1)) {
                redirecionar('logout')
            } else {
                document.getElementById("response").innerHTML = "Há algo de errado! Por favor verifique!!"
            }
        } else {
            document.getElementById("response").innerHTML = "Senhas diferiram-se!!"
            setPassword1('')
            setPassword2('')
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
                <h3 className={redefinirStyle.response} id="response" /><br />
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