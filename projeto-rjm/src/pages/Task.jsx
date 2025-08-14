import { useEffect, useState } from "react";
import { isFormat, redirecionar } from "./util/functions";
import { getTaskBySprint } from "../data/services/API";
import { useParams } from "react-router-dom";
import CabProj from "../ui/components/_cabecalho";
import imgMaisProjeto from '../ui/icons/mais.png'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'

export default function Task() {
    const { id } = useParams()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getTaskBySprint(id)
            setTasks(res)
        }
        fetch()
    }, []);

    // Função utilizada para otimizar o envio do ID pela URL
    const caminho = (id, tipo) => {
        if (tipo == 'task') {
            location.href = `${id}`
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
                    <tr key={i.id}>
                        <p>{i.id}   {i.titulo}  {i.descricao}   {i.status}  {dataCriacao} {dataAtualizacao}
                            <button onClick={(e) => {
                                e.stopPropagation()
                                caminho(i.id, 'ed')
                            }}>Editar</button></p>
                    </tr>
                </div>
            )
        })
    }

    if (localStorage.getItem('authToken')) {
        if (tasks.length != 0) {
            return (
                <>
                    <CabProj />
                    <center>
                        <h1>Tasks</h1>
                        <table>
                            <thead>
                                <tr>
                                    <p>ID  Título  descrição   Status   data de criação     data de atualização</p>
                                </tr>
                            </thead>
                            <tbody>
                                {apr()}
                            </tbody>
                        </table>
                        <br />
                        <a onClick={() => { redirecionar('addTask') }}><div className={StyleProj.botaoNewProjeto}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div></a>
                    </center>
                </>
            )
        } else {
            return (
                <>
                    <CabProj />
                    <center className={StyleProj.bodyProjs}>
                        <br />
                        <div className={StyleProj.tituloPag}>Projetos Inscritos</div>
                        <br /><br /><br />
                        <h4>Sem projetos! Crie projetos!</h4>
                        <br />
                    </center>
                    <a onClick={() => { redirecionar('addProj') }}><div className={StyleProj.botaoNewProjeto}><img src={imgMaisProjeto} className={StyleProj.imgEditarProj} /></div></a>
                </>)
        }
    } else {
        return (redirecionar('login'))
    }
}