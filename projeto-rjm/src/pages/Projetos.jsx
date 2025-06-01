import { useEffect, useState } from "react";
import { getProj } from "../data/services/API.jsx";
import CabProj from '../ui/components/_cabecalho.jsx';
import { isFormat } from "./util/functions.jsx";
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
        return proj.map(function (i) {
            // let dataUp = isFormat(new Date(i.updated_at))
            let dataCr = isFormat(new Date(i.data_criacao))
            return (
                <>
                    <div className="projeto" onClick={entrarProj}>
                        <div className="tituloProj">
                            {i.nome}
                        </div>
                        <div className="descricaoProj">
                            {i.descricao}
                        </div>
                        <div className="dataProj">
                            {dataCr}
                        </div>
                        <button className="bttEditarProj" onClick={editarProj}>
                            ...
                        </button>
                        <br />
                    </div>
                    <br />
            </>
        )})
    }
    if (errors.length == 0) {
        return (
            <>
              <CabProj />
              <center className="bodyProjs">
                  <br />
                  <div className="tituloPag">Projetos Inscritos</div>
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