import React from 'react';
import './ui/styles/cabProjeto.css';
import iconeMenu from './icons/menu.png';
import iconeMais from './icons/mais.png';
import iconeSino from './icons/sino.png';
import iconeUsuario from './icons/usuario.png';
import iconeCodra from './icons/codra.png';
import iconeVoltar from './icons/Voltar.png';

function CabProj() {
  return (
    <header className="cabecalho-proj">
      <div className="cabecalhoEsquerda">
        <a href="javascript:history.back()">
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
        <img src={iconeSino} alt="Notificações" className="cabecalhoIcone" />
        <img src={iconeUsuario} alt="Perfil do Usuário" className="usuario" />
      </div>
    </header>
  );
}

export default CabProj;