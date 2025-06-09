import { useParams } from "react-router-dom";
import { getProjId, updateProj } from "../data/services/API";
import { useEffect, useState } from "react";
import { dateFormatter, voltar } from "./util/functions";

export default function Editar_Projeto() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')

    useEffect(()=>{
        async function fetch() {
        const req = await getProjId(id)
        setNome(req.nome)
        setDesc(req.descricao)}
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        // let data = new Date()
        // let data_update = dateFormatter(data)
        updateProj(id, {nome, descricao})
    }

    return (
        <div>
            <center>
                <h1>Editar projeto</h1>
                <form>
                    <label>
                        Nome:<br />
                        <input
                            type="text" nome="nome" value={nome}
                            placeholder="Digite seu nome" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        Descrição:
                        <br />
                        <input
                            type="text" name="descricao" value={descricao}
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