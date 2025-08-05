//--DIEGO:alterei algumas linhas para poder alterar o CSS da pagina sem o servidor estiver ligado.
import { useEffect, useState } from "react"
import { getUserByEmail } from "../data/services/API"
import { redirecionar } from "./util/functions"

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