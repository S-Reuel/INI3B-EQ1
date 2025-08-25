import { useEffect, useState } from "react";
import { isFormat, redirecionar } from "./util/functions"
import { getTaskBySprint } from "../data/services/API"
import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import React from 'react';
import Modal from 'react-modal';
import Add_Task from "./Add_Task";
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import imgMaisProjeto from '../ui/icons/mais.png'

Modal.setAppElement('#root');

export default function Tasks() {
    const { sprint_id } = useParams()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getTaskBySprint(sprint_id)
            setTasks(res.tasks)
        }
        fetch()
    }, []);

    // Função utilizada para otimizar o envio do ID pela URL
    function caminho(id, tipo) {
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
            return (
                <div onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>
                    <p>
                        {i.id}   {i.titulo}  {i.descricao}   {i.status}  {dataCriacao} {dataAtualizacao}
                        <button onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>Editar</button>
                    </p>
                </div>
            )
        })
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
                <div  >
                    <center className={StyleProj.conteudo}>
                        <h1>Tasks</h1>
                        <div>
                            {(tasks.length != "") ? (apr()) : (<h4>Sem Task! Crie uma task!</h4>)}
                        </div>
                    </center>
                    <div className={StyleProj.botaoNewProjeto} onClick={abrirModal}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div>
                    <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={StyleProj.modalConteudo}
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
                        <button className={StyleProj.btnFechaModal} id='btnFecharModal' onClick={fecharModal}>X</button>
                        <Add_Task />
                    </Modal>
                </div>

            </>
        )
    } else {
        return (redirecionar('login'))
    }
}