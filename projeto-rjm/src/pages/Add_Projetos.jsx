// import styles from '../ui/components/Registro/Registro.module.css'
import { useState } from 'react'
import {postProj} from "../data/services/API"
import { dateFormatter, voltar } from "./util/functions"

export default function AddProj() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        let data = new Date()
        let data_criacao = dateFormatter(data)
        postProj({nome, descricao, data_criacao})
    }

    return (
        <div>
            <center>
                <h1>Novo Projeto!</h1>
                <form onSubmit={onSave}>
                    <label>
                        Título:<br/>
                        <input 
                            type="text" name="nome" 
                            placeholder="Digite o título" required 
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label >
                        Descrição:
                        <br/>
                        <input 
                            type="text" name="descricao" 
                            placeholder="Digite a descrição" required 
                            onChange={(e) => setDesc(e.target.value)}   
                        />
                    </label>
                    <br/>
                    <button type="submit">Enviar</button>
                </form>
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}