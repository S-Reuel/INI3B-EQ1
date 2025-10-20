import { useState } from "react"
import { postEquipe } from "../data/services/API"
import { redirecionar } from "./util/functions"
import addEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

export default function Add_Equipe({fecharModal}) {
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [botaoDesativado, setBotaoDesativado] = useState('')

    const onSave = async (e) => {
        e.preventDefault()
        setBotaoDesativado("disabled")
        if(nome.trim().length == 0 || descricao.trim().length == 0)
        {
            alert("O nome e/ou a descrição estão sem texto! Por favor os preencha e tente novamente")
        }
        else
        {
            await postEquipe({ nome, descricao })
            fecharModal();
        }
        setBotaoDesativado("")
    }


    if (localStorage.getItem('authToken')) {
        return (
            <div className={addEquipeStyle.paginaBody}>
                <center className={addEquipeStyle.center}>
                    <h1 className={addEquipeStyle.tituloPagina}>Nova Equipe</h1>
                    <form className={addEquipeStyle.form}>
                        <label>
                            <label className={addEquipeStyle.lbl}>Nome:</label><br /><br />
                            <input
                                type="text" nome="nome"
                                placeholder="Digite o nome da equipe" required
                                onChange={(e) => setNome(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <br />
                        <label >
                            <label className={addEquipeStyle.lbl}>Descrição:</label><br />
                            <br />
                            <textarea
                                rows='8' cols='50'
                                placeholder="Digite a descrição da equipe" required
                                onChange={(e) => setDesc(e.target.value)}
                                className={addEquipeStyle.input}
                            />
                        </label>
                        <button type="submit" onClick={onSave} className={addEquipeStyle.formButton} disabled={botaoDesativado}>Criar</button>
                    </form>
                </center>
            </div>
        )
    } else {
        return (redirecionar('login'))
    }
}