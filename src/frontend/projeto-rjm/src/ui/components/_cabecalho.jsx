import React, { useEffect } from 'react';
import cabProjetoStyle from '../styles/cabProjeto.module.css'
import iconeCodra from "../icons/Codra.png"
import iconeUser from "../icons/user.png"
import iconeVoltar from "../icons/voltar.png"
import { voltar } from '../../pages/util/functions'
import { redirecionar } from "../../pages/util/functions.jsx"
import Modal from 'react-modal';
import Perfil from '../../pages/Perfil.jsx';
import { getUserByEmail } from '../../data/services/API.jsx';

Modal.setAppElement('#root');


export default function CabProj() {

  useEffect(() => {
    async function fetch() {
      let res = await getUserByEmail()
      localStorage.setItem('avatar', res.avatar_url)
    }
    fetch()
  }, [])

  if (localStorage.getItem('authToken')) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    // Função que abre a modal
    function abrirModal() {
      setIsOpen(true);
    }

    // Função que fecha a modal
    function fecharModal() {
      setIsOpen(false);
    }

    return (
      <>
        <script src="./src"></script>
        <div><header className={cabProjetoStyle.cabecalho_proj}>
          <div className={cabProjetoStyle.cabecalhoEsquerda}>
            <a onClick={voltar}>
              <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
            </a>

            <a href="/">
              <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
            </a>
          </div>
          <div className={cabProjetoStyle.cabecalhoDireita}>

            <div className={cabProjetoStyle.IrEquipes} onClick={() => redirecionar('eq')}>Ver Equipes</div>

            <img src={(localStorage.getItem('avatar')) ? localStorage.getItem('avatar') : iconeUser} alt="Perfil do Usuário" className={cabProjetoStyle.usuario} id='btnModal' onClick={abrirModal} />

          </div>

        </header>
          <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={cabProjetoStyle.modalConteudo}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0 ,0, 0.8)'
              },
              content: {
                border: '1px solid black',
                background: '#151B23',

              }
            }}
          >
            <button className={cabProjetoStyle.btnFechaModal} id='btnFecharModal' onClick={fecharModal}>X</button>
            <Perfil />
          </Modal>

        </div>

      </>

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



