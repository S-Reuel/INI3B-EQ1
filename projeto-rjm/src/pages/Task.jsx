import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskByGitHub, updateTask } from "../data/services/API";
import CabProj from "../ui/components/_cabecalho";
import { isCripto, isDeCripto, isFormat } from "./util/functions";
import taskStyle from "../ui/styles/task/task.module.css";
import fileIcon from '../ui/icons/fileIcon.png'
import calendario from '../ui/icons/calendario.svg'
import setaDetails from '../ui/icons/setaDetails.png'
import clipbb from '../ui/icons/clipboard.png'
import tutorial from '../ui/file/tutorialCodra.txt'

export default function Task() {
    const { task_id } = useParams()
    const [task, setTask] = useState([])
    let decript_id = isDeCripto(task_id)

    useEffect(() => {
        async function fetch() {
            const res = await getTaskByGitHub(decript_id)
            setTask(res)
        }
        fetch()
    }, []);

    async function handleFileChange(e) {
        const formData = new FormData();
        formData.append("task[titulo]", task.titulo)
        formData.append("task[descricao]", task.descricao)
        formData.append("task[status]", task.status)
        formData.append("task[excluido]", task.excluido)
        if (e.target.files[0]) {
            formData.append("task[arquivos][]", e.target.files[0]);
        }
        (await updateTask(decript_id, formData)) ?
            document.getElementById("response").innerHTML = "Não foi possível adicionar!!"
        :
            location.reload()

    }

    function apr() {
        let arquivos = task.arquivos_urls
        let dataCriacao = isFormat(new Date(task.created_at))
        let dataAtualizacao = isFormat(new Date(task.updated_at))
        return (
            <div className={taskStyle.divRetorno}>

                <div>
                    <div className={taskStyle.datasDaTask}>
                        <div className={taskStyle.criacaoTask}><img src={calendario} /> Iniciado em: {dataCriacao}</div>
                        <div className={taskStyle.atlzTask}><img src={calendario} /> Terminado em: {dataAtualizacao}</div>
                    </div>

                    <hr className={taskStyle.hr1} color="#4a4a4a" />
                    <a href={tutorial} className={taskStyle.tititirial} download>
                        <p className={taskStyle.tutorial}><b className={taskStyle.tutoriel}> ?</b> Commits</p>
                    </a>
                    
                    <div className={taskStyle.divDaDivCommits}>

                        <div className={taskStyle.divCommits}>

                            {task.git_hubs.map((i) => {
                                return (
                                    <div className={taskStyle.commitTask}>
                                        <span className={taskStyle.tituloCommit}><b className={taskStyle.corDoCoiso}>{i.nome_repo} </b>/ Commit</span>

                                        <code className={taskStyle.msgTask}>{i.mensagem}</code>

                                        <div className={taskStyle.userDataTask}><b>{i.usuario_gh}</b> fez um <b>{i.evento_gh}</b> em <b>{isFormat(new Date(i.data))}</b></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <br />
                    <hr className={taskStyle.hr1} color="#4a4a4a" />
                    <br />
                    <center>
                        <label for="fileUpload" className={taskStyle.fileUpload}>Adicione arquivos</label> <br />
                        <input id="fileUpload" type="file" onChange={handleFileChange} />
                    </center>
                    <center>
                        <h3 className={taskStyle.responsee} id="response" />
                    </center>
                    <div className={taskStyle.divArquivos}>
                        <table className={taskStyle.tableArquivos}>
                            <th className={taskStyle.tableCabeca}>Arquivos Anexados</th>
                            {arquivos.map((i) => {
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
                    </div>
                </div>
            </div>
        )
    }

    function statusDesc() {
        return (
            <div className={taskStyle.statusTask}><div className={taskStyle.statusDiv} style={corStatus(task.status)}>{textoStatus(task.status)}</div></div>
        )
    }

    function textoStatus(status) {
        switch (status.toLowerCase()) {
            case "concluido":
                return "Concluído";
            case "em_andamento":
                return "Em andamento";
            case "pendente":
                return "Pendente";
            case "atrasado":
                return "Atrasado";
            case "cancelado":
                return "Encerrado"
            default:
                return "Erro";
        }
    }

    function corStatus(status) {
        switch (status.toLowerCase()) {
            case "concluido":
                return { backgroundColor: "#46F7B7", color: "#096343" };
            case "em_andamento":
                return { backgroundColor: "#46A7F7", color: "#144772" };
            case "pendente":
                return { backgroundColor: "#F5EB88", color: "#653408" };
            case "atrasado":
                return { backgroundColor: "#F78A46", color: "#5C4213" };
            case "cancelado":
                return { backgroundColor: "#F27F77", color: "#5F0F0B" };
            default:
                return { backgroundColor: "white", color: "black" };;
        }
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <div className={taskStyle.paginaEquipes}>
                    <div className={taskStyle.navEquipes}>
                        
                        <div className={taskStyle.statusDescTask}>
                            {(task.length != "") ? (statusDesc()) : (<h4>Nenhuma informação encontrada!</h4>)}
                            <p className={taskStyle.idDesc}>ID: {decript_id}</p>
                        </div>





                        <details className={taskStyle.descEquipe} open='true'>
                            <summary>
                                <img src={setaDetails} className={taskStyle.icon} />
                                <img src={clipbb} className={taskStyle.ilustIcon} />
                                Descrição
                            </summary>
                            <div teste="true" className={taskStyle.descConteudo}>{task.descricao}</div>

                            <br />
                        </details>
                    </div>
                    <div className={taskStyle.divTititulo}>
                        <button className={taskStyle.editarPag} onClick={() => { location.href = `/../../../sprint/edit/task/${isCripto(decript_id)}` }}>...</button>
                        <div className={taskStyle.tituloFlex}>
                            <h1 className={taskStyle.tituloPagina}>
                                Task {(task.length != "") ? `- ${task.titulo}` : ''}
                            </h1>
                        </div>
                        <br />

                    </div>
                    {(task.length != "") ? (apr()) : (<h4>Nenhuma informação encontrada!</h4>)}
                </div>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}