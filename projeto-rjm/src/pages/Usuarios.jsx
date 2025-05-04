import React, { useState, useEffect } from "react";
import { deleteUser, getUser } from "../data/services/API.jsx";

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
        let res
        if (conf)
            res = await deleteUser(id)
    }

    function apr() {
        return users.map((i) =>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
                <td>{i.email}</td>
                <td>{i.user_git}</td>
                <td><button title="Delete" onClick={onDelete(i.id)}></button></td>
            </tr>
        )
    }

    return (
        <>
            <h1>Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>User Git</td>
                    </tr>
                </thead>
                <tbody>
                    {apr()}
                </tbody>
            </table>
        </>
    );
}