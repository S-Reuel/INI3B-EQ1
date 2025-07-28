
import QuemSomosStyle from "../ui/styles/Quem_Somos/Quem_Somos.module.css"

import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
import Davi from "../ui/icons/davi_ok.jpeg"
import Maria from "../ui/icons/maria_ok.jpg"
import Ana from "../ui/icons/ana_ok.jpg"
import Luigy from "../ui/icons/luigy_ok.jpg"
import Diego from "../ui/icons/diego_ok.jpeg"
import Silas from "../ui/icons/silas_ok.jpeg"
import Roberto from "../ui/icons/roberto_ok.jpeg"

export default function Sobre() {

   return (
       <div className={QuemSomosStyle.quemsomosbody }>
           <CabProj/>
           <center>
               <div className={QuemSomosStyle.quemSomosTitulo}>Quem Somos</div>
               <div className={QuemSomosStyle.quemSomosFLEX}>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Silas} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Silas Reuel <br/> BackEnd</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Davi} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Davi Rabelo <br/> FrontEnd e Design</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Maria} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Maria Julia <br/> Design</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Luigy} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Luigy Luna <br/> FrontEnd</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Diego} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Diego Felipe <br/> FrontEnd</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Ana} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Ana Kuo <br/> Documentação</center>
                    </div>
                    <div className={QuemSomosStyle.integrante}>
                        <img src={Roberto} className={QuemSomosStyle.fotos_integrantes}/>
                        <center>Roberto Enrico <br/> faz nada</center>
                    </div>

               </div>

               
           </center>
       </div>
   )
}

