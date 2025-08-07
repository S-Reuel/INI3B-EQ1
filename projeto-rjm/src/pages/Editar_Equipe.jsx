import { useParams } from "react-router-dom";
import { getEquipeById, updateEquipe } from "../data/services/API";
import { useEffect, useState } from "react";
import { voltar } from "./util/functions";

export default function Editar_Equipe() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    useEffect(()=>{
        async function fetch() {
            const req = await getEquipeById(id)
            setNome(req.nome)
            setDesc(req.descricao)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateEquipe(id, {nome, descricao})
    }

    return (
        <div>
            <center>
                <h1>Editar Equipe</h1>
                <form>
                    <label>
                        Nome:<br />
                        <input
                            type="text" name="nome" defaultValue={nome}
                            placeholder="Digite seu nome" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        Descrição:
                        <br />
                        <input
                            type="text" name="descricao" defaultValue={descricao}
                            placeholder="Digite a descrição" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br /><br />
                    <button type="submit" onClick={onSave}>Enviar</button>
                </form>
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}

/*
    Concertar os campos de input
*/