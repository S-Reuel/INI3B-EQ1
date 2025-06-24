
import QuemSomosStyle from "../ui/styles/Quem_Somos/Quem_Somos.module.css"

import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
import placeHolder from "../ui/icons/placeholderIMG.jpg"
export default function Sobre() {

   return (
       <div className={QuemSomosStyle.quemsomosbody }>
           <CabProj/>
           <center>
               <div className={QuemSomosStyle.quemSomosTitulo}>Quem Somos</div>
               <div className={QuemSomosStyle.quemSomosFLEX}>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={placeHolder} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego <br/> faz programa</center>
                    </div>

               </div>

               
           </center>
       </div>
   )
}

