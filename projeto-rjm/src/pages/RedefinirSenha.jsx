import React, { useState } from "react";
import { redefinirSenha } from "../data/services/API";

export default function RedefinirSenha() {
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        if(password1 == password2){
            let r = await redefinirSenha(token, email, password1)
            let mensagem = r.data.alert
            if(mensagem == 'Senha redefinida com sucesso!'){
                location.href = '../login'
            } else {
                document.getElementById("response").innerHTML = JSON.stringify(mensagem)
            }
        }
    } 

    return(
        <div>
            <center>
                <h1>Redefinir Senha</h1>
                <h3 id="response"></h3>
                <h4>Um código de recuperação foi enviado para você. Complete os campos.</h4>
                <form onSubmit={onSave}>
                    <label>
                        <p>Digite o token</p>
                        <input 
                            type="text" name="token" 
                            placeholder="Cole o token aqui" required
                            value={token} autoComplete='off'
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Digite seu e-mail</p>
                        <input 
                            type="email" name="email" 
                            placeholder="E-mail" required
                            value={email} autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Digite sua nova senha</p>
                        <input 
                            type="password" name="password1" 
                            placeholder="Nova senha" required
                            value={password1} autoComplete='off'
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Redigite sua nova senha</p>
                        <input 
                            type="password" name="password2" 
                            placeholder="Confirme a senha" required
                            value={password2} autoComplete='off'
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </label> <br />
                    <button type="submit">Enviar</button>
                </form>
            </center>
        </div>
    )
}