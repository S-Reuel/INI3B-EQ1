import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"
import { useEffect, useState } from "react"
import { getSprintsByProjeto } from "../data/services/API"
import imgMaisProjeto from '../ui/icons/mais.png'
import StylesSprint from '../ui/styles/Sprints/Sprints.module.css'
import { isFormat, redirecionar } from "./util/functions"

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
                <div className={StylesSprint.sprint} onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>
                    
                        <div>{i.id}</div>
                        <div>{i.nome}</div>
                        <div>{dataInicio}</div>
                        <div>{dataFim}</div>
                        <div>{i.projeto_id}</div>
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
                <CabProj /><h1>Sprints</h1>
                <div className={StylesSprint.telaSprint}>
                    
                    
                        
                        {(sprints.length == 0) ? (
                            <>
                                <br /><br /><br />
                                <h4>Sem Sprints! Crie uma sprint!</h4>
                                <br />
                            </>
                        ) : (
                            <>
                                {apr()}
                            </>
                        )}
                    
                    <br />
                    <a onClick={() => { redirecionar('addSpr') }}><div className={StylesSprint.botaoNewProjeto}><img src={imgMaisProjeto} className={StylesSprint.imgEditarProj} /></div></a>
                </div>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}