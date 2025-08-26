import { useState } from "react"
import { postTask } from "../data/services/API"
import { isFormatDate } from "./util/functions"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"


export default function Add_Task() {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDes] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        var element = document.getElementById("selectStatus");
        var status = element.options[element.selectedIndex].value;
        let data = new Date()
        let horario = `${data.toISOString().split('T')[1]}`
        let dataCriacao = `${isFormatDate(data)}T${horario}`
        postTask({ titulo, descricao, status, dataCriacao})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Criar nova Task</h1>
                    <form onSubmit={onSave} className={addProjStyle.form}>
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
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o Título da Task" required
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label>Status</label><br />
                            <select id='selectStatus' className={addProjStyle.formButton}>
                                <option value={0}>Selecione</option>
                                <option value={'Pendente'}>Pendente</option>
                                <option value={'Andamento'}>Andamento</option>
                                <option value={'Concluído'}>Concluído</option>
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