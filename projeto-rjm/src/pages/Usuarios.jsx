import React, { useState, useEffect } from "react";
import { deleteUser, getUser } from "../data/services/API.jsx";
import { offSession } from "../data/services/Session.jsx";

export default function Usuarios() {
    const [users, setUsers] = useState([])

    useEffect((e) => {
        // e.preventDefault()
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

    function action(){
        offSession('authToken')
        location.href='/'
    }

    function apr() {
        return users.map((i) =>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
                <td>{i.email}</td>
                <td>{i.user_git}</td>
                <td><button onClick={onDelete}>Excluir</button></td>
            </tr>
        )
    }

    return (
        <center>
            <h1>Usuários<br/><button onClick={action}>logout</button></h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>User Git</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {apr()}
                </tbody>
            </table>
        </center>
    );
}