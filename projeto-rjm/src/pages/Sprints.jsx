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
            setSprints(res.sprints)
        }
        fetch()
    }, [])

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
        if (tipo == 'task') {
            location.href = `/projeto/sprint/task/${id}`
        } else if (tipo == 'ed') {
            location.href = `/projeto/edit/sprint/${id}`
        }
    }

    function apr() {
        return sprints.map(function (i) {
            let dataInicio = isFormat(new Date(i.data_inicio))
            let dataFim = isFormat(new Date(i.data_fim))
            return (
                <div onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.nome}</td>
                        <td>{dataInicio}</td>
                        <td>{dataFim}</td>
                        <td>{i.projeto_id}</td>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>Editar</button>
                    </tr>
                </div>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        if (sprints.length != 0) {
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
            return (
                <>
                    <CabProj />
                    <center className={StyleProj.bodyProjs}>
                        <br />
                        <div className={StyleProj.tituloPag}>Projetos Inscritos</div>
                        <br /><br /><br />
                        <h4>Sem projetos! Crie projetos!</h4>
                        <br />
                    </center>
                    <a onClick={() => { redirecionar('addProj') }}><div className={StyleProj.botaoNewProjeto}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div></a>
                </>)
        }
    } else {
        return (redirecionar('login'))
    }
}