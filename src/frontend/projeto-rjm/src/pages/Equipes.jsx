import { useEffect, useState } from "react"
import { getEq } from "../data/services/API"
import { redirecionar } from "./util/functions"

export default function Equipes(){
    const [eqs, setEqs] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getEq()                    
            res == 500? setErrors(res) : setEqs(res) 
        }
        fetch()
    }, [])
    function apr() { 
        return eqs.map((i) =>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
                <td>{i.descricao}</td>
                <td><button onClick={()=>onEvent(i.id, 'delete')}>Excluir</button></td>
                <td><button onClick={()=>onEvent(i.id, 'update')}>Editar</button></td>
            </tr>
        )
    }

    if(errors.length==0){
        return (
            <center>
                <h1>Usuários</h1>
                <button onClick={()=>redirecionar('logout')}>logout</button>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Descrição</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {apr()}
                    </tbody>
                </table>
                <br/>
                <button onClick={()=>redirecionar('projetos')}>Projetos</button>
            </center>
        )
    } else {
        return(
            <center>
                <h1>Acesso restrito</h1>
                <br />
                <a href="/login"><button>Login</button></a>
            </center>
        )
    }
}