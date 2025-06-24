import { useEffect, useState } from "react";
import { getProj } from "../data/services/API.jsx";
import CabProj from '../ui/components/_cabecalho.jsx';
import { isFormat } from "./util/functions.jsx";
import iconCalendario from '../ui/icons/calendario.svg'
import imgEditarProj from '../ui/icons/editar-projeto.svg'
import StyleProj from '../ui/styles/Projetos/Projetos.module.css'

export default function Projetos() {
    const [proj, setProj] = useState([])

    useEffect(() => {
        async function fetch() {
            let res = await getProj()
            setProj(res)
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
            let dataUp = isFormat(new Date(i.updated_at))
            return (
                <>
                    <div className={StyleProj.projeto} onClick={(e)=>{
                            e.stopPropagation()
                            caminho(i.id, 'spr')
                        }}>
                        <div className={StyleProj.tituloProj}>
                            {i.nome}
                        </div>
                        <div className={StyleProj.descricaoProj}>
                            {i.descricao}
                        </div>
                        <div className={StyleProj.dataProj}>
                            Data de atualização:
                            <img src={iconCalendario} className={StyleProj.calendarioIMG}></img>{dataUp}
                        </div>
                        <button className={StyleProj.bttEditarProj} onClick={(e)=>{
                            e.stopPropagation()
                            caminho(i.id, 'ed')
                        }}>
                            <img src={imgEditarProj} alt="" className="imgEditarProj"/>
                        </button>
                        <br />
                    </div>
                    <br />
            </>
        )})
    }
    if (localStorage.getItem('authToken')) {
        return (
            <>
              <CabProj />
              <center className={StyleProj.bodyProjs}>
                  <br />
                  <div className={StyleProj.tituloPag}>Projetos Inscritos</div>
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