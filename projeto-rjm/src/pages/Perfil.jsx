import { useEffect, useState } from "react"
import { getUserByEmail } from "../data/services/API"
import { redirecionar } from "./util/functions"
import iconeUser from "../ui/icons/user.png"

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
                <img src={iconeUser} alt="Perfil do Usuário"/>
                <div>
                    Nome: {perfil.nome}
                </div>
                <div>
                    E-mail: {perfil.email}
                </div>
                <div>
                    User git: {perfil.user_git}
                </div>
                <br />
                        
            </>
        )
    }
    return (
        <>
            <center>
                <br />
                <br />
                <button onClick={()=>redirecionar('logout')}>logout</button>
                <div>
                    {apr()}
                </div>
            </center>
        </>
    )
}