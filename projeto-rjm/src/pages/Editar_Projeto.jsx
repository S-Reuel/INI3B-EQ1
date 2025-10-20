import { useParams } from "react-router-dom";
import { deleteProjeto, getProjetoId, updateProjeto } from "../data/services/API";
import { useEffect, useState } from "react";
import editProjStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from "../ui/components/_cabecalho";
import { isDeCripto, voltar } from "./util/functions";
import trashy from '../ui/icons/trash.png'


export default function Editar_Projeto() {
    const { id_projeto } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    let decript_id = isDeCripto(id_projeto)

    useEffect(() => {
        async function fetch() {
            const req = await getProjetoId(decript_id)
            setNome(req.nome)
            setDesc(req.descricao)
        }
        fetch()
    }, [])

    async function onSave(e) {
        e.preventDefault()
        let res = updateProjeto(decript_id, { nome, descricao })
        if (res) {
            voltar()
        } else {
            document.getElementById("response").innerHTML = "Não foi possível atualizar o projeto!!"
        }
    }
    if (localStorage.getItem('authToken')) {
        return (
            <div className={editProjStyle.paginaBody}>
                <CabProj />
                <center className={editProjStyle.center}>
                    <h1 className={editProjStyle.tituloPagina}>Editar Projeto</h1>
                    <h3 id="response" />
                    <form className={editProjStyle.form}>
                        <label >
                            <p className={editProjStyle.inputTipo}>Nome do Projeto:</p>
                            <input
                                className={editProjStyle.input}
                                type="text" name="nome" defaultValue={nome}
                                placeholder="Nome Antigo" required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label >
                            <p className={editProjStyle.inputTipo}>Descrição:</p>
                            <textarea
                                rows='8' cols='50'
                                className={editProjStyle.input}
                                defaultValue={descricao}
                                placeholder="Descrição Antiga" required
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <br /><br />
                        <div className={editProjStyle.divBotoes}>
                            <button type="button" className={editProjStyle.formButtonDelete} onClick={async () => { await deleteProjeto(decript_id) }}>
                                <img src={trashy} className={editProjStyle.trashImg2} />
                                Excluir</button>
<<<<<<< HEAD
                            <button className={editProjStyle.formButton} type="button" onClick={(e) => onSave(e)}>Salvar Alterações</button>
                            <button className={editProjStyle.btnFechaModal} type="button" onClick={() => { location.replace(document.referrer); window.close(); }}>Cancelar</button>
=======
                            <button className={editProjStyle.formButton} type="button" onClick={(e)=>onSave(e)}>Salvar Alterações</button>
                            <button className={editProjStyle.btnFechaModal} type="button" onClick={(e) => { location.replace(document.referrer); window.close(); }}>Cancelar</button>
>>>>>>> development
                        </div>

                    </form>
                    <br />
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}