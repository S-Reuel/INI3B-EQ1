import { useParams } from "react-router-dom"
import { deleteEquipe, deleteUserByEquipe, getEquipeById, getMembros, getUserByName, updateEquipe, changePapel, getUserByEmail } from "../data/services/API"
import { useEffect, useState } from "react"
import { hideButtonsByFuncao, isDeCripto, isCripto, useRedirecionar } from "./util/functions"
import CabProj from "../ui/components/_cabecalho"
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import userIcon from "../ui/icons/user.png"
import trashIcon from "../ui/icons/trash.png"

export default function Editar_Equipe() {
    const redirecionar = useRedirecionar()
    const { id_equipe } = useParams()
    let decript_id = isDeCripto(id_equipe)
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [membros, setMembros] = useState([])

    useEffect(() => {
        async function fetch() {
            let getUser = await getUserByEmail()
            let eq = await getEquipeById(decript_id)
            let me = await getMembros(decript_id)
            setMembros(me)
            setNome(eq.nome)
            setDesc(eq.descricao)
            me.forEach(e => {
                if (e.usuario.id == getUser.id) {
                    localStorage.setItem('authFunc', isCripto(e.papel))
                }
            });
        }
        fetch()
    }, [])

    async function remover(param) {
        let res = await deleteUserByEquipe(param)
        if (res) {
            document.getElementById("erro").innerHTML = "Membro não removido da equipe!"
        } else {
            location.reload()
        }
    }

    function handleChange(event) {
        setPesquisa(event.target.value)
    }

    async function pesquisar(e) {
        e.preventDefault()
        let res = await getUserByName(pesquisa)
        let papel = document.getElementById("selectPapel").options[document.getElementById("selectPapel").selectedIndex].value
        document.getElementById("addMembro").value = ''
        let ids = []
        membros.forEach(e => {
            ids.push(e.usuario.id)
        });
        if (ids.indexOf(res.id) == -1) {
            if (res.nome != undefined && res.excluido == false) {
                document.getElementById("erro").innerHTML = ''
                let item = [{ 'ID': `${res.id}`, 'nome': `${res.nome}`, "papel": `${papel}` }]
                await updateEquipe(item, decript_id, { nome, descricao })
                setPesquisa('')
            } else {
                document.getElementById("erro").innerHTML = "Não encontrado! Por favor digite o nome novamente"
            }
        } else {
            document.getElementById("erro").innerHTML = "Esse membro já está incluso!"
        }
    }

    async function onSave(e) {
        e.preventDefault()
        await updateEquipe(0, decript_id, { nome, descricao })
    }

    if (localStorage.getItem('authToken')) {
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
                                <thead>
                                    <tr className={editEquipeStyle.thAtuais}>
                                        <td className={editEquipeStyle.thhAtuais}>Nome</td>
                                        <td className={editEquipeStyle.thhAtuais2}>Função</td>
                                        <td ></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {membros?.map((i, index) => {
                                        return (
                                            <tr key={index} className={editEquipeStyle.trAtuais}>
                                                <td className={editEquipeStyle.tdAtuaisUser}>
                                                    <img src={userIcon} className={editEquipeStyle.userImg} />
                                                    {i.usuario.nome}
                                                </td>
                                                <td className={editEquipeStyle.tdAtuais2}> {i.papel.charAt(0).toUpperCase() + i.papel.slice(1)}</td>
                                                <td><div className={(hideButtonsByFuncao() == "gestor") ? editEquipeStyle.remvBtn : editEquipeStyle.remvBtn_hide} onClick={() => { remover(i.id) }}><img src={trashIcon} className={editEquipeStyle.trashImg} /></div></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div className={(hideButtonsByFuncao()=="gestor")?editEquipeStyle.addMembro:editEquipeStyle.addMembro_hide}>
                            <label>Adicionar membro: </label> <br /><br />
                            <input
                                type="text" id="addMembro"
                                placeholder="Digite o nome do membro"
                                onChange={handleChange} className={editEquipeStyle.inputMembro}
                            />
                            <br />
                            <label>Função:</label>
                            <br /> <br />
                            <select className={editEquipeStyle.input} id='selectPapel' style={{ width: "auto" }}>
                                <option value={'dev'} >Dev</option>
                                <option value={'lider'}>Líder</option>
                                <option value={'gestor'}>Gestor</option>
                            </select>
                            <div type="submit" onClick={pesquisar} className={editEquipeStyle.btnAdicionarMembro}>Adicionar</div>
                            <br />
                            <label style={{ color: "red" }} id="erro" />
                            <br /> <br />
                        </div>
                        <div className={editEquipeStyle.divBotoes}>
                            <button type="button" className={(hideButtonsByFuncao() == "gestor") ? editEquipeStyle.formButtonDelete : editEquipeStyle.formButtonDelete_hide} onClick={() => { deleteEquipe(decript_id) }}>
                                <img src={trashIcon} className={editEquipeStyle.trashImg2} />
                                Excluir</button>
                            <button className={(hideButtonsByFuncao() == "gestor") ? editEquipeStyle.formButton : editEquipeStyle.formButton_hide} type="button" onClick={(e) => { onSave(e) }}>Salvar Alterações</button>
                            <button className={(hideButtonsByFuncao() == "gestor") ? editEquipeStyle.buttonReturn : editEquipeStyle.buttonReturn_hide} type="button" onClick={() => redirecionar('eq')}>Cancelar</button>
                        </div>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}