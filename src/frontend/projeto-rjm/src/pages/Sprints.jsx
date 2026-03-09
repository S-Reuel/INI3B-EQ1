import { Navigate, useNavigate, useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import React, { useEffect, useState } from "react"
import { getProjetoId, getSprintsByProjeto } from "../data/services/API"
import imgMaisProjeto from '../ui/icons/mais.png'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import StylesSprint from '../ui/styles/Sprints/Sprints.module.css'
import { hideButtonsByFuncao, isCripto, isDeCripto, isFormat, useRedirecionar } from "./util/functions"
import Modal from 'react-modal';
import Add_Sprint from "./Add_Sprint"
import setaDetails from '../ui/icons/setaDetails.png'
import clipbb from '../ui/icons/clipboard.png'
Modal.setAppElement('#root');

export default function Sprints() {
    const navigate = useNavigate()
    const redirecionar = useRedirecionar()
    const { projeto_id } = useParams()
    const [sprints, setSprints] = useState([])
    const [projeto, setProj] = useState([])

    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(projeto_id)
            let res = await getSprintsByProjeto(decript_id)
            let r = await getProjetoId(decript_id)
            setSprints(res.sprints)
            setProj(r)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (ID, tipo) => {
        // Criptografia do ID
        let id = isCripto(ID)
        if (tipo == 'task') {
            navigate(`/projeto/sprint/tasks/${id}`)
        } else if (tipo == 'ed') {
            navigate(`/projeto/edit/sprint/${id}`)
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

    function apresentar() {
        return (
            <div className={StylesSprint.sprintsDiv}>
                <table className={StylesSprint.tableSprints}>
                    <thead>
                        <tr className={StylesSprint.tableTitulo}>
                            <th><div className={StylesSprint.tbBorder}>Nome</div></th>
                            <th><div className={StylesSprint.tbBorder}>Início</div></th>
                            <th><div className={StylesSprint.tbBorder}>Término</div></th>
                            <th><div className={StylesSprint.tbBorder}></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sprints?.map((i, index) => {
                            let dataInicio = isFormat(new Date(i.data_inicio))
                            let dataFim = isFormat(new Date(i.data_fim))
                            if (!(i.excluido)) {
                                return (
                                    <tr key={index} className={StylesSprint.sprint} onClick={(e) => {
                                        e.stopPropagation()
                                        caminho(i.id, 'task')
                                    }}>
                                        <td className={StylesSprint.sprintNome}>{i.nome}</td>
                                        <td className={StylesSprint.sprintDatas}>{dataInicio}</td>
                                        <td className={StylesSprint.sprintDatas}>{dataFim}</td>
                                        <td className={StylesSprint.botaoEditarTableTd} >
                                            <div className={(hideButtonsByFuncao() == "dev") ? StylesSprint.botaoEditarTable_hide : StylesSprint.botaoEditarTable} onClick={(e) => {
                                                e.stopPropagation()
                                                caminho(i.id, 'ed')
                                            }}>...</div>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
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
                    <Add_Sprint />
                </Modal>
                <div className={StylesSprint.paginaEquipes}>
                    <div className={StylesSprint.navEquipes}>
                        <details className={StyleProj.descEquipe} open={true}>
                            <summary>
                                <img src={setaDetails} className={StyleProj.icon} />
                                <img src={clipbb} className={StyleProj.ilustIcon} />
                                Descrição
                            </summary>
                            <div teste="true" className={StyleProj.descConteudo}>{projeto.descricao}</div>
                            <br />
                        </details>
                        <br />
                    </div>
                    <div>
                        <div className={StylesSprint.tituloFlex}>
                            <h1 className={StylesSprint.tituloPagina}>{projeto.nome}</h1>
                        </div>
                        <br />
                        <hr className={StylesSprint.hr1} color="#4a4a4a" />
                    </div>
                    {(sprints.length != 0) ? (
                        <div className={StylesSprint.equipeFlex}>

                            {apresentar()}
                        </div>

                    ) : (<h4 className={StylesSprint.semSprint}>Sem Sprints! Crie uma Sprint!</h4>)}
                    <div className={(hideButtonsByFuncao() == "dev") ? StylesSprint.botaoNewSprint_hide : StylesSprint.botaoNewSprint} onClick={abrirModal} hidden={modalIsOpen}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div>
                </div>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}