import { useEffect, useState } from "react";
import { getProj } from "../data/services/API.jsx";
import CabProj from '../ui/components/_cabecalho.jsx';
import { isFormat } from "./util/functions.jsx";
import projetosStyle from '../ui/styles/Projetos/Projetos.css'

export default function Projetos() {
    const [proj, setProj] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getProj()
            res == 500 ? setErrors(res) : setProj(res)
        }
        fetch()
    }, [])

    const caminho = (id, tipo) => {
        if(tipo == 'spr'){
            location.href = `/projetos/sprints/${id}`
        } else if (tipo == 'ed'){
            location.href = `/edit/projetos/${id}`
        }
    }

    function apr() {
        return proj.map(function (i) {
            let dataCr = isFormat(new Date(i.data_criacao))
            return (
                <>
                    <div className={projetosStyle.projeto} onClick={(e)=>{
                            e.stopPropagation()
                            caminho(i.id, 'spr')
                        }}>
                        <div className={projetosStyle.tituloProj}>
                            {i.nome}
                        </div>
                        <div className={projetosStyle.descricaoProj}>
                            {i.descricao}
                        </div>
                        <div className={projetosStyle.dataProj}>
                            {dataCr}
                        </div>
                        <button className={projetosStyle.bttEditarProj} onClick={(e)=>{
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>
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
              <center className={projetosStyle.bodyProjs}>
                  <br />
                  <div className={projetosStyle.tituloPag}>Projetos Inscritos</div>
                  <br /><br /><br />
                  { apr() }
                  <br />
              </center>
            </>
        )
    } else {
        return (location.href="/login")
    }
}