import { useEffect, useState } from 'react'
import { esqueciSenha, getUserByEmail, updateUser } from '../data/services/API.jsx'
import perfilStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
import iconeUser from "../ui/icons/user.png"  
import { redirecionar } from './util/functions.jsx'
export default function EditUser() {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    const [avatar_url, setAvatar] = useState('')
    const [botaoDesativado, setBotaoDesativado] = useState('')
    const [file, setFile] = useState('');
    let excluido = false

    useEffect(() => {
        async function fetch() {
            let req = await getUserByEmail()
            setId(req.id)
            setNome(req.nome)
            setEmail(req.email)
            setNg(req.user_git)
            setAvatar(req.avatar_url)
            setBotaoDesativado("")
        }
        fetch()
    }, [])

    async function esqueci() {
        let mensagem = await esqueciSenha(email)
        if (mensagem == 'Um email de redefinição foi enviado') {
            location.href = '/login/redefinirSenha'
        }
    }

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const onSave = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        setBotaoDesativado("disabled")
        formData.append("usuario[nome]", nome)
        formData.append("usuario[email]", email)
        formData.append("usuario[user_git]", user_git)
        formData.append("usuario[excluido]", excluido)
        formData.append("usuario[avatar]", file);
        updateUser(id, formData)
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
                                    <br />
                                    <img src={(avatar_url)? avatar_url : iconeUser} className={perfilStyle.imgUsuario}/>
                                    <br />
                                    <input type="file" accept="image/*" onChange={handleFileChange} multiple />
                                </label>
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
                                Quer mudar a Senha?
                                <a onClick={() => esqueci()} disabled={botaoDesativado}> Trocar</a>
                                <button type="submit" onClick={onSave} disabled={botaoDesativado} className={perfilStyle.formButton}>Salvar alterações</button>
                                <p>Alterar Senha?<a className={perfilStyle.link} onClick={(e) => redirecionar('redSenha')}> Vá para redefinir senha</a></p>
                                <p>Deseja sair?<a type='button' className={perfilStyle.link} onClick={(e) => redirecionar('logout')}> Logout</a></p>
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