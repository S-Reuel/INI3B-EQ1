import React from 'react'
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import { getEquipeByUser } from "../data/services/API"
import { isCripto, redirecionar } from "./util/functions"
import CabProj from '../ui/components/_cabecalho.jsx'
import Add_Equipe from "./Add_Equipe.jsx"
import equipeStyle from '../ui/styles/Equipes/Equipes.module.css'
import imgMaisProjeto from '../ui/icons/mais.png'
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
    const caminho = (ID, tipo) => {
        // Criptografia do ID
        let id = isCripto(ID)
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
    async function fecharModal() {
        setIsOpen(false);
        window.location.reload();
    }

    function apr() {
        return eqs.map((i) => {
            if (!(i.excluido)) {
                return (<>
                    <div className={equipeStyle.equipeDiv} onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'pr')
                    }}>
                        <div className={equipeStyle.tituloEquipe}>{i.nome}</div><br />

                        <div className={equipeStyle.descEquipe}>{i.descricao}</div>

                        <div className={equipeStyle.botaoEditarEquipe} onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>...</div>
                    </div>
                </>)
            }
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div>
                <CabProj />
                <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={equipeStyle.modalConteudo}
                    style={{
                        overlay: {
                            overflowY: "scroll",

                            backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                        },
                        content: {

                            border: '1px solid black',
                            background: '#151B23',
                            maxHeight: '70vh',
                            overflowY: "scroll",

                        }
                    }}
                >

                    <Add_Equipe fecharModal={fecharModal}/>
                </Modal>
                <div className={equipeStyle.bttCriarEquipe} onClick={abrirModal} hidden={modalIsOpen}><img src={imgMaisProjeto} className={equipeStyle.imgEditarProj} /></div>
                <div className={equipeStyle.paginaEquipes}>

                    <div>
                        <div className={equipeStyle.tituloFlex}>
                            <h1 className={equipeStyle.tituloPagina}>Equipes</h1>

                        </div>
                        <br />
                        <hr className={equipeStyle.hr1} color="#4a4a4a" />
                    </div>
                    {(eqs.length != 0) ? (
                        <div className={equipeStyle.equipesDivCenter}>
                            <div className={equipeStyle.equipeFlex}>
                                {apr()}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{display:"inline-grid"}}>
                                <h4 className={equipeStyle.semEquipe}>Sem Equipes! Crie uma equipe!</h4>

                            </div>

                        </>
                    )}

                </div>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}