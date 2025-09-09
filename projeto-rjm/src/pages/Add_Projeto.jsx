import { useEffect, useState } from 'react'
import { getEquipeByUser, postProjeto } from "../data/services/API"
import { redirecionar } from "./util/functions"
import "projeto-rjm/src/ui/components/_cabecalho.jsx"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import { useParams } from 'react-router-dom'

export default function Add_Projeto(props) {
    const {equipe_id} = useParams();
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        postProjeto(equipe_id, { nome, descricao})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Criar novo projeto</h1>
                    <form onSubmit={onSave} className={addProjStyle.form}>
                        <label>
                            <label className={addProjStyle.lbl}><h1>Nome do Projeto</h1></label>
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o nome do projeto" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addProjStyle.lbl}><h1>Descrição</h1></label>
                            <textarea 
                                rows='8' cols='50'
                                className={addProjStyle.input}
                                placeholder="Digite aqui a descrição do projeto" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br />
                        <br/>
                        <button className={addProjStyle.btnFechaModal} id='btnFecharModal' onClick={props.onClose}>Cancelar</button>
                        <button type="submit" className={addProjStyle.formButton}>Criar</button>
                        <br />
                        
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}