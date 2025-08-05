import { useState } from "react"
import { postEq } from "../data/services/API"
import { redirecionar, voltar } from "./util/functions"

export default function AddEqui() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const onSave = async (e) => {
        e.preventDefault()
        postEq({ nome, descricao })
    }
    if (localStorage.getItem('authToken')) {
        return (
            <div>
                <center>
                    <h1>Nova Equipe!</h1>
                    <form>
                        <label>
                            Nome:<br />
                            <input
                                type="text" nome="nome"
                                placeholder="Digite seu nome" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            Descrição:
                            <br />
                            <input
                                type="text" name="descricao"
                                placeholder="Digite a descrição" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br /><br />
                        <button type="submit" onClick={onSave}>Enviar</button>
                    </form>
                    <br/>
                    <a onClick={voltar}><button>Voltar</button></a>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}