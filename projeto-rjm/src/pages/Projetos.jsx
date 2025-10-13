import React from 'react'
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import { deleteProjeto, getEquipeById, getMembros, getProjetosByEquipe } from "../data/services/API.jsx"
import CabProj from '../ui/components/_cabecalho.jsx'
import { isCripto, isDeCripto, isFormat } from "./util/functions.jsx"
import iconCalendario from '../ui/icons/calendario.svg'
import imgEditarProj from '../ui/icons/editar-projeto.svg'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import { useParams } from "react-router-dom"
import Add_Projeto from './Add_Projeto.jsx'
import imgMaisProjeto from '../ui/icons/mais.png'
import setaDetails from '../ui/icons/setaDetails.png'
import mmbros from '../ui/icons/membrosEquipe.png'
import clipbb from '../ui/icons/clipboard.png'
import holderUser from '../ui/icons/userHolderSla.png'

Modal.setAppElement('#root');
export default function Projetos() {
    const { equipe_id } = useParams()
    const [projetos, setProj] = useState([])
    const [equipe, setEquipe] = useState([])
    const [membros, setMembro] = useState([])

    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(equipe_id)
            let res = await getProjetosByEquipe(decript_id)
            let r = await getEquipeById(decript_id)
            let me = await getMembros(decript_id)
            setProj(res.projetos)
            setEquipe(r)
            setMembro(me)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (ID, tipo) => {
        // Criptografia do ID
        let id = isCripto(ID)
        if (tipo == 'spr') {
            location.href = `/projeto/sprints/${id}`
        } else if (tipo == 'ed') {
            location.href = `/edit/projeto/${id}`
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
        return projetos.map(function (i) {
            let dataUp = isFormat(new Date(i.updated_at))
            if (!(i.excluido)) {
                console.log(i.nome, i.excluido);
                
                return (
                    <>
                        <div className={StyleProj.projeto} onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'spr')
                        }}>
                            <div className={StyleProj.tituloProj}>
                                {i.nome}
                            </div>
                            <div className={StyleProj.descricaoProj}>
                                {i.descricao}
                            </div>
                            <div className={StyleProj.dataProj}>
                                Atualizado em:
                                <img src={iconCalendario} className={StyleProj.calendarioIMG}></img>{dataUp}
                            </div>
                            <button className={StyleProj.bttEditarProj} onClick={(e) => {
                                e.stopPropagation()
                                caminho(i.id, 'ed')
                            }}>
                                <img src={imgEditarProj} className={StyleProj.imgEditarProj} />
                            </button>
                            <br />
                        </div>
                        <br />
                    </>
                )
            }
        })
    }


    if (localStorage.getItem('authToken')) {
        return (
            <>
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
                    <Add_Projeto onClose={fecharModal} />
                </Modal>
                <div className={StyleProj.botaoNewProjeto} onClick={abrirModal} hidden={modalIsOpen}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div>
                <div className={StyleProj.paginaEquipes}>
                    <div className={StyleProj.navEquipes}>
                        <details className={StyleProj.descEquipe} open='true'>
                            <summary>
                                <img src={setaDetails} className={StyleProj.icon} />
                                <img src={clipbb} className={StyleProj.ilustIcon} />
                                Descrição
                            </summary>
                            <div className={StyleProj.descConteudo}>{equipe.descricao}</div>
                            <br />
                        </details>
                        <br />
                        <details className={StyleProj.descEquipe} open='true'>
                            <summary>
                                <img src={setaDetails} className={StyleProj.icon} />
                                <img src={mmbros} className={StyleProj.ilustIcon} />
                                Membros
                            </summary>
                            <div membros="true" className={StyleProj.descConteudo}>{membros.map((i) => { return (<div teste="true" className={StyleProj.descEquipe2}><img src={holderUser} className={StyleProj.ilustIcon2} /> {i.usuario.nome} </div>) })}</div>
                            <br />
                        </details>


                    </div>
                    <div>
                        <div className={StyleProj.tituloFlex}>
                            <h1 className={StyleProj.tituloPagina}>{equipe.nome}</h1>
                        </div>
                        <br />
                        <hr className={StyleProj.hr1} color="#4a4a4a" />
                    </div>
                    <center className={StyleProj.bodyProjs} semProjetos={projetos.length != 0 ? "true" : "false"}>
                        <br />
                        {projetos.length != 0 ? apr() : <h4 className={StyleProj.semProjTexto}> Sem projetos! Crie projetos!</h4>}
                    </center>

                </div>
            </>
        )
    } else {
        return (location.href = "/login")
    }
}