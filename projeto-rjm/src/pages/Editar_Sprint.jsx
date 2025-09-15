import { useEffect, useState } from "react"
import { getSprintsId, updateSprint } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isDeCripto, isFormatDate } from "./util/functions"
import editSprintStyle from "projeto-rjm/src/ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Editar_Sprint() {
    const { id } = useParams()
    const [nome, setNome] = useState()
    const [dataI, setDI] = useState()
    const [dataF, setDF] = useState()
    const [projeto_id, setId] = useState()

    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(id)
            const res = await getSprintsId(decript_id)
            setId(res.projeto_id)
            setNome(res.nome)
            setDI(isFormatDate(new Date(res.data_inicio)))
            setDF(isFormatDate(new Date(res.data_fim)))
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault() 
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${dataI}T${horario}`
        let data_fim = `${dataF}T${horario}`
        updateSprint(id, { nome, data_inicio, data_fim, projeto_id})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={editSprintStyle.paginaBody}>
                <CabProj />
                <center className={editSprintStyle.center}>
                    <h1 className={editSprintStyle.tituloPagina}>Editar Sprint</h1>
                    <form  className={editSprintStyle.form} onSubmit={onSave}>
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
                            <input className={editSprintStyle.input} type="date" defaultValue={dataI} onChange={(e) => setDI(e.target.value)}/>
                        </label>
                        <br />
                        <label >
                            <label className={editSprintStyle.lbl}>Data de Termino</label>
                            <br />
                            <input className={editSprintStyle.input} type="date" defaultValue={dataF} onChange={(e) => setDF(e.target.value)}/>
                        </label>
                        <br /><br />
                        <div className={editSprintStyle.divBotoes}>
                            <button className={editSprintStyle.formButton} type="submit">Salvar Alterações</button>
                            <button className={editSprintStyle.btnFechaModal} type="button" onClick={history.back}>Cancelar</button>

                        </div>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}