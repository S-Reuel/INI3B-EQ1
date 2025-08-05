import React from "react";
import appStyle from '../ui/styles/App/App.module.css'

import CabProj from 'projeto-rjm/src/ui/components/_cabecalho.jsx'
export default function App() {
  const A = (e) => {
    e.preventDefault()
    location.href = '/login'
  }
  const B = (e) => {
    e.preventDefault()
    location.href = '/add/usuario'
  }

  return (
    <div className={appStyle.app}>
      {/* Navbar */}
      <CabProj />

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
          <p>Não fique de fora — use Codra e explore tudo.</p>
          <a href='/add/usuario'><button className={appStyle.butCadastro}>Criar conta</button></a>
        </div>
      </article>

    </div>
  )
}
