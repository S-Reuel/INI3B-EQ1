import React, { useState, useEffect } from "react";
import { deleteUser, getUser } from "../data/services/API.jsx";
import { offSession } from "../data/services/Session.jsx";

export default function Usuarios() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getUser()
            setUsers(res)
        }
        fetch()
    }, [])

    async function onDelete(id){
        let conf = confirm('Tem certeza que deseja apagá-lo?')
        if (conf)
            await deleteUser(id)
    }

    function logout(){
        offSession('authToken')
        location.href='/'
    }

    function proj(){
        location.href='/projetos'
    }

    function apr() {
        return users.map((i) =>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
                <td>{i.email}</td>
                <td>{i.user_git}</td>
                <td>{i.excluido}</td>
                <td><button onClick={()=>onDelete(i.id)}>Excluir</button></td>
            </tr>
        )
    }

    return (
        <center>
            <h1>Usuários<br/><button onClick={logout}>logout</button></h1>
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
            <button onClick={proj}>Projetos</button>
        </center>
    );
}