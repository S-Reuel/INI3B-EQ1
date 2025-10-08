import React from "react";
import appStyle from '../ui/styles/App/App.module.css'
import featureIMG from '../ui/icons/featureIMG.png'
import fundo from '../ui/icons/fundoWelcome.png'
import Davi from "../ui/icons/davi_ok.jpeg"
import Maria from "../ui/icons/maria_ok.jpg"
import Ana from "../ui/icons/ana_ok.jpg"
import Luigy from "../ui/icons/luigy_ok.jpg"
import Diego from "../ui/icons/diego_ok.jpeg"
import Silas from "../ui/icons/silas_ok.jpeg"
import Roberto from "../ui/icons/roberto_ok.jpeg"
import git from '../ui/icons/git.png'
import github from "../ui/icons/github.png"
import vscode from "../ui/icons/vscode.png"
import rails from "../ui/icons/rails.png"
import reactjs from "../ui/icons/reactjs.png"
import ruby from "../ui/icons/ruby.png"
import ubuntu from "../ui/icons/ubuntu.png"
import wsl from "../ui/icons/wsl.png"
import CabProj from "../ui/components/_cabecalho";

export default function App() {  
    return (
      <div className={appStyle.app}>
        {/* Navbar */}
        <CabProj />

        <article className={appStyle.a} >
          <p className={appStyle.welcomeText}>
            <br /><br /><br />
            Seja bem Vindo!
          </p>
          <h1 className={appStyle.titulo}>
            Código, Organização e Produtividade em um Só Lugar!
          </h1>
          <p className={appStyle.textoArticle}>
            Conecte seu aprendizado ao GitHub de forma intuitiva. Nossa plataforma integra código, organização e colaboração para que seus projetos de desenvolvimento sejam mais eficientes e menos estressantes.
          </p><br />
          <div className={appStyle.divCadastro}>
            <p>Não fique de fora — use Codra e explore tudo.</p>
            {(localStorage.getItem('authToken') == null) ? <a href='/add/usuario'><button className={appStyle.butCadastro}>Criar conta</button></a> : <a href='/equipes'><button className={appStyle.butCadastro}>Ver equipes</button></a>}
          </div>
        </article>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <div className={appStyle.flexFeatures}>
          <img src={fundo} className={appStyle.fundoImg} />
          <div className={appStyle.featureDiv}>
            <img src={featureIMG} className={appStyle.featureIMG} />
            <a>Estrutura hierárquica de gestão baseada em projeto sprint e tarefa</a>
          </div>
          <div className={appStyle.featureDiv}>
            <img src={featureIMG} className={appStyle.featureIMG} />
            <a>Atualização de Tarefas em tempo real e Integração simples e prática</a>
          </div>
          <div className={appStyle.featureDiv}>
            <img src={featureIMG} className={appStyle.featureIMG} />
            <a>Integração com o GitHub via webhooks</a>
          </div>

        </div>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className={appStyle.quemSomosTitulo}><b>Equipe de desenvolvedores</b></div>
        <div className={appStyle.quemSomosFLEX}>
          <div className={appStyle.integrante}>
            <img src={Silas} className={appStyle.fotos_integrantes} />
            <center>Silas Reuel <br /> BackEnd</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Davi} className={appStyle.fotos_integrantes} />
            <center>Davi Rabelo <br /> FrontEnd e Design</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Maria} className={appStyle.fotos_integrantes} />
            <center>Maria Julia <br /> Design</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Luigy} className={appStyle.fotos_integrantes} />
            <center>Luigy Luna <br /> FrontEnd</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Diego} className={appStyle.fotos_integrantes} />
            <center>Diego Felipe <br /> FrontEnd</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Ana} className={appStyle.fotos_integrantes} />
            <center>Ana Kuo <br /> Documentação</center>
          </div>
          <div className={appStyle.integrante}>
            <img src={Roberto} className={appStyle.fotos_integrantes} />
            <center>Roberto Enrico <br /> FrontEnd</center>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br />


        <div className={appStyle.quemSomosTitulo}><b>Tecnologias utilizadas</b></div>
        <div className={appStyle.quemSomosFLEX}>
          <div className={appStyle.tecnoDiv}>
            <img src={git} className={appStyle.tecnologias} />
          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={github} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={vscode} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={rails} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={reactjs} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={ruby} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={ubuntu} className={appStyle.tecnologias} />

          </div>
          <div className={appStyle.tecnoDiv}>
            <img src={wsl} className={appStyle.tecnologias} />

          </div>
        </div>
        <br /><br /><br /><br />
      </div>
    )


}
