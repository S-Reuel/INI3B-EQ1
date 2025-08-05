import React from "react";
import  appStyle from '../ui/styles/App/App.module.css'

import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
export default function App() {
  const A = (e)=>{
    e.preventDefault()
    location.href='/login'
  }
  const B = (e)=>{
    e.preventDefault()
    location.href='/add/usuario'
  }
  
  return (
    <div className={appStyle.app}>    
      {/* Navbar */}
      <nav className={appStyle.navbar}>
          <img className={appStyle.navlogo} />
          <div className={appStyle.navButton}>
            <button onClick={A} className={appStyle.login}>Fazer Login</button>
            <button onClick={B} className={appStyle.signup}>Cadastre-se</button>
          </div>
      </nav>        
        <article className={appStyle.a} >
          <p className={appStyle.welcomeText}>
            Seja bem Vindo!
          </p>
          <h1>
          Código, Organização e Produtividade em um Só Lugar!
          </h1>
          <p className={appStyle.textoArticle}>
          Conecte seu aprendizado ao GitHub de forma intuitiva. Nossa plataforma integra código, organização e colaboração para que seus projetos de desenvolvimento sejam mais eficientes e menos estressantes.
          </p>
          
          <div className={appStyle.divCadastro}>
                <p>Não fique de fora — crie sua conta e explore tudo.</p>
                <button className={appStyle.butCadastro}>Cadastre-se</button>
          </div>
        </article>
    </div>
  )
}
