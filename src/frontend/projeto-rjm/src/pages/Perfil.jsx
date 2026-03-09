import { useEffect, useState } from "react"
import { getUserByEmail } from "../data/services/API"
import { useRedirecionar } from "./util/functions"
import perfilStyle from '../ui/styles/Perfil/Perfil.module.css'
import logoutIcon from '../ui/icons/logoutIcon.png'
import editIcon from '../ui/icons/editIcon.png'
import emailIcon from '../ui/icons/emailIcon.png'
import iconeUser from '../ui/icons/user.png'
import githubIcon from '../ui/icons/githubIcon.png'
import { useNavigate } from "react-router-dom"

export default function Perfil() {
    const navigate = useNavigate()
    const redirecionar = useRedirecionar()
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
                <br />
                <img src={(localStorage.getItem('avatar') != "null") ? localStorage.getItem('avatar') : iconeUser} alt="Perfil do Usuário" className={perfilStyle.fotoModal} />
                <div className={perfilStyle.tituloModal}>
                    {perfil.nome}
                </div>
                <div className={perfilStyle.emailModal}>
                    <img src={emailIcon} className={perfilStyle.emailIcon} /> {perfil.email}
                </div>
                <div className={perfilStyle.gitModal}>
                    <img src={githubIcon} className={perfilStyle.githubIcon} /> {perfil.user_git}
                </div>
                <br /><br />
                <hr className={perfilStyle.hr} color="#4a4a4a" />
            </>
        )
    }
    if (localStorage.getItem('authToken')) {
        return (
            <>
                <center>


                    <div>
                        {apr()}
                    </div>
                    <button className={perfilStyle.btnEditModal} onClick={() => navigate('/edit/usuarios/')}>
                        <img src={editIcon} className={perfilStyle.editIcon} />
                        Editar</button>
                    <hr className={perfilStyle.hr} color="#4a4a4a" />
                    <button className={perfilStyle.btnLogoutModal} onClick={() => redirecionar('logout')}>
                        <img src={logoutIcon} className={perfilStyle.logoutIcon} />
                        Logout</button>
                </center>
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}