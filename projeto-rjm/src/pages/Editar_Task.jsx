import { useEffect, useState } from "react"
import { deleteTask, getTaskId, updateTask } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isDeCripto, isFormatStatus, redirecionar } from "./util/functions"
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import taskStyle from "../ui/styles/task/task.module.css";
import fileIcon from '../ui/icons/fileIcon.png'

export default function Editar_Task() {
    const { task_id } = useParams()
    const [titulo, setTitulo] = useState()
    const [descricao, setDesc] = useState()
    const [file, setFile] = useState()
    const [files, setFiles] = useState([])
    const [stt, setStatus] = useState()
    let decript_id = isDeCripto(task_id)

    useEffect(() => {
        async function fetch() {
            const res = await getTaskId(decript_id)
            setTitulo(res.titulo)
            setDesc(res.descricao)
            setStatus(res.status)
            setFiles(res.arquivos_urls)
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
        formData.append("task[titulo]", titulo)
        formData.append("task[descricao]", descricao)
        formData.append("task[status]", status)
        if (file) {
            formData.append("task[arquivos][]", file);
        }
        (await updateTask(decript_id, formData)) ?
            document.getElementById("response").innerHTML = "Não foi possível adicionar!!"
        :
            location.reload()
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
                            <label for="fileUpload" className={taskStyle.fileUpload}>Adicione arquivos</label> <br />
                            <input id="fileUpload" type="file" onChange={handleFileChange} />
                        </label>
                        <br /><br />
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
                        <table className={taskStyle.tableArquivos}>
                            <th className={taskStyle.tableCabeca}>Arquivos Anexados</th>
                            {files.map((i) => {
                                const caminhoDoArquivo = i;
                                const regex = /[^/]*$/;
                                const match = caminhoDoArquivo.match(regex);
                                return (
                                    <tr className={taskStyle.linkTask}>
                                        <a href={i} target="_blank" className={taskStyle.linklink}>
                                            <img src={fileIcon} className={taskStyle.fileIMG} />
                                            <div className={taskStyle.linklinklink}>{match[0]}</div>

                                        </a>

                                    </tr>
                                )
                            })}
                        </table>
                        <div className={editEquipeStyle.divBotoes}>
                            <button className={editEquipeStyle.formButtonDelete} onClick={async (e) => {
                                e.stopPropagation()
                                await deleteTask(decript_id)
                            }}>X Excluir</button>
                            <button className={editEquipeStyle.formButton} type="submit" onClick={onSave}>Atualiza sprint</button>
                            <button className={editEquipeStyle.buttonReturn} type="button" onClick={(e) => { history.back(); window.close(); }}>Cancelar</button>
                        </div>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}