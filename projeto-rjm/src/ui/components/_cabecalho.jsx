import '../styles/cabProjeto.css'
import iconeCodra from "../icons/Codra.png"
import iconeMais from "../icons/mais.png"
import iconeMenu from "../icons/menu.png"
import iconeUser from "../icons/user.png"
import iconeVoltar from "../icons/voltar.png"
import { voltar } from '../../pages/util/functions'

export default function CabProj() {
  return (
    <header className="cabecalho-proj">
      <div className="cabecalhoEsquerda">
        <a onClick={voltar}>
          <img src={iconeVoltar} alt="Voltar" className="voltar" />
        </a>
        <img src={iconeMenu} alt="Menu" className="menu" />
        <a href="/">
          <img src={iconeCodra} alt="Codra" className="codra" />
        </a>
      </div>
      <div className="cabecalhoDireita">
        <a href="/add/projetos">
          <img src={iconeMais} alt="Adicionar Projeto" className="cabecalhoIcone" />
        </a>
        <a href='/perfil'>
          <img src={iconeUser} alt="Perfil do Usuário" className="usuario" />
        </a>
      </div>
    </header>
)}