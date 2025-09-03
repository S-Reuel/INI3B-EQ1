import { useParams } from "react-router-dom";
import { getEquipeById, getUser, updateEquipe } from "../data/services/API";
import { useEffect, useState } from "react";
import CabProj from "../ui/components/_cabecalho";
import editEquipeStyle from "../ui/styles/shared/AddEditProjUsuario.module.css";
import { redirecionar } from "./util/functions";

export default function Editar_Equipe() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [membros, setMembros] = useState([])

    useEffect(() => {
        async function fetch() {
            const req = await getEquipeById(id)
            setMembros()
            setNome(req.nome)
            setDesc(req.descricao)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateEquipe(id, { nome, descricao })
    }

    return (
        <div>
            <CabProj />
            <center className={editEquipeStyle.center}>
                <h1 className={editEquipeStyle.tituloPagina}>Editar Equipe</h1>
                <form className={editEquipeStyle.form}>
                    <label>
                        <p className={editEquipeStyle.inputTipo}>Nome:</p>
                        <input
                            className={editEquipeStyle.input}
                            type="text" name="nome" defaultValue={nome}
                            placeholder="Digite o nome da equipe" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        <p className={editEquipeStyle.inputTipo}>Descrição:</p>
                        <input
                            className={editEquipeStyle.input}
                            type="text" name="descricao" defaultValue={descricao}
                            placeholder="Digite a descrição da equipe" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br />
                    {/* Devemos ver isso! URGENTE! :) */}
                    <label >
                        <label>Membros</label> <br />
                        <select className={editEquipeStyle.input} id='selectEquipes'>
                        </select>
                    </label>
                    <br /> <br />

                    <div className={editEquipeStyle.divBotoes}>
                        <button className={editEquipeStyle.formButton} type="submit" onClick={onSave}>Salvar Alterações</button>
                        <button className={editEquipeStyle.buttonReturn} type="button" onClick={(e) => redirecionar('eq')}>Cancelar</button>
                    </div>
                </form>
            </center>
        </div>
    )
}

/*
    Concertar os campos de input
*/