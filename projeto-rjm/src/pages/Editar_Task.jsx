import React, { useEffect, useState } from "react"
import { getTaskId, updateTask } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import taskStlye from "../ui/styles/task/task.module.css"
import { isFormatStatus } from "./util/functions"

export default function Editar_Task() {
    const { task_id } = useParams()
    const [titulo, setTitulo] = useState()
    const [descricao, setDesc] = useState()
    const [stt, setStatus] = useState()
    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    useEffect(() => {
        async function fetch() {
            const res = await getTaskId(task_id)
            setTitulo(res.titulo)
            setDesc(res.descricao)
            setStatus(res.status)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        if (file) {
            console.log('Uploading file...');
            const formData = new FormData();
            formData.append('file', file);
            console.log(formData);
        }
        let status = document.getElementById("selectStatus").options[document.getElementById("selectStatus").selectedIndex].value
        // updateTask(task_id, {titulo, descricao, status, arquivos})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={taskStlye.aaa}>
                <CabProj />
                <center>
                    <h1 >Editar Task</h1>
                    <form onSubmit={onSave}>
                        <br />
                        <label>
                            <label>Adicione somente um arquivo</label> <br />
                            <input type="file" id="fileInput" onChange={handleFileChange} multiple />
                        </label>
                        <br />
                        <br />
                        <label>
                            <label>Título da Task</label><br />
                            <input
                                type="text" name="nome" value={titulo} required
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label>Descrição da Task</label><br />
                            <input
                                type="text" name="nome" value={descricao} required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label>Status da Task</label><br />
                            <select id='selectStatus'>
                                <option value={stt}>{isFormatStatus(stt)}</option>
                                <option value={'pendente'}>Pendente</option>
                                <option value={'em_andamento'}>Em andamento</option>
                                <option value={'atrasado'}>Atrasado</option>
                                <option value={'cancelado'}>Cancelado</option>
                                <option value={'concluido'}>Concluído</option>
                            </select>
                        </label>
                        <br /><br />
                        <button type="submit">Atualiza Sprint</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}