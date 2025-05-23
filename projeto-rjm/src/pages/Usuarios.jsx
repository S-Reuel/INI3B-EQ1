import React, { useState, useEffect } from "react";
import { deleteUser, getUser, updateUser } from "../data/services/API.jsx";
import { offSession } from "../data/services/Session.jsx";
import UpdateUser from "./Update_User.jsx";

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

    async function onDelete(id){
        let conf = confirm('Tem certeza que deseja apagá-lo?')
        if (conf)
            await deleteUser(id)
    }

    async function onUpdate(id){
            await updateUser(id)
    }

    function redirecionar(caminho){
        if( caminho == 'logout'){
            offSession('authToken')
            location.href='/'
        } else if( caminho == 'projetos'){
            location.href='/projetos'
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
                <td><button onClick={()=>onDelete(i.id)}>Excluir</button></td>
                <td><button onClick={()=><UpdateUser prop={(i.id)}/>}>Editar</button></td>
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