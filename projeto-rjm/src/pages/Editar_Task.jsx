import { useEffect, useState } from "react"
import { getTaskId, updateTask, } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import taskStlye from "../ui/styles/task/task.module.css"

export default function Editar_Task() {
    const { task_id } = useParams()
    const [titulo, setTitulo] = useState('')
    const [descricao, setDesc] = useState('')
    const [status, setStatus] = useState('')
    const [arquivos, setArquivos] = useState()

    useEffect(() => {
        async function fetch() {
            const res = await getTaskId(task_id)
            setTitulo(res.titulo)
            setDesc(res.descricao)
            setStatus(res.status)
            setArquivos(res.arquivos)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateTask(task_id, { titulo, descricao, status, arquivos })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={taskStlye.aaa}>
                <CabProj />
                <center>
                    <h1 >Editar Task</h1>
                    <form onSubmit={onSave}>
                        <br />
                        <input type="file" name="arquivo" />
                        <br />
                        <br />
                        <label>
                            <label>Título da Task</label><br />
                            <input

                                type="text" name="nome" defaultValue={titulo} required
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label>Descrição da Task</label><br />
                            <input

                                type="text" name="nome" defaultValue={descricao} required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            <label>Status da Task</label><br />
                            <input

                                type="text" name="nome" defaultValue={status} required
                                onChange={(e) => setStatus(e.target.value)}
                            />
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