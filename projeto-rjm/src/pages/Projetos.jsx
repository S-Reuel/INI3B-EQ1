import React, { useEffect, useState } from "react";
import { getProj } from "../data/services/API.jsx";

export default function Projetos() {
    const [proj, setProj] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getProj()
            setProj(res)
        }
        fetch()
    }, []);

    const A = (e) => {
        e.preventDefault()
        location.href = '/add/project'
    }

    function apr() {
        let mesFormat = {
            0: "Janeiro", 1: "Fevereiro",
            2: "Março", 3: "Abril",
            4: "Maio", 5: "Junho",
            6: "Julho", 7: "Agosto",
            8: "Setembro", 9: "Outubro",
            10: "Novembro", 11: "Dezembro"
        }
        return proj.map(function (i) {
            let data = new Date(i.data_criacao)
            let mes = data.getMonth()
            let ano = data.getFullYear()
            let dia = data.getDate() + 1
            let format = `${dia} de ${mesFormat[mes]} de ${ano}`;
            return <tr key={i.id}>
                <td>{i.nome}</td>
                <td>{i.descricao}</td>
                <td>{format}</td>
            </tr>
        })
    }

    return (
        <center>
            <h1>Projetos</h1>
            <br />
            <button onClick={A}>Adicionar Projeto</button>
            <br /><br /><br />
            <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Data de Criação</td>
                    </tr>
                </thead>
                <tbody>
                    {apr()}
                </tbody>
            </table>
            <br />
            <a href="/"><button>Voltar</button></a>
        </center>
    );
}