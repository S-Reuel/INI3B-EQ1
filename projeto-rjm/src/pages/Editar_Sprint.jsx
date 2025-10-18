import { useEffect, useState } from "react"
import { deleteSprint, getSprintsId, updateSprint } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isDeCripto, isFormatDate, voltar } from "./util/functions"
import trashy from '../ui/icons/trash.png'
import editSprintStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Editar_Sprint() {
    const { id_sprint } = useParams()
    const [nome, setNome] = useState()
    const [dataI, setDI] = useState()
    const [dataF, setDF] = useState()
    const [projeto_id, setId] = useState()
    let decript_id = isDeCripto(id_sprint)

    useEffect(() => {
        async function fetch() {
            const res = await getSprintsId(decript_id)
            setId(res.projeto_id)
            setNome(res.nome)
            setDI(new Date(res.data_inicio).toISOString().split('T')[0])
            setDF(new Date(res.data_fim).toISOString().split('T')[0])
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${dataI}T${horario}`
        let data_fim = `${dataF}T${horario}`
        let res = updateSprint(decript_id, { nome, data_inicio, data_fim, projeto_id })
        if(res){
            voltar()
        } else {
            document.getElementById("response").innerHTML = "Não foi possível alterar Sprint!!"
        }
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={editSprintStyle.paginaBody}>
                <CabProj />
                <center className={editSprintStyle.center}>
                    <h1 className={editSprintStyle.tituloPagina}>Editar Sprint</h1>
                    <h3 id="response"/>
                    <form className={editSprintStyle.form} onSubmit={onSave}>
                        <label>
                            <label className={editSprintStyle.lbl}>Nome da Sprint</label><br />
                            <input
                                className={editSprintStyle.input}
                                type="text" name="nome" defaultValue={nome}
                                placeholder="Digite aqui o nome da Sprint" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={editSprintStyle.lbl}>Data de Inicio</label>
                            <br />
                            <input className={editSprintStyle.input} type="date" defaultValue={dataI} onChange={(e) => {
                                if (e.target.value != dataF) {
                                    document.getElementById("response").innerHTML = ""
                                    setDI(e.target.value)
                                } else {
                                    document.getElementById("response").innerHTML = "Data não aceita!"
                                    setDI('')
                                }
                            }} />
                        </label>
                        <br />
                        <label >
                            <label className={editSprintStyle.lbl}>Data de Termino</label>
                            <br />
                            <input className={editSprintStyle.input} type="date" defaultValue={dataF} onChange={(e) => {
                                if (e.target.value > dataI && e.target.value != dataI) {
                                    document.getElementById("response").innerHTML = ""
                                    setDF(e.target.value)
                                } else {
                                    document.getElementById("response").innerHTML = "Data não aceita!"
                                    setDF('')
                                }
                            }} />
                        </label>
                        <br /><br />
                        <div className={editSprintStyle.divBotoes}>
                            <button className={editSprintStyle.formButtonDelete} onClick={async (e) => {
                                e.stopPropagation()
                                await deleteSprint(decript_id)
                            }}>
                                <img src={trashy} className={editSprintStyle.trashImg2} />
                                Excluir</button>
                            <button className={editSprintStyle.formButton} type="submit">Salvar Alterações</button>
                            <button className={editSprintStyle.btnFechaModal} type="button" onClick={() => { history.back(); window.close(); }}>Cancelar</button>

                        </div>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}