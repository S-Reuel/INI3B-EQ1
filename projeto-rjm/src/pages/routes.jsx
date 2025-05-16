import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from './App';
import Login from "./Login";
import Projetos from "./Projetos";
import RedefinirSenha from "./RedefinirSenha";
import Registro from "./Registro";
import Usuarios from "./Usuarios";
import AddProj from "./AddProj";
import EsqueciSenha from "./EsqueciSenha";

export default function Routers() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/add/usuario" element={<Registro/>}/>
                <Route path="login/esqueciSenha" element={<EsqueciSenha/>}/>
                <Route path="login/redefinirSenha" element={<RedefinirSenha/>}/>
                <Route path="/projetos" element={<Projetos/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/add/project" element={<AddProj/>}/>
            </Routes>
        </Router>   
    )
}