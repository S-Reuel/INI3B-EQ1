import { useState, useEffect } from "react";
import { deleteUser, getUser} from "../data/services/API.jsx";
import { redirecionar } from "./util/functions.jsx";

export default function Usuarios() {
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getUser()                    
            res == 500? setErrors(res) : setUsers(res) 
        }
        fetch()
    }, [])

    async function onEvent(id, tipo){
        if(tipo=='delete'){
            let conf = confirm('Tem certeza que deseja apagá-lo?')
            if (conf)
                await deleteUser(id)
        } else if(tipo=='update'){
            location.href = `/edit/usuarios/${id}`
        }
    }
    // Método para a apresentação dos dados da API
    function apr() { 
        return users.map((i) =>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
                <td>{i.email}</td>
                <td>{i.user_git}</td>
                <td>{i.excluido?'Sim':'Não'}</td>
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
                            <td>E-mail</td>
                            <td>User Git</td>
                            <td>Excluido</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {apr()}
                    </tbody>
                </table>
                <br/>
                <button onClick={()=>redirecionar('proj')}>Projetos</button>
            </center>
        )
    } else {
        return(location.href="/login")
    }
}