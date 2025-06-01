import { useEffect, useState } from "react";
import { getProj } from "../data/services/API.jsx";
import CabProj from '../cabProjeto.jsx';
import '../ui/styles/Projetos/Projetos.css'

export default function Projetos() {
    const [proj, setProj] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getProj()
            res == 500 ? setErrors(res) : setProj(res)
        }
        fetch()
    }, []);

    const A = (e) => {
        e.preventDefault()

        location.href = '/add/projetos'
    }

    const entrarProj = (e) => {
        e.preventDefault()
        e.stopPropagation();
        location.href = '/add/projetos/sprints'
    }

    const editarProj = (e) => {
        e.preventDefault()
        e.stopPropagation();
        location.href = '/add/projetos/editar'
    }

    function apr() {
        let mesFormat = {
            0: "Janeiro", 1: "Fevereiro",
            2: "Março", 3: "Abril",
            4: "Maio", 5: "Junho",
            6: "Julho", 7: "Agosto",
            8: "Setembro", 9: "Outubro",
            10: "Novembro", 11: "Dezembro"
        }
        return proj.map(function (i) {
            let data = new Date(i.data_criacao)
            let mes = data.getMonth()
            let ano = data.getFullYear()
            let dia = data.getDate() + 1
            let format = `${dia} de ${mesFormat[mes]} de ${ano}`;
            return <div className="projeto" onClick={entrarProj}>
                <div className="tituloProj">
                    {i.nome}
                </div>
                <div className="descricaoProj">
                    {i.descricao}
                </div>
                <div className="dataProj">
                    {format}
                </div>
                <button className="bttEditarProj" onClick={editarProj}>
                    ...
                </button>
                <br />
            </div>
        })
    }
    if (errors.length == 0) {
        return (
            <>
              <CabProj />
              <center className="bodyProjs">
                  <br />
                  <div className="tituloPag">Projetos Inscritos</div>
                  <br />
                  <button className="bttAdicionarProj" onClick={A}>Adicionar Projeto</button>
                  <br /><br /><br />
                  { apr() }
                  <br />
              </center>
            </>
        )
    } else {
        return (
            <center>
                <h1>Acesso restrito</h1>
                <br />
                <a href="/login"><button>Login</button></a>
            </center>
        )
    }
}