import { useEffect, useState } from "react"
import { getEquipeByUser } from "../data/services/API"
import { redirecionar } from "./util/functions"
import CabProj from '../ui/components/_cabecalho.jsx';
import equipeStyle from '../ui/styles/Equipes/Equipes.module.css';
import axios from "axios";

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
        return (redirecionar('login'))
    }
}