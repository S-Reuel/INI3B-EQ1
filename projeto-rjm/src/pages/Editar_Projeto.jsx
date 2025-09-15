import { useParams } from "react-router-dom";
import { getProjetoId, updateProjeto } from "../data/services/API";
import { useEffect, useState } from "react";
import editProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from "../ui/components/_cabecalho";
import { isDeCripto } from "./util/functions";


export default function Editar_Projeto() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    useEffect(() => {
        async function fetch() {
            let decript_id = isDeCripto(id)
            const req = await getProjetoId(decript_id)
            setNome(req.nome)
            setDesc(req.descricao)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateProjeto(id, { nome, descricao })
    }
    if (localStorage.getItem('authToken')) {
        return (
            <div className={editProjStyle.paginaBody}>
                <CabProj/>
                <center className={editProjStyle.center}>
                    <h1 className={editProjStyle.tituloPagina}>Editar Projeto</h1>
                    <form  className={editProjStyle.form}>
                        <label >
                            <p className={editProjStyle.inputTipo}>Nome do Projeto:</p>
                            <input
                                className={editProjStyle.input}
                                type="text" name="nome" defaultValue={nome}
                                placeholder="Nome Antigo" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label >
                            <p className={editProjStyle.inputTipo}>Descrição:</p>
                            <textarea 
                                rows='8' cols='50'
                                className={editProjStyle.input}
                                defaultValue={descricao}
                                placeholder="Descrição Antiga" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br /><br />
                        <div className={editProjStyle.divBotoes}>
                            <button className={editProjStyle.formButton} type="submit" onClick={onSave}>Salvar Alterações</button>
                        </div>

                    </form>
                    <br/>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}