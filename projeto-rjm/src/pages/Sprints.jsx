import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import { useEffect, useState } from "react"
import { getSprintsByProjeto } from "../data/services/API"
import imgMaisProjeto from '../ui/icons/mais.png'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import StylesSprint from '../ui/styles/Sprints/Sprints.module.css'
import { isFormat, redirecionar } from "./util/functions"
import React from 'react';
import Modal from 'react-modal';
import Add_Sprint from "./Add_Sprint"
Modal.setAppElement('#root');

export default function Sprints() {
    const { projeto_id } = useParams()
    const [sprints, setSprints] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getSprintsByProjeto(projeto_id)
            setSprints(res.sprints)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
        if (tipo == 'task') {
            location.href = `/projeto/sprint/tasks/${id}`
        } else if (tipo == 'ed') {
            location.href = `/projeto/edit/sprint/${id}`
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


    function apr() {
        return sprints.map(function (i) {
            let dataInicio = isFormat(new Date(i.data_inicio))
            let dataFim = isFormat(new Date(i.data_fim))
            return (
                <div className={StylesSprint.sprint} onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>

                    <div>Id: {i.id}</div>
                    <div>Nome: {i.nome}</div>
                    <div>Data Inicio: {dataInicio}</div>
                    <div>Data Fim: {dataFim}</div>
                    <div>Id do projeto: {i.projeto_id}</div>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'ed')
                    }}>Editar</button>

                </div>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <h1>Sprints</h1>
                <div className={StylesSprint.telaSprint}>
                    {(sprints.length == 0) ? (<h4>Sem Sprints! Crie uma sprint!</h4>) : (apr())}
                    <br />
                </div>
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
                    <Add_Sprint />
                </Modal>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}