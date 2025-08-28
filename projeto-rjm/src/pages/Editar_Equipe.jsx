import { useParams } from "react-router-dom";
import { getEquipeById, getUser, updateEquipe } from "../data/services/API";
import { useEffect, useState } from "react";
import CabProj from "../ui/components/_cabecalho";

export default function Editar_Equipe() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [membros, setMembros] = useState([])

    useEffect(() => {
        async function fetch() {
            const req = await getEquipeById(id)
            setMembros(cabras)
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
            <center>
                <h1>Editar Equipe</h1>
                <form>
                    <label>
                        Nome:<br />
                        <input
                            type="text" name="nome" defaultValue={nome}
                            placeholder="Digite o nome da equipe" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        Descrição:
                        <br />
                        <input
                            type="text" name="descricao" defaultValue={descricao}
                            placeholder="Digite a descrição da equipe" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br />
                    {/* Devemos ver isso! URGENTE! :) */}
                    <label >
                        <label>Membros</label> <br />
                        <select id='selectEquipes'>
                        </select>
                    </label>
                    <br /> <br />
                    <button type="submit" onClick={onSave}>Enviar</button>
                </form>
            </center>
        </div>
    )
}

/*
    Concertar os campos de input
*/