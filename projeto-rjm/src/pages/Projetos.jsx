import React from 'react';
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { getProjetosByEquipe } from "../data/services/API.jsx"
import CabProj from '../ui/components/_cabecalho.jsx'
import { isFormat } from "./util/functions.jsx"
import iconCalendario from '../ui/icons/calendario.svg'
import imgEditarProj from '../ui/icons/editar-projeto.svg'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import { useParams } from "react-router-dom"
import Add_Projeto from './Add_Projeto.jsx';
import imgMaisProjeto from '../ui/icons/mais.png'
Modal.setAppElement('#root');
export default function Projetos() {
    const [projetos, setProj] = useState([])
    const { equipe_id } = useParams()

    useEffect(() => {
        async function fetch() {
            let res = await getProjetosByEquipe(equipe_id)
            setProj(res.projetos)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
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
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <center className={StyleProj.bodyProjs}>
                    <br />
                    <div className={StyleProj.tituloPag}>Projetos Inscritos</div>
                    {projetos.length != 0 ? apr() : <h4>Sem projetos! Crie projetos!</h4>}
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
                    <Add_Projeto onClose={fecharModal}/>
                </Modal>
            </>
        )
    } else {
        return (location.href = "/login")
    }
}