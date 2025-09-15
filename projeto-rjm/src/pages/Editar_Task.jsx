import React, { useEffect, useState } from "react"
import { getTaskId, updateTask } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isDeCripto, isFormatStatus, redirecionar  } from "./util/functions"
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Editar_Task() {
    const { task_id } = useParams()
    const [titulo, setTitulo] = useState()
    const [descricao, setDesc] = useState()
    const [stt, setStatus] = useState()
    const [file, setFile] = useState(null);

    
    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(task_id)
            const res = await getTaskId(decript_id)
            setTitulo(res.titulo)
            setDesc(res.descricao)
            setStatus(res.status)
        }
        fetch()
    }, [])
    
    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    
    const onSave = async (e) => {
        e.preventDefault()
        let status = document.getElementById("selectStatus").options[document.getElementById("selectStatus").selectedIndex].value
        const formData = new FormData();
        if (file) {
            formData.append("task[arquivos][]", file);
        }
        formData.append("task[titulo]", titulo)
        formData.append("task[descricao]", descricao)
        formData.append("task[status]", status)

        const res = await updateTask(task_id, formData)  
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={editEquipeStyle.paginaBody}>
                <CabProj />
                <center className={editEquipeStyle.center}>
                    <h1 className={editEquipeStyle.tituloPagina}>Editar Task</h1>
                    <form className={editEquipeStyle.form} onSubmit={onSave}>
                        <br />
                        <label>
                            <label>Adicione somente um arquivo</label> <br />
                            <input type="file" onChange={handleFileChange} multiple />
                        </label>
                        <br />
                        <br />
                        <label>
                            <label className={editEquipeStyle.inputTipo}>Título da Task</label><br />
                            <input
                                className={editEquipeStyle.input}
                                type="text" name="nome" value={titulo} required
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label className={editEquipeStyle.inputTipo}>Descrição da Task</label><br />
                            <input
                                className={editEquipeStyle.input}
                                type="text" name="nome" value={descricao} required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label>Status da Task</label><br />
                            <select className={editEquipeStyle.input} id='selectStatus'>
                                <option value={stt}>{isFormatStatus(stt)}</option>
                                <option value={'pendente'}>Pendente</option>
                                <option value={'em_andamento'}>Em andamento</option>
                                <option value={'atrasado'}>Atrasado</option>
                                <option value={'cancelado'}>Cancelado</option>
                                <option value={'concluido'}>Concluído</option>
                            </select>
                        </label>
                        <br /><br />               
                        <div className={editEquipeStyle.divBotoes}>
                            <button className={editEquipeStyle.formButton} type="submit" onClick={onSave}>Atualiza sprint</button>
                            <button className={editEquipeStyle.buttonReturn} type="button" onClick={(e) => history.back()}>Cancelar</button>
                        </div>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}