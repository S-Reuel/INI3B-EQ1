import { useEffect, useState } from "react"
import { getEquipeByUser } from "../data/services/API"
import { redirecionar } from "./util/functions"

export default function Equipes() {
    const [eqs, setEqs] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getEquipeByUser() // Filtrar equipes pelo usuário
            setEqs(res.equipes)
        }
        fetch()
    }, [])

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
                <div onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'pr')
                }}>
                    <td>{i.id}</td>
                    <td>{i.nome}</td><br />
                    <td>{i.descricao}</td>
                </div>
                <td><button onClick={() => caminho(i.id, 'ed')}>Editar</button></td>
            </>
        )
    }

    if (localStorage.getItem('authToken')) {
        return (
            <center>
                <h1>Equipes</h1>
                <button onClick={() => redirecionar('addEq')}>+ Equipes</button>
                <table>
                    <tbody>
                        {apr()}
                    </tbody>
                </table>
                <br />
            </center>
        )
    } else {
        return (redirecionar('login'))
    }
}