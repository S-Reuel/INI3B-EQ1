import { useParams } from "react-router-dom"
import { deleteEquipe, deleteUserByEquipe, getEquipeById, getMembros, getUserByName, updateEquipe } from "../data/services/API"
import { useEffect, useState } from "react"
import { isDeCripto, redirecionar } from "./util/functions"
import CabProj from "../ui/components/_cabecalho"
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import userIcon from "../ui/icons/user.png"
import trashIcon from "../ui/icons/trash.png"

export default function Editar_Equipe() {
    const { id_equipe } = useParams()
    let decript_id = isDeCripto(id_equipe)
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [membros, setMembros] = useState([])
    const [addMembro, setAddMembro] = useState([])

    useEffect(() => {
        async function fetch() {
            let eq = await getEquipeById(decript_id)
            let me = await getMembros(decript_id)
            setMembros(me)
            setNome(eq.nome)
            setDesc(eq.descricao)
        }
        fetch()
    }, [])

    async function remover(param, tipo) {
        if (tipo == "Membros futuros") {
            let a = addMembro.filter(obj => obj.ID != param)
            setAddMembro(a)
        } else if (tipo == "Membros") {
            let mensagem = await deleteUserByEquipe(param)
            if (mensagem) {
                document.getElementById("erro").innerHTML = "Membro não removido da equipe!"
            }
        }
    }

    function listarAddMembros() {
        if (addMembro.length != 0) {
            return (
                <>
                    <div className={editEquipeStyle.membrosAtuaisDiv}>
                        <div className={editEquipeStyle.atuaisTitulo2}>
                            <label>Membros a serem adicionados</label>
                            <div className={editEquipeStyle.btnRemoverTodos} onClick={() => { setAddMembro([]) }}>Remover todos</div>
                        </div>
                        <table className={editEquipeStyle.atuaisTable}>
                            <tr className={editEquipeStyle.thAtuais}>
                                <td className={editEquipeStyle.thhAtuais}>Nome</td>
                                <td className={editEquipeStyle.thhAtuais2}>Função</td>
                                <td></td>
                            </tr>
                            {addMembro.map((i) => {
                                return (
                                    <tr className={editEquipeStyle.trAtuais}>
                                        <td className={editEquipeStyle.tdAtuaisUser}>{i.nome}</td>
                                        <td className={editEquipeStyle.tdAtuais2}>{i.papel}</td>
                                        <td><div className={editEquipeStyle.remvBtn} onClick={() => { remover(i.ID, "Membros futuros") }}><img src={trashIcon} className={editEquipeStyle.trashImg} /></div></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>

                </>
            )
        }
    }

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
        updateEquipe(addMembro, isDeCripto(id), { nome, descricao })
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
                    <div className={editEquipeStyle.membrosAtuaisDiv}>
                        <div className={editEquipeStyle.atuaisTitulo}>Membros Atuais</div>
                        <table className={editEquipeStyle.atuaisTable}>
                            <tr className={editEquipeStyle.thAtuais}>
                                <td className={editEquipeStyle.thhAtuais}>Nome</td>
                                <td className={editEquipeStyle.thhAtuais2}>Função</td>
                                <td ></td>
                            </tr>
                            {membros.map((i) => {
                                return (
                                    <tr className={editEquipeStyle.trAtuais}>
                                        <td className={editEquipeStyle.tdAtuaisUser}>
                                            <img src={userIcon} className={editEquipeStyle.userImg} />
                                            {i.usuario.nome}
                                        </td>
                                        <td className={editEquipeStyle.tdAtuais2}>{i.papel}</td>
                                        <td><div className={editEquipeStyle.remvBtn} onClick={() => { remover(i.id, 'Membros') }}><img src={trashIcon} className={editEquipeStyle.trashImg} /></div></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <br />
                    <form >
                        <label>Adicionar membros: </label> <br /><br />
                        <input
                            type="text" id="addMembro"
                            placeholder="Digite o nome do membro"
                            onChange={handleChange} className={editEquipeStyle.inputMembro}
                        />
                        <div type="submit" onClick={pesquisar} className={editEquipeStyle.btnAdicionarMembro}>Adicionar</div>
                        <br />
                        <label id="erro" />
                    </form>
                    <br />
                    <label >
                        {listarAddMembros()}
                    </label>

                    <div className={editEquipeStyle.divBotoes}>
                        <button className={editEquipeStyle.formButtonDelete} onClick={async (e) => {
                            e.preventDefault()
                            membros.map((i) => { remover(i.id, 'Membros') })
                            await deleteEquipe(decript_id)
                        }}>
                            <img src={trashIcon} className={editEquipeStyle.trashImg2}/>
                         Excluir</button>
                        <button className={editEquipeStyle.formButton} type="submit" onClick={() => {onSave;redirecionar('eq')}}>Salvar Alterações</button>
                        <button className={editEquipeStyle.buttonReturn} type="button" onClick={() => redirecionar('eq')}>Cancelar</button>
                    </div>
                </form>
            </center>
        </div>
    )
}