import { useEffect, useState } from "react";
import { isFormat, redirecionar } from "./util/functions"
import { getTaskBySprint } from "../data/services/API"
import { useParams } from "react-router-dom"
import CabProj from "../ui/components/_cabecalho"

export default function Task() {
    const { id } = useParams()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getTaskBySprint(id)
            setTasks(res.tasks)
        }
        fetch()
    }, []);

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
        if (tipo == 'task') {
            alert("Ainda não funciona!!!")
        } else if (tipo == 'ed') {
            location.href = `/sprint/edit/task/${id}`
        }
    }

    function apr() {
        return tasks.map(function (i) {
            let dataCriacao = isFormat(new Date(i.created_at))
            let dataAtualizacao = isFormat(new Date(i.updated_at))
            return (
                <div onClick={(e) => {
                    e.stopPropagation()
                    caminho(i.id, 'task')
                }}>
                    <p>
                        {i.id}   {i.titulo}  {i.descricao}   {i.status}  {dataCriacao} {dataAtualizacao}
                        <button onClick={(e) => {
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>Editar</button>
                    </p>
                </div>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
                <center>
                    <h1>Tasks</h1>
                    {(tasks.length != "") ? (
                        <div>
                            <p>ID  Título  descrição   Status   data de criação     data de atualização</p>
                            {apr()}
                        </div>
                    ) : (
                        <>
                            <br /><br /><br />
                            <h4>Sem Task! Crie uma task!</h4>
                            <br />
                        </>
                    )}
                    <br />
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}