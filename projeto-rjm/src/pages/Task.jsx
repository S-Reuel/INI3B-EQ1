import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskByGitHub } from "../data/services/API";
import CabProj from "../ui/components/_cabecalho";
import { isFormat } from "./util/functions";
import taskStlye from "../ui/styles/task/task.module.css"
export default function Task() {
    const { task_id } = useParams()
    const [task, setTask] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getTaskByGitHub(task_id)
            setTask(res)
        }
        fetch()
    }, []);

    function apr() {
        let arquivos = task.arquivos_urls
        let dataCriacao = isFormat(new Date(task.created_at))
        let dataAtualizacao = isFormat(new Date(task.updated_at))
        return (
            <div >
                <p>
                    Descrição: {task.descricao} <br />
                    Status: {task.status} <br />
                    Data Criação: {dataCriacao} <br />
                    Data Atualizado: {dataAtualizacao} <br />
                    <br /> <br />
                    <h2>Commits do GitHub</h2>
                    {task.git_hub.map((i) => {
                        return (
                            <>
                                Nome respositório: {i.nome_repo} <br />
                                Nome do Usuário: {i.usuario_gh} <br />
                                Nome do evento: {i.evento_gh}  <br />
                                Data: {isFormat(new Date(i.data))}  <br />
                                Commit: <code>{i.mensagem}</code>  
                                <br />
                                <br /> <br /> <br /> <br /> <br />
                            </>
                        )
                    })}
                    <h2>Arquivos anexados</h2>
                    {arquivos.map((i) => {
                        return (
                            <>
                                <a href={i}>
                                    {i}
                                </a>
                                <br /> <br /> <br />
                            </>
                        )
                    })}
                </p>
            </div>
        )
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <center className={taskStlye.corpo}>
                    <h1 className={taskStlye.texto}>Task {(task.length != "") ? `- ${task.titulo}` : ''}</h1>
                    <div>
                        {(task.length != "") ? (apr()) : (<h4>Nenhuma informação encontrada!</h4>)}
                    </div>
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}