import { useEffect, useState } from "react";
import { isCripto, isDeCripto, isFormat, redirecionar } from "./util/functions"
import { getSprintsId, getTaskBySprint } from "../data/services/API"
import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import React from 'react';
import equipeStyle from '../ui/styles/Equipes/Equipes.module.css'
import Modal from 'react-modal';
import Add_Task from "./Add_Task";
import iconCalendario from '../ui/icons/calendario.svg'
import TasksStyle from '../ui/styles/Tasks/Tasks.module.css'
import imgMaisProjeto from '../ui/icons/mais.png'

Modal.setAppElement('#root');

export default function Tasks() {
    const { sprint_id } = useParams()
    const [tasks, setTasks] = useState([])
    const [sprint, setSprint] = useState([])

    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(sprint_id)
            const res = await getTaskBySprint(decript_id)
            let r = await getSprintsId(decript_id)
            setTasks(res.tasks)
            setSprint(r)
        }
        fetch()
    }, []);

    // Função utilizada para otimizar o envio do ID pela URL
    function caminho(ID, tipo) {
        // Criptografia do ID
        let id = isCripto(ID)
        if (tipo == 'task') {
            location.href = `/projeto/sprint/task/${id}`
        } else if (tipo == 'ed') {
            location.href = `/sprint/edit/task/${id}`
        }
    }

    function apr() {
        return tasks.map(function (i) {
            let dataCriacao = isFormat(new Date(i.created_at))
            let dataAtualizacao = isFormat(new Date(i.updated_at))

            if (!(i.excluido)) {
                return (
                    <div className={TasksStyle.Task} onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'task')
                    }}>
                        <div className={TasksStyle.TaskInner}>
                            <div className={TasksStyle.taskTitulo}>{i.titulo}</div>
                            <div className={TasksStyle.botaoEditarTask} onClick={(e) => {
                                e.stopPropagation()
                                caminho(i.id, 'ed')
                            }}>...</div>
                            <div className={TasksStyle.taskData}>
                                <div className={TasksStyle.dataDiv}><img src={iconCalendario} className={TasksStyle.calendarioIMG}></img>{dataAtualizacao}</div>
                            </div>
                            <div className={TasksStyle.taskDescricao}>{i.descricao}</div>
                            <div className={TasksStyle.taskStatus}><div className={TasksStyle.statusDiv} style={corStatus(i.status)}>{textoStatus(i.status)}</div></div>


                        </div>
                    </div>
                )
            }
        })
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



    const [modalIsOpen, setIsOpen] = React.useState(false);

    // Função que abre a modal
    function abrirModal() {
        setIsOpen(true);
    }

    // Função que fecha a modal
    function fecharModal() {
        setIsOpen(false);
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={TasksStyle.modalConteudo}
                    style={{
                        overlay: {
                            overflowY: "scroll",
                            backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                        },
                        content: {
                            border: '1px solid black',
                            background: '#151B23',

                        }
                    }}
                >
                    <button className={TasksStyle.btnFechaModal} id='btnFecharModal' onClick={fecharModal}>X</button>
                    <Add_Task />
                </Modal>
                <div className={TasksStyle.botaoNewTask} onClick={abrirModal} hidden={modalIsOpen}><img src={imgMaisProjeto} className={TasksStyle.imgEditarProj} /></div>
                <div className={TasksStyle.paginaEquipes}>
                    <div className={TasksStyle.navEquipes}>
                        <div className={TasksStyle.descData} teste="true">Data de início da Sprint: <br />{isFormat(new Date(sprint.data_inicio))}</div>
                        <br /> 
                        <div className={TasksStyle.descData} teste="true">Data de término da Sprint: <br />{isFormat(new Date(sprint.data_fim))}</div>
                    </div>
                    <div>
                        <div className={TasksStyle.tituloFlex}>
                            <h1 className={TasksStyle.tituloPagina}>{sprint.nome}</h1>
                        </div>
                        <br />
                        <hr className={TasksStyle.hr1} color="#4a4a4a" />
                    </div>

                    {(tasks.length != 0) ? (
                        <div className={TasksStyle.tasksCenter}>
                            <div className={TasksStyle.equipeFlex}>
                                {apr()}
                            </div>
                        </div>

                    ) : (
                        <>

                            <h4 className={TasksStyle.semTask}>Sem Tasks! Crie uma Task!</h4>

                        </>
                    )}

                </div>


            </>
        )
    } else {
        return (redirecionar('login'))
    }
}