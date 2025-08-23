import { useEffect, useState } from 'react'
import { getEquipeByUser, postProjeto } from "../data/services/API"
import { redirecionar } from "./util/functions"
import "projeto-rjm/src/ui/components/_cabecalho.jsx"
import addProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Add_Projeto() {
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
        var element = document.getElementById("selectEquipes");
        var equipe_id = element.options[element.selectedIndex].value;
        postProjeto(equipe_id, { nome, descricao})
    }

    function listaEquipe() {
        return equipes.map((i) =>
            <option value={i.id}>{i.nome}</option>
        )
    }

    if (localStorage.getItem('authToken')) {
        return (
            <div className={addProjStyle.paginaBody}>
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
                            <select className={addProjStyle.input} id='selectEquipes'>
                                <option value={0}>Selecione</option>
                                {listaEquipe()}
                            </select>
                        </label>
                        <button type="submit" className={addProjStyle.formButton}>Criar</button>
                        <br />
                        <br />
                        <a className={addProjStyle.botaoNovaEquipe} onClick={() => redirecionar('addEq')}>Nova Equipe</a>
                        
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}