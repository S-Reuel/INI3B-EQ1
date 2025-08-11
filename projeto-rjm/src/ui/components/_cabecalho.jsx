import cabProjetoStyle from '../styles/cabProjeto.module.css'
import iconeCodra from "../icons/Codra.png"
import iconeUser from "../icons/user.png"
import iconeVoltar from "../icons/voltar.png"
import { voltar } from '../../pages/util/functions'
import { redirecionar } from "../../pages/util/functions.jsx";

export default function CabProj() {
  if (localStorage.getItem('authToken')) {
    return (
      <header className={cabProjetoStyle.cabecalho_proj}>
        <div className={cabProjetoStyle.cabecalhoEsquerda}>
          <a onClick={voltar}>
            <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
          </a>

          <a href="/">
            <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
          </a>
        </div>
        <div className={cabProjetoStyle.cabecalhoDireita}>

        <div className={cabProjetoStyle.IrEquipes} onClick={()=>redirecionar('eq')}>Ver Equipes</div>
          <a href='/perfil'>
            <img src={iconeUser} alt="Perfil do Usuário" className={cabProjetoStyle.usuario} />
          </a>
        </div>
      </header>
    )
  }
  else {
    return (
      <header className={cabProjetoStyle.cabecalho_proj}>
        <div className={cabProjetoStyle.cabecalhoEsquerda}>
          <a onClick={voltar}>
            <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
          </a>

          <a href="/">
            <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
          </a>
        </div>
        <div className={cabProjetoStyle.cabecalhoDireita}>

          <a href='/add/usuario' className={cabProjetoStyle.botaoCadastro}>
            <div  >Cadastrar</div>
          </a>
          <a href='/login' className={cabProjetoStyle.botaoLogin}>
            <div >Entrar</div>
          </a>
        </div>
      </header>
    )
  }
}