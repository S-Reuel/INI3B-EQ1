import { useEffect, useState } from 'react'
import { getUserByEmail, updateUser } from '../data/services/API.jsx'
import perfilStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'

export default function EditUser() {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    let excluido = false
    useEffect(() => {
        async function fetch() {
            let req = await getUserByEmail()
            setId(req.id)
            setNome(req.nome)
            setEmail(req.email)
            setNg(req.user_git)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateUser(id, { nome, email, user_git, excluido })
    }

    if (localStorage.getItem('authToken')) {
        return (
                <center className={perfilStyle.paginaBody}>
                    <div>
                        <div >
                            <CabProj />
                            <center className={perfilStyle.center}>
                                <h1 className={perfilStyle.tituloPagina}>Editar Perfil</h1>
                                <form className={perfilStyle.form}>
                                    <label>
                                        <label className={perfilStyle.lbl}>Foto de perfil</label>
                                        <br/>
                                        <img src="https://lh3.googleusercontent.com/a/ACg8ocKSnCW-1AHtuv5kmDvZOFWA5WAnl9IQ2jeVx9vHbSHxfkEipg=s315-c-no" className={perfilStyle.imgUsuario}></img>
                                        <br/>
                                        <input
                                            type="file" name="foto"
                                            required
                                        />
                                    </label>
                                    <br />
                                    <br />
                                    <label>
                                        <label className={perfilStyle.lbl}>Nome</label>
                                        <br />
                                        <input
                                            defaultValue={nome || ''} 
                                            onChange={(e) => setNome(e.target.value)}
                                            type="text" name="nome" 
                                            className={perfilStyle.input}
                                            required
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        <label className={perfilStyle.lbl}>E-mail Cadastrado</label> 
                                        <br />
                                        <input
                                            defaultValue={email || ''}
                                            type="mail" name="email"
                                            className={perfilStyle.input} required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        <label className={perfilStyle.lbl}>Usuário do Github</label>
                                        <br />
                                        <input
                                            defaultValue={user_git || ''}
                                            type="text" name="user_git"
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