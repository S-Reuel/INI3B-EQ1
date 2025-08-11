import { useState } from "react"
import { postEquipe } from "../data/services/API"
import { redirecionar, voltar } from "./util/functions"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'

import addEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Add_Equipe() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const onSave = async (e) => {
        e.preventDefault()
        postEquipe({ nome, descricao })
    }
    if (localStorage.getItem('authToken')) {
        return (
            <div className={addEquipeStyle.paginaBody}>
                <CabProj />
                <center className={addEquipeStyle.center}>
                    <h1 className={addEquipeStyle.tituloPagina}>Nova Equipe!</h1>
                    <form className={addEquipeStyle.form}>
                        <label>
                            <label className={addEquipeStyle.lbl}>Nome:</label><br />
                            <input
                                type="text" nome="nome"
                                placeholder="Digite seu nome" required
                                onChange={(e) => setNome(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addEquipeStyle.lbl}>Descrição:</label>
                            <br />
                            <input
                                type="text" name="descricao"
                                placeholder="Digite a descrição" required
                                onChange={(e) => setDesc(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br /><br />
                        <button type="submit" onClick={onSave}  className={addEquipeStyle.formButton}>Enviar</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}