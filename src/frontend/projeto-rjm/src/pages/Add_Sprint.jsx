import { useState } from 'react'
import { postSprint } from "../data/services/API"
import { isDeCripto, isFormatDate, redirecionar } from "./util/functions"
import addSprintStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import { useParams } from 'react-router-dom'
export default function Add_Sprint() {
    const {projeto_id} = useParams()
    const [nome, setNome] = useState('')
    const [dataI, setDI] = useState()
    const [dataF, setDF] = useState()
    let decript_id = isDeCripto(projeto_id)

    const onSave = async (e) => {
        e.preventDefault()
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${dataI}T${horario}`
        let data_fim = `${dataF}T${horario}`
        let res = await postSprint({ nome, data_inicio, data_fim, projeto_id: decript_id})
        if (res) {
            document.getElementById("response").innerHTML = "Não foi possível a criação"
        }
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addSprintStyle.paginaBody}>
                <center className={addSprintStyle.center}>
                    <h1 className={addSprintStyle.tituloPagina}>Nova Sprint</h1>
                    <h3 id="response"></h3>
                    <form onSubmit={onSave} className={addSprintStyle.form}>
                        <label>
                            <label className={addSprintStyle.lbl}>Nome da Sprint</label><br /><br />
                            <input
                                className={addSprintStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o nome da Sprint" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addSprintStyle.lbl}>Data de Inicio</label><br />  {/*--DIEGO:note que se o usuário clicar no calendário com um tema branco de navegador, o calendário também estará branco, dando um design ruim ao calendário*/}
                            <br />
                            <input className={addSprintStyle.input} type="date" value={dataI} required onChange={(e) => {
                                if(e.target.value != dataF){
                                    document.getElementById("response").innerHTML = ""
                                    setDI(e.target.value)
                                } else {
                                    setDI("")
                                    document.getElementById("response").innerHTML = "Data não aceita!"
                                }
                                }} />
                        </label>
                        <br />
                        <label >
                            <label>Data de Termino</label>
                            <br /><br />
                            <input className={addSprintStyle.input} type="date" value={dataF} required onChange={(e) => {
                                if(e.target.value > dataI && e.target.value != dataI){
                                    document.getElementById("response").innerHTML = ""
                                    setDF(e.target.value)
                                } else {
                                    setDF("")
                                    document.getElementById("response").innerHTML = "Data não aceita!"
                                }
                                }} />
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