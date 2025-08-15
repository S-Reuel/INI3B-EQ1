import { useEffect, useState } from "react"
import { getTaskId, updateTask, } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isFormatDate } from "./util/functions"

export default function Editar_Task() {
    const { id } = useParams()
    const [titulo, setTitulo] = useState()
    const [descricao, setDesc] = useState()
    const [status, setStatus] = useState()
    const [data_criacao, setDC] = useState()
    const [data_update, setDU] = useState()

    useEffect(() => {
        async function fetch() {
            const res = await getTaskId(id)
            setTitulo(res.titulo)
            setDesc(res.descricao)
            setStatus(res.status)
            // Explicação para o segundo parametro da função isFormatDate está no arquivo functions
            setDC(isFormatDate(new Date(res.created_at), "get"))
            setDU(isFormatDate(new Date(res.updated_at), "get"))
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault() 
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${isFormatDate(new Date(dataI), "update")}T${horario}`
        let data_fim = `${isFormatDate(new Date(dataF), "update")}T${horario}`
        updateTask(id, { nome, data_inicio, data_fim, projeto_id})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div >
                <CabProj />
                <center>
                    <h1>Criar nova Sprint</h1>
                    <form onSubmit={onSave}>
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
                        <br />
                        <label >
                            <label>Data de Criação</label>
                            <br />
                            <input type="date" defaultValue={data_criacao} onChange={(e) => setDC(e.target.value)}/>
                        </label>
                        <br />
                        <label >
                            <label>Data de Atualização</label>
                            <br />
                            <input type="date" defaultValue={data_update} onChange={(e) => setDU(e.target.value)}/>
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