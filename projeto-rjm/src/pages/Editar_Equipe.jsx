import { useParams } from "react-router-dom";
import { getEquipeById, getMembros, getUserByName, updateEquipe } from "../data/services/API";
import { useEffect, useRef, useState } from "react";
import CabProj from "../ui/components/_cabecalho";
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css";
import { redirecionar } from "./util/functions";

export default function Editar_Equipe() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [membros, setMembros] = useState([])
    const [addMembro, setAddMembro] = useState([])


    useEffect(() => {
        async function fetch() {
            let eq = await getEquipeById(id)
            let me = await getMembros(id)
            setMembros(me)
            setNome(eq.nome)
            setDesc(eq.descricao)
        }
        fetch()
    }, [])

    function remover(e, param) {
        e.preventDefault()
        let a = addMembro.filter(addMembro => addMembro.ID !== param)
        console.log(a)
    }

    function listarAddMembros() {
        if (addMembro.length != 0) {
            return (
                <>
                    <label>Membros a serem adicionados</label> <br />
                    <table>
                        <tr>
                            <td>Nome</td>
                            <td>Papel</td>
                            <td>
                                <button
                                    onClick={() => { if (window.confirm("Deseja realmente remover todos os usuários?")){setAddMembro([])}}}>
                                    Remover todos</button>
                            </td>
                        </tr>
                        {addMembro.map((i) => {
                            return (
                                <tr>
                                    <td>{i.nome}</td>
                                    <td>{i.papel}</td>
                                    <td><button onClick={() => { remover(i.id) }}>Remover</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </>
            )
        }
    }

    const handleClearAll = () => {


    };

    function handleChange(event) {
        setPesquisa(event.target.value)
    }

    async function pesquisar(e) {
        e.preventDefault()
        let res = await getUserByName(pesquisa)
        document.getElementById("addMembro").value = ''
        if (res.nome != undefined && res.excluido == false) {
            document.getElementById("erro").innerHTML = ''
            let item = [{ 'ID': `${res.id}`, 'nome': `${res.nome}`, "papel": "Dev" }, ...addMembro]
            setAddMembro(item)
            setPesquisa('')
        } else {
            document.getElementById("erro").innerHTML = "Não encontrado! Por favor digite o nome novamente"
        }
    }

    const onSave = (e) => {
        e.preventDefault()
        console.log("Sim")
        // updateEquipe(id, { nome, descricao })
    }

    return (
        <div className={editEquipeStyle.paginaBody}>
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
                            className={editEquipeStyle.inputPaginaPropria}
                            type="text" name="descricao" defaultValue={descricao}
                            placeholder="Digite a descrição da equipe" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br /> <br />
                    <label >
                        <label>Membros</label> <br />
                        <table>
                            <tr>
                                <td>Nome</td>
                                <td>Papel</td>
                            </tr>
                            {membros.map((i) => {
                                return (
                                    <tr>
                                        <td>{i.usuario.nome}</td>
                                        <td>{i.papel}</td>
                                        <td><button onClick={() => { remover(i.id) }}>Remover</button></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </label>
                    <br />
                    <form >
                        <label>Adicionar membros: </label> <br />
                        <input
                            type="text" id="addMembro"
                            placeholder="Digite o nome do membro"
                            onChange={handleChange}
                        />
                        <button type="submit" onClick={pesquisar}>Pesquisar</button>
                        <br />
                        <label id="erro" />
                    </form>
                    <br />
                    <label >
                        {listarAddMembros()}
                    </label>
                    <br /><br />

                    <div className={editEquipeStyle.divBotoes}>
                        <button className={editEquipeStyle.formButton} type="submit" onClick={onSave}>Salvar Alterações</button>
                        <button className={editEquipeStyle.buttonReturn} type="button" onClick={() => redirecionar('eq')}>Cancelar</button>
                    </div>
                </form>
            </center>
        </div>
    )
}