import { useParams } from "react-router-dom";
import { updateProj } from "../data/services/API";

export default function EditarProjetos() {
    const { id } = useParams()

    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const onSave = async (e) => {
        e.preventDefault()
        updateProj(id, {nome, descricao})
    }
    return (
        <div>
            <center>
                <h1>Nova Equipe!</h1>
                <form>
                    <label>
                        Nome:<br />
                        <input
                            type="text" nome="nome"
                            placeholder="Digite seu nome" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        Descrição:
                        <br />
                        <input
                            type="text" name="descricao"
                            placeholder="Digite a descrição" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br /><br />
                    <button type="submit" onClick={onSave}>Enviar</button>
                </form>
                <a href="/login"><button>Voltar</button></a>
            </center>
        </div>
    )
}