import { useEffect, useState } from 'react'
import { postProjeto } from "../data/services/API"
import { dateFormatter, redirecionar, voltar } from "./util/functions"
import "projeto-rjm/src/ui/components/_cabecalho.jsx"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
export default function AddSprints() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getEquipeByUser() // Filtrar equipes pelo usuário
            setEqs(res.equipes)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        let data = new Date()
        let data_criacao = dateFormatter(data)
        postProjeto({ nome, data_criacao, data_fim, projetos_id })
    }

    function listaEquipe() {
        return equipes.map((i) =>
            <option value="">{i.nome}</option>
        )
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

                                type="text" name="nome"
                                placeholder="Digite aqui o nome da Sprint" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label>Descrição</label>
                            <br />
                            <input
                                type="text" name="descricao"
                                placeholder="Digite aqui descrição da Sprint" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <label >
                            <label>Equipe</label>
                            <br />
                            <select name="">
                                {listaEquipe()}
                            </select>
                        </label>
                        <br />
                        <button type="submit">Criar Sprint</button>
                    </form>
                    <button onClick={voltar}>Voltar</button>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}

/*
    Campos necessarios: nome da sprint, data de inicio, data de termino e id do projeto que ela está incerida;
    mudar o forms
    Criar Rotas na API
*/