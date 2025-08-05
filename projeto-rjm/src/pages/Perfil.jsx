//--DIEGO:alterei algumas linhas para poder alterar o CSS da pagina sem o servidor estiver ligado.

import { useEffect, useState } from "react"
import { getUserByEmail } from "../data/services/API"
import { redirecionar } from "./util/functions"
import iconeUser from "../ui/icons/user.png"
import perfilStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css"

import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'

export default function Perfil() {
    const [perfil, setPerfil] = useState([])
    useEffect(() => {
        async function fetch() {
            let res = await getUserByEmail()
            setPerfil(res)
        }
        fetch()
    }, [])

    function apr() {
        return (
            <>
                <div className={perfilStyle.paginaBody}>
                    <CabProj/>
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
                            <br/>
                            <label>
                                <label className={perfilStyle.lbl}>Nome</label>
                                <input
                                    className={perfilStyle.input}
                                    type="text" name=""
                                    default={""/*perfil.nome*/} required
                                />
                            </label>
                            <br/>
                            <label>
                                
                                <label className={perfilStyle.lbl}>E-mail Cadastrado</label>
                                <input
                                    type="text" name=""
                                    className={perfilStyle.input}
                                    default={""/*perfil.email*/} required
                                />
                            </label>
                            <br/>
                            <label>
                                
                                <label className={perfilStyle.lbl}>Usuário do Github</label>
                                <input
                                    type="text" name=""
                                    className={perfilStyle.input}
                                    default={""/*perfil.user_git*/} required
                                />
                            </label>
                            <br/>
                            <button type="submit" className={perfilStyle.formButton}>Salvar alterações</button>
                        </form>
                        <button>Voltar</button>
                    </center>

                </div>

            </>
        )
    }
    if (localStorage.getItem('authToken')) {
        return (
            <>
                <center>
                    <br />
                    <br />
                    <button onClick={() => redirecionar('logout')}>logout</button>
                    <div>
                        {apr()}
                    </div>
                    <button onClick={() => redirecionar('edUser')}>Editar</button>
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}