import { useState } from 'react'
import { postProjeto } from "../data/services/API"
import { isDeCripto, useRedirecionar } from "./util/functions"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import { useParams } from 'react-router-dom'

export default function Add_Projeto(props) {
    const redirecionar = useRedirecionar()
    const {equipe_id} = useParams();
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    let decript_id = isDeCripto(equipe_id)

    const onSave = async (e) => {
        e.preventDefault()
        postProjeto(decript_id, { nome, descricao})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Novo projeto</h1>
                    <form onSubmit={onSave} className={addProjStyle.form}>
                        <label>
                            <label className={addProjStyle.lbl}>Nome do Projeto</label><br /><br /> 
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o nome do projeto" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addProjStyle.lbl}>Descrição</label><br /><br />
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