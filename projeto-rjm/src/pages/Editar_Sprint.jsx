import { useEffect, useState } from "react"
import { getSprintsId, updateSprint } from "../data/services/API"
import CabProj from "../ui/components/_cabecalho"
import { useParams } from "react-router-dom"
import { isFormatDate } from "./util/functions"

export default function Editar_Sprint() {
    const { id } = useParams()
    const [nome, setNome] = useState()
    const [dataI, setDI] = useState()
    const [dataF, setDF] = useState()
    const [projeto_id, setId] = useState()

    useEffect(() => {
        async function fetch() {
            const res = await getSprintsId(id)
            setId(res.projeto_id)
            setNome(res.nome)
            // Explicação para o segundo parametro da função isFormatDate está no arquivo functions
            setDI(isFormatDate(new Date(res.data_inicio), "get"))
            setDF(isFormatDate(new Date(res.data_fim), "get"))
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault() 
        let horario = `${new Date().toISOString().split('T')[1]}`
        let data_inicio = `${isFormatDate(new Date(dataI), "update")}T${horario}`
        let data_fim = `${isFormatDate(new Date(dataF), "update")}T${horario}`
        updateSprint(id, { nome, data_inicio, data_fim, projeto_id})
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div >
                <CabProj />
                <center>
                    <h1>Criar nova Sprint</h1>
                    <form onSubmit={onSave}>
                        <label>
                            <label>Nome da Sprint</label><br />
                            <input

                                type="text" name="nome" defaultValue={nome}
                                placeholder="Digite aqui o nome da Sprint" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label>Data de Inicio</label>
                            <br />
                            <input type="date" defaultValue={dataI} onChange={(e) => setDI(e.target.value)}/>
                        </label>
                        <br />
                        <label >
                            <label>Data de Termino</label>
                            <br />
                            <input type="date" defaultValue={dataF} onChange={(e) => setDF(e.target.value)}/>
                        </label>
                        <br /><br />
                        <button type="submit">Atualiza Sprint</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}