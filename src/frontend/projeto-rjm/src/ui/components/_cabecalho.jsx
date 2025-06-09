import cabProjetoStyle from '../styles/cabProjeto.module.css'
import iconeCodra from "../icons/Codra.png"
import iconeMais from "../icons/mais.png"
import iconeMenu from "../icons/menu.png"
import iconeUser from "../icons/user.png"
import iconeVoltar from "../icons/voltar.png"
import { voltar } from '../../pages/util/functions'

export default function CabProj() {
  return (
    <header className={cabProjetoStyle.cabecalho_proj}>
      <div className={cabProjetoStyle.cabecalhoEsquerda}>
        <a onClick={voltar}>
          <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
        </a>
        <img src={iconeMenu} alt="Menu" className={cabProjetoStyle.menu} />
        <a href="/">
          <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
        </a>
      </div>
      <div className={cabProjetoStyle.cabecalhoDireita}>
        <a href="/add/projetos">
          <img src={iconeMais} alt="Adicionar Projeto" className={cabProjetoStyle.cabecalhoIcone} />
        </a>
        <a href='/perfil'>
          <img src={iconeUser} alt="Perfil do Usuário" className={cabProjetoStyle.usuario} />
        </a>
      </div>
    </header>
)}