


// import styles from '../ui/components/Registro/Registro.module.css'
import { useState } from 'react'
import {postProj} from "../data/services/API"
import { dateFormatter, voltar } from "./util/functions"
import "projeto-rjm/src/ui/components/_cabecalho.jsx"
import addProjStyle from "../ui/styles/AddProjetos/AddProjetos.module.css"
import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
export default function AddProj() {
   const [nome, setNome] = useState('')
   const [descricao, setDesc] = useState('')


   const onSave = async (e) => {
       e.preventDefault()
       let data = new Date()
       let data_criacao = dateFormatter(data)
       postProj({nome, descricao, data_criacao})
   }


   return (
       <div className={addProjStyle.addProj}>
           <CabProj/>
           <center className={addProjStyle.center}>
               <h1 className={addProjStyle.tituloNovoProjeto}>Criar novo projeto</h1>
               <form onSubmit={onSave} className={addProjStyle.form}>
                   <label>
                       Nome do Projeto<br/>
                       <input
                           className={addProjStyle.input}
                           type="text" name="nome"
                           placeholder="Digite aqui o nome do projeto" required
                           onChange={(e) => setNome(e.target.value)}
                       />
                   </label>
                   <br/>
                   <label >
                    
                       Descrição (opcional)
                       <br/>
                       <input
                           type="text" name="descricao"
                           className={addProjStyle.input}
                           placeholder="Digite aqui descrição do projeto" required
                           onChange={(e) => setDesc(e.target.value)}  
                       />
                   </label>
                   <br/>
                   <button type="submit" className={addProjStyle.formButton}>Criar Projeto</button>
               </form>
               <button onClick={voltar}>Voltar</button>
           </center>
       </div>
   )
}

