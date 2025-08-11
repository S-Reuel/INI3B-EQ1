import { useParams } from "react-router-dom";
import CabProj from "../ui/components/_cabecalho";
import { useEffect, useState } from "react";
import { getSprintsByProjeto } from "../data/services/API";
import imgMaisProjeto from '../ui/icons/mais.png'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'
import { isFormat, redirecionar } from "./util/functions";

export default function Sprints() {
    const { id } = useParams()
    const [sprints, setSprints] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getSprintsByProjeto(id)
            setSprints(res)
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

    function apr() {
        return sprints.map(function (i) {
            let dataInicio = isFormat(new Date(i.data_inicio))
            let dataFim = isFormat(new Date(i.data_fim))
            return (
                <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.nome}</td>
                    <td>{dataInicio}</td>
                    <td>{dataFim}</td>
                    <td>{i.projeto_id}</td>
                    <button className={StyleProj.bttEditarProj} onClick={(e) => {
                        e.stopPropagation()
                        caminho(i.id, 'ed')
                    }}></button>
                </tr>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <center>
                    <h1>Sprints</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Data inicio</td>
                                <td>Data termino</td>
                                <td>Id projeto</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {apr()}
                        </tbody>
                    </table>
                    <br />
                    <a onClick={() => { redirecionar('addSpr') }}><div className={StyleProj.botaoNewProjeto}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div></a>
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}