import { useEffect, useState } from "react"
import { getEquipeByUser } from "../data/services/API"
import { redirecionar } from "./util/functions"
import CabProj from '../ui/components/_cabecalho.jsx';
import equipeStyle from '../ui/styles/Equipes/Equipes.module.css';

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
            location.href = `/projeto/${id}`
        } else if (tipo == 'ed') {
            location.href = `/edit/equipe/${id}`
        }
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
        if (eqs.length != 0) {
            return (

                <center>
                    <CabProj />
                    <h1>Equipes</h1>
                    <button onClick={() => redirecionar('addEq')}>+ Equipes</button>
                    <div className={equipeStyle.equipeFlex}>
                        {apr()}
                    </div>
                    <br />
                </center>
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