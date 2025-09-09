import { useEffect, useState } from "react"
import { getUserByName, postEquipe } from "../data/services/API"
import { redirecionar } from "./util/functions"

import addEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Add_Equipe() {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    let [membros, setMembro] = useState([])

    function handleChange(event) {
        setPesquisa(event.target.value)
    }

    async function pesquisar(e) {
        e.preventDefault()
        let res = await getUserByName(pesquisa)
        document.getElementById("addMembro").value = ''
        if (!(res.nome == undefined)) {
            document.getElementById("erro").innerHTML = ''
            let item = [{ 'ID': `${res.id}`, 'nome': `${res.nome}` }, ...membros]
            setMembro(item)
            setPesquisa('')
        } else {
            document.getElementById("erro").innerHTML = "Não encontrado! Por favor digite o nome novamente"
        }
    }

    const onSave = async (e) => {
        e.preventDefault()
        postEquipe(membros.map((i)=>{return(i.ID)}), { nome, descricao })
    }


    if (localStorage.getItem('authToken')) {
        return (
            <div className={addEquipeStyle.paginaBody}>
                <center className={addEquipeStyle.center}>
                    <h1 className={addEquipeStyle.tituloPagina}>Nova Equipe!</h1>
                    <form className={addEquipeStyle.form}>
                        <label>
                            <label className={addEquipeStyle.lbl}>Nome:</label><br />
                            <input
                                type="text" nome="nome"
                                placeholder="Digite o nome da equipe" required
                                onChange={(e) => setNome(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addEquipeStyle.lbl}>Descrição:</label>
                            <br />
                            <textarea
                                rows='8' cols='50'
                                placeholder="Digite a descrição da equipe" required
                                onChange={(e) => setDesc(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <form >
                            <label className={addEquipeStyle.lbl}>Adicionar membros: </label> <br />
                            <input
                                type="text" id="addMembro"
                                placeholder="Digite o nome do membro"
                                onChange={handleChange}
                                className={addEquipeStyle.input}
                            />
                            <label id="erro" />
                            <button type="submit" onClick={pesquisar} className={addEquipeStyle.formButton}>Pesquisar</button>
                        </form>
                        <br />
                        <textarea
                            rows='6' cols='30'
                            value={membros.map((i) => { return(` ${i.nome}`) })}
                        />
                        <br /> <br />
                        <button type="submit" onClick={onSave} className={addEquipeStyle.formButton}>Criar</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}