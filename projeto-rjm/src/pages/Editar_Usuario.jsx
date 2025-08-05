import { useEffect, useState } from 'react'
import { getUserByEmail} from '../data/services/API.jsx'
import { redirecionar, voltar } from './util/functions.jsx'

export default function EditUser() {
    const [dados, setDados] = useState({})
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [user_git, setNg] = useState('')
    let excluido = false
    useEffect (() => {
        async function fetch() {
            const req = await getUserByEmail()
            setDados(req)
        }
        fetch()
    }, [])

    const onSave = async (e) => {
        e.preventDefault()
        updateUser(dados.id, {nome, email, password, user_git, excluido})
    }

    return (
        <div>
            <center>
                <h1>Edite seu perfil</h1>
                <form>
                    <label>
                        Nome:<br />
                        <input
                            type="text" nome="nome" value={dados.nome}
                            placeholder="Digite seu nome" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        E-mail:
                        <br />
                        <input
                            type="text" name="email" value={dados.email}
                            placeholder="Digite seu email" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Usuário gitHub:<br />
                        <input
                            type="mail" nome="user_git" value={dados.user_git}
                            placeholder="Digite seu usuário gitHub" required
                            onChange={(e) => setNg(e.target.value)}
                        />
                    </label>
                    <br /><br />
                    <button type="submit" onClick={onSave}>Enviar</button>
                </form>
                <button onClick={voltar}>Voltar</button>
            </center>
        </div>
    )
}