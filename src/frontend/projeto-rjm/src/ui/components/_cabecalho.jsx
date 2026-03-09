import React, { useEffect } from 'react';
import cabProjetoStyle from '../styles/cabProjeto.module.css'
import iconeCodra from "../icons/Codra.png"
import iconeUser from "../icons/user.png"
import iconeVoltar from "../icons/voltar.png"
import { useRedirecionar, useVoltar, voltar } from '../../pages/util/functions'
import Modal from 'react-modal';
import Perfil from '../../pages/Perfil.jsx';
import { getUserByEmail } from '../../data/services/API.jsx';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');


export default function CabProj() {
  const redirecionar = useRedirecionar()
  const volta = useVoltar();
  
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
            <Link onClick={volta}>
              <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
            </Link>

            <Link to="/">
              <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
            </Link>
          </div>
          <div className={cabProjetoStyle.cabecalhoDireita}>

            <div className={cabProjetoStyle.IrEquipes} onClick={() => redirecionar('eq')}>Ver Equipes</div>

            <img src={(localStorage.getItem('avatar') != "null") ? localStorage.getItem('avatar') : iconeUser} className={cabProjetoStyle.usuario} id='btnModal' onClick={abrirModal} />

          </div>

        </header>
          <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} className={cabProjetoStyle.modalConteudo}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0 ,0, 0.8)',
                display:'inline-grid',
                overflowY: "scroll",
                

              },
              content: {
                border: '1px solid black',
                overflowY: "scroll",

                background: '#151B23',
                justifySelf: 'center',
                alignSelf:'center',
                
              }
            }}
          >
            
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
          <Link onClick={voltar}>
            <img src={iconeVoltar} alt="Voltar" className={cabProjetoStyle.voltar} />
          </Link>

          <Link to="/">
            <img src={iconeCodra} alt="Codra" className={cabProjetoStyle.codra} />
          </Link>
        </div>
        <div className={cabProjetoStyle.cabecalhoDireita}>

          <Link to='/add/usuario' className={cabProjetoStyle.botaoCadastro}>
            <div  >Cadastrar</div>
          </Link>
          <Link to='/login' className={cabProjetoStyle.botaoLogin}>
            <div >Entrar</div>
          </Link>

        </div>
      </header>
    )
  }
}



