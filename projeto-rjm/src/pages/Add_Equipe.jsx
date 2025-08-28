import { useState } from "react"
import { postEquipe } from "../data/services/API"
import { redirecionar } from "./util/functions"

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
                <center className={addEquipeStyle.center}>
                    <h1 className={addEquipeStyle.tituloPagina}>Nova Equipe!</h1>
                    <form className={addEquipeStyle.form}>
                        <label>
                            <label className={addEquipeStyle.lbl}>Nome:</label><br />
                            <input
                                type="text" nome="nome"
                                placeholder="Digite o nome equipe" required
                                onChange={(e) => setNome(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addEquipeStyle.lbl}>Descrição:</label>
                            <br />
                            <textarea 
                                rows='8' cols='50'
                                placeholder="Digite a descrição do projeto" required
                                onChange={(e) => setDesc(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br />
                        <button type="submit" onClick={onSave}  className={addEquipeStyle.formButton}>Criar</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}