import React, { useEffect, useState } from 'react'
import { esqueciSenha, getUserByEmail, updateUser } from '../data/services/API.jsx'
import iconeUser from "../ui/icons/user.png"
import { redirecionar } from './util/functions.jsx'
import Modal from 'react-modal'
import perfilStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
import cabProjetoStyle from '../ui/styles/cabProjeto.module.css'

Modal.setAppElement('#root');

export default function EditUser() {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    const [file, setFile] = useState('')
    const [botaoDesativado, setBotaoDesativado] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let excluido = false

    useEffect(() => {
        async function fetch() {
            let req = await getUserByEmail()
            setId(req.id)
            setNome(req.nome)
            setEmail(req.email)
            setNg(req.user_git)
            setBotaoDesativado("")
        }
        fetch()
    }, [])

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    // Função que abre a modal
    function abrirModal() {
        setIsOpen(true);
    }

    // Função que fecha a modal
    function fecharModal() {
        setIsOpen(false);
    }

    async function esqueci() {
        let mensagem = await esqueciSenha(email)
        if (mensagem == 'Um email de redefinição foi enviado') {
            location.href = '/login/redefinirSenha'
        }
    }

    function atualizarAvatar() {
        const formData = new FormData()
        if (file != '' && file != undefined) {
            formData.append("usuario[avatar]", file)
            updateUser(id, formData)
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
                                    <label className={perfilStyle.lbl}>Foto de perfil</label> <br />
                                    <img src={(localStorage.getItem('avatar') != "null") ? localStorage.getItem('avatar') : iconeUser} onClick={() => abrirModal()} className={perfilStyle.imgUsuario} />
                                    <div>
                                        <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={cabProjetoStyle.modalConteudo}
                                            style={{
                                                overlay: {
                                                    backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                                                },
                                                content: {
                                                    border: '1px solid black',
                                                    background: '#151B23',

                                                }
                                            }}
                                        ><center>
                                                <button className={cabProjetoStyle.btnFechaModal} id='btnFecharModal' onClick={fecharModal}>X</button>
                                                <div className={perfilStyle.modalUserImg}>
                                                    <label className={perfilStyle.lbl}>Foto atual</label> <br />
                                                    <br />
                                                    <img src={(localStorage.getItem('avatar') != "null") ? localStorage.getItem('avatar') : iconeUser} className={perfilStyle.imgUsuarioModal} />
                                                    <br /><br />
                                                    <input type="file" onChange={handleFileChange} />
                                                    <div className={perfilStyle.botoesModalImg}>
                                                        <div className={perfilStyle.btnCancelarFoto} id='btnFecharModal' onClick={fecharModal}>Cancelar</div>
                                                        <div onClick={atualizarAvatar} className={perfilStyle.salvarImgBtn}>Salvar</div>   
                                                    </div>

                                                </div>

                                            </center>
                                        </Modal>
                                    </div>
                                </label>
                                <br /> <br />
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
                                <div className={perfilStyle.divBotoes}>
                                    <button type="submit" onClick={onSave} disabled={botaoDesativado} className={perfilStyle.formButton}>Salvar alterações</button>
                                </div>
                                <p>Alterar Senha?<a className={perfilStyle.link} onClick={(e) => esqueci()} disabled={botaoDesativado}> Vá para redefinir senha</a></p>
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