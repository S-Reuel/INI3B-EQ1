import { useEffect, useState } from "react";
import { redirecionar } from "./util/functions";

export default function Task() {
    const [] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getSprintsByProjeto(id)
            setSprints(res)
        }
        fetch()
    }, []);

    function apr() {
        return sprints.map(function (i) {
            let dataInicio = isFormat(new Date(i.data_inicio))
            let dataFim = isFormat(new Date(i.data_fim))
            return (
                <div onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.nome}</td>
                        <td>{dataInicio}</td>
                        <td>{dataFim}</td>
                        <td>{i.projeto_id}</td>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>Editar</button>
                    </tr>
                </div>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <center>
                    <h1>Sprints</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Data inicio</td>
                                <td>Data termino</td>
                                <td>Id projeto</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {apr()}
                        </tbody>
                    </table>
                    <br />
                    <a onClick={() => { redirecionar('addSpr') }}><div className={StyleProj.botaoNewProjeto}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div></a>
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}