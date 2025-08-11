import { useEffect, useState } from 'react'
import { getEquipeByUser, postProjeto } from "../data/services/API"
import { dateFormatter, redirecionar, voltar } from "./util/functions"
import "projeto-rjm/src/ui/components/_cabecalho.jsx"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'

export default function AddProj() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        async function fetch() {
            const req = await getEquipeByUser()
            setEquipes(req.equipes)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        let data = new Date()
        let data_criacao = dateFormatter(data)
        postProjeto({ nome, descricao, data_criacao })
    }

    function listaEquipe() {
        return equipes.map((i) =>
            <option>{i.nome}</option>
        )
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
                <CabProj />
                <center className={addProjStyle.center}>
                    <h1 className={addProjStyle.tituloPagina}>Criar novo projeto</h1>
                    <form onSubmit={onSave} className={addProjStyle.form}>
                        <label>
                            <label className={addProjStyle.lbl}>Nome do Projeto</label><br />
                            <input
                                className={addProjStyle.input}
                                type="text" name="nome"
                                placeholder="Digite aqui o nome do projeto" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addProjStyle.lbl}>Descrição</label>
                            <br />
                            <input
                                type="text" name="descricao"
                                className={addProjStyle.input}
                                placeholder="Digite aqui descrição do projeto" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addProjStyle.lbl}>Equipe</label>
                            <select className={addProjStyle.input}>
                                <option>Selecione</option>
                                {listaEquipe()}
                            </select>
                        </label>
                        <button type="submit" className={addProjStyle.formButton}>Criar Projeto</button>
                        <br />
                        <br />
                        <a onClick={() => redirecionar('addEq')}>Nova Equipe</a>
                    </form>
                    <button onClick={voltar}>Voltar</button>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}