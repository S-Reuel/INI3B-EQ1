import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import Login from "./Login";
import Projetos from "./Projetos";
import RedefinirSenha from "./Redefinir_Senha";
import Registro from "./Registro";
import Usuarios from "./Usuarios";
import AddProj from "./Add_Projetos";
import EsqueciSenha from "./Esqueci_Senha";
import Equipes from "./Equipes";
import AddEqui from "./Add_Equipes";
import Sprints from "./Sprints";
import AddSprints from "./Add_Sprints";
import UpdateUser from "./Update_User";
import EditarProjetos from "./Editar_Projeto";
import EditUser from "./Editar_Usuario";

export default function Routers() {
    return (
        <Router>
            <Routes>
                {/* Usuário  */}
                <Route path="/" element={<App />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/edit/usuarios/:id" element={<EditUser />} />
                <Route path="/add/usuario" element={<Registro />} />
                <Route path="/update/usuario" element={<UpdateUser />} />
                {/*  Login */}
                <Route path="/login" element={<Login />} />
                <Route path="login/esqueciSenha" element={<EsqueciSenha />} />
                <Route path="login/redefinirSenha" element={<RedefinirSenha />} />
                {/* Projetos  */}
                <Route path="/projetos" element={<Projetos />} />
                <Route path="edit/projetos/:id" element={<EditarProjetos />} />
                <Route path="/add/projetos" element={<AddProj />} />
                {/*  Sprints */}
                <Route path="/projetos/sprints/:id" element={<Sprints />} />
                <Route path="/projetos/add/sprints" element={<AddSprints />} />
                {/* Equipes  */}
                <Route path="/equipes" element={<Equipes />} />
                <Route path="/add/equipes" element={<AddEqui />} />
            </Routes>
        </Router>
    )
}