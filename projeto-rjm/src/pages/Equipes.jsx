import React from 'react';
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { getEquipeByUser } from "../data/services/API"
import { redirecionar } from "./util/functions"
import CabProj from '../ui/components/_cabecalho.jsx'
import Add_Equipe from "./Add_Equipe.jsx";
import equipeStyle from '../ui/styles/Equipes/Equipes.module.css'
import imgMaisProjeto from '../ui/icons/mais.png'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
Modal.setAppElement('#root');

export default function Equipes() {
    const [eqs, setEqs] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getEquipeByUser() // Filtrar equipes pelo usuário
            setEqs(res.equipes)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
        if (tipo == 'pr') {
            location.href = `/projetos/${id}`
        } else if (tipo == 'ed') {
            location.href = `/edit/equipe/${id}`
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
        return eqs.map((i) =>
            <>
                <div className={equipeStyle.equipeDiv} onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'pr')
                }}>

                    <td>{i.nome}</td><br />
                    <td>{i.descricao}</td>

                    <div className={equipeStyle.botaoEditarEquipe} onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'ed')
                    }}>Editar</div>
                </div>
            </>
        )
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <center>
                    <CabProj />
                    <h1 className={equipeStyle.tituloPagina}>Equipes</h1>
                    {(eqs.length != 0) ? (
                        <div className={equipeStyle.equipeFlex}>
                            {apr()}
                        </div>
                    ) : (
                        <>
                            <br /><br /><br />
                            <h4>Sem Equipes! Crie uma equipe!</h4>
                            <br />
                        </>
                    )}
                    <br />
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
                    <Add_Equipe />
                </Modal>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}