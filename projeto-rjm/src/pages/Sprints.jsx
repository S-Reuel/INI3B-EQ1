import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import { useEffect, useState } from "react"
import { getProjetoId, getSprintsByProjeto } from "../data/services/API"
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
    const [projeto, setProj] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getSprintsByProjeto(projeto_id)
            let r = await getProjetoId(projeto_id)
            setSprints(res.sprints)
            setProj(r.nome)
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
            if (!(i.excluido)) {
                return (
                    <tr className={StylesSprint.sprint} onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'task')
                    }}>
                        <td className={StylesSprint.sprintNome}>{i.nome}</td>
                        <td className={StylesSprint.sprintDatas}>{dataInicio}</td>
                        <td className={StylesSprint.sprintDatas}>{dataFim}</td>

                        <td className={StylesSprint.botaoEditarTableTd} >
                            <div className={StylesSprint.botaoEditarTable} onClick={(e) => {
                                e.stopPropagation()
                                caminho(i.id, 'ed')
                            }}>...</div>
                        </td>
                    </tr>
                )
            }
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div>
                <CabProj />
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
                <div className={StylesSprint.paginaEquipes}>
                    <div className={StylesSprint.navEquipes}></div>
                    <div>
                        <div className={StylesSprint.tituloFlex}>
                            <h1 className={StylesSprint.tituloPagina}>{projeto}</h1>

                        </div>
                        <br />
                        <hr className={StylesSprint.hr1} color="#4a4a4a" />
                    </div>

                    {(sprints.length != 0) ? (
                        <div className={StylesSprint.equipeFlex}>
                            <div className={StylesSprint.sprintsDiv}>
                                <table className={StylesSprint.tableSprints}>
                                    <tr className={StylesSprint.tableTitulo}>
                                        <th><div className={StylesSprint.tbBorder}>Nome</div></th>
                                        <th><div className={StylesSprint.tbBorder}>Início</div></th>
                                        <th><div className={StylesSprint.tbBorder}>Término</div></th>
                                        <th><div className={StylesSprint.tbBorder}></div></th>
                                    </tr>

                                    {apr()}
                                </table>
                            </div>
                        </div>
                    ) : (
                        <>
                            
                            <h4 className={StylesSprint.semSprint}>Sem Sprints! Crie uma Sprint!</h4>
                            
                        </>
                    )}

                    <div className={StylesSprint.botaoNewProjeto} onClick={abrirModal}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div>
                </div>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}