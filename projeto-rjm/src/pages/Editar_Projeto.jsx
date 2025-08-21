import { useParams } from "react-router-dom";
import { getProjetoId, updateProjeto } from "../data/services/API";
import { useEffect, useState } from "react";
import { voltar } from "./util/functions";

import addProjStyle from "../ui/styles/editar_Projeto/editar_Projeto.module.css"


export default function Editar_Projeto() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    useEffect(() => {
        async function fetch() {
            const req = await getProjetoId(id)
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
            <div className={addProjStyle.paginaBody}>
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Editar Projeto</h1>
                    <form  className={addProjStyle.form}>
                        <label >
                            <p className={addProjStyle.inputTipo}>Nome do Projeto:</p>
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome" defaultValue={nome}
                                placeholder="Nome Antigo" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label >
                            <p className={addProjStyle.inputTipo}>Descrição:</p>
                            <input
                                className={addProjStyle.input}
                                type="text" name="descricao" defaultValue={descricao}
                                placeholder="Descrição Antiga" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br /><br />
                        <div className={addProjStyle.divBotoes}>
                            <button className={addProjStyle.formButton} type="submit" onClick={onSave}>Salvar Alterações</button>
                            <button className={addProjStyle.buttonReturn} onClick={voltar}>Cancelar</button>
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

/*
    Concertar os campos de input
*/