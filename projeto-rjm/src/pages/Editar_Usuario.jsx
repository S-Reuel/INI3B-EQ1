import { useEffect, useState } from 'react'
import { getUserByEmail } from '../data/services/API.jsx'
import { voltar } from './util/functions.jsx'
import perfilStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'

export default function EditUser() {
    const [dados, setDados] = useState({})
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    let excluido = false
    useEffect(() => {
        async function fetch() {
            const req = await getUserByEmail()
            setDados(req)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateUser(dados.id, { nome, email, password, user_git, excluido })
    }

    if (localStorage.getItem('authToken')) {
        return (
                <center>
                    <div>
                        <div className={perfilStyle.paginaBody}>
                            <CabProj />
                            <center className={perfilStyle.center}>
                                <h1 className={perfilStyle.tituloPagina}>Editar Perfil</h1>
                                <form className={perfilStyle.form}>
                                    <label>
                                        <label className={perfilStyle.lbl}>Foto de perfil</label>
                                        <img src="https://lh3.googleusercontent.com/a/ACg8ocKSnCW-1AHtuv5kmDvZOFWA5WAnl9IQ2jeVx9vHbSHxfkEipg=s315-c-no" className={perfilStyle.imgUsuario}></img>
                                        <input
                                            type="file" name=""
                                            required
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        <label className={perfilStyle.lbl}>Nome</label>
                                        <input
                                            value={dados.nome}
                                            type="text" name="" required
                                            className={perfilStyle.input}
                                            onChange={(e) => setNome(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label>

                                        <label className={perfilStyle.lbl}>E-mail Cadastrado</label>
                                        <input
                                            value={dados.email}
                                            type="mail" name=""
                                            className={perfilStyle.input} required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label>

                                        <label className={perfilStyle.lbl}>Usuário do Github</label>
                                        <input
                                            value={dados.user_git}
                                            type="text" name=""
                                            className={perfilStyle.input} required
                                            onChange={(e) => setNg(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <button type="submit" onClick={onSave} className={perfilStyle.formButton}>Salvar alterações</button>
                                </form>
                            </center>
                        </div>
                    </div>
                </center>
        )
    } else {
        return (redirecionar('login'))
    }
}