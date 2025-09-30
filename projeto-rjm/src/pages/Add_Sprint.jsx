import { useState } from 'react'
import { postSprint } from "../data/services/API"
import { redirecionar } from "./util/functions"
import addSprintStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import { useParams } from 'react-router-dom'
export default function Add_Sprint() {
    const {projeto_id} = useParams()
    const [nome, setNome] = useState('')
    const [dataI, setDI] = useState()
    const [dataF, setDF] = useState()

    const onSave = async (e) => {
        e.preventDefault()
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${dataI}T${horario}`
        let data_fim = `${dataF}T${horario}`
        postSprint({ nome, data_inicio, data_fim, projeto_id})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addSprintStyle.paginaBody}>
                <center className={addSprintStyle.center}>
                    <h1 className={addSprintStyle.tituloPagina}>Criar nova Sprint</h1>
                    <form onSubmit={onSave} className={addSprintStyle.form}>
                        <label>
                            <label className={addSprintStyle.lbl}>Nome da Sprint</label><br />
                            <input
                                className={addSprintStyle.input}

                                type="text" name="nome"
                                placeholder="Digite aqui o nome da Sprint" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addSprintStyle.lbl}>Data de Inicio</label>  {/*--DIEGO:note que se o usuário clicar no calendário com um tema branco de navegador, o calendário também estará branco, dando um design ruim ao calendário*/}
                            <br />
                            <input className={addSprintStyle.input} type="date" required onChange={(e) => setDI(e.target.value)}/>
                        </label>
                        <br />
                        <label >
                            <label>Data de Termino</label>
                            <br />
                            <input className={addSprintStyle.input} type="date" required onChange={(e) => setDF(e.target.value)} />
                        </label>
                        <br /><br />
                        <button className={addSprintStyle.formButton} type="submit">Salvar Alterações</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}

/*
    Campos necessarios: nome da sprint, data de inicio, data de termino e id do projeto que ela está incerida;
    mudar o forms
    Criar Rotas na API
*/