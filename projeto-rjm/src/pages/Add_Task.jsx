import { useState } from "react"
import { postTask } from "../data/services/API"
import { isFormatDate } from "./util/functions"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import { useParams } from "react-router-dom"


export default function Add_Task() {
    const {sprint_id} = useParams()
    const [titulo, setTitulo] = useState('')
    const [descricao, setDes] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        var element = document.getElementById("selectStatus");
        var arquivos = document.getElementById("arq").value
        var status = element.options[element.selectedIndex].value;
        let data = new Date()
        let horario = `${data.toISOString().split('T')[1]}`
        let dataCriacao = `${isFormatDate(data)}T${horario}`
        
        postTask(sprint_id, {titulo, descricao, status, arquivos})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Criar nova Task</h1>
                    <form onSubmit={onSave} className={addProjStyle.form}>
                        <input type="file" name="arquivo" id="arq" />
                        <br />
                        <label>
                            <label>Título da Task</label><br />
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o Título da Task" required
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label>Descricao</label><br />
                            <textarea 
                                rows='8' cols='50'
                                className={addProjStyle.input}
                                placeholder="Digite aqui o Título da Task" required
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label>Status</label><br />
                            <select id='selectStatus' className={addProjStyle.formButton}>
                                <option value={0}>Selecione</option>
                                <option value={'pendente'}>Pendente</option>
                                <option value={'em_andamento'}>Em andamento</option>
                                <option value={'atrasado'}>Atrasado</option>
                                <option value={'cancelado'}>Cancelado</option>
                                <option value={'concluido'}>Concluído</option>
                            </select>
                        </label>
                        <br /><br />
                        <button className={addProjStyle.formButton} type="submit">Criar</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}

/*
    titulo, descricao, status, dataCriacao, dataAtualizacao
*/