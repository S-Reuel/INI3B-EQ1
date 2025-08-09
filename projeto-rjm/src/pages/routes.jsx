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
import EditUser from "./Editar_Usuario";
import Perfil from "./Perfil";
import Editar_Projeto from "./Editar_Projeto";
import Sobre from "./Quem_Somos";
import Editar_Equipe from "./Editar_Equipe";
import Editar_Sprint from "./Editar_Sprint.jsx";

export default function Routers() {
    return (
        <Router>
            <Routes>
                {/* Usuário  */}
                <Route exact path="/" element={<App />}/>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/edit/usuarios/" element={<EditUser />} />
                <Route path="/add/usuario" element={<Registro />} />
                <Route path="/update/usuario" element={<UpdateUser />} />
                <Route path="/perfil" element={<Perfil />} />
                {/*  Login */}
                <Route path="/login" element={<Login />} />
                <Route path="login/esqueciSenha" element={<EsqueciSenha />} />
                <Route path="login/redefinirSenha" element={<RedefinirSenha />} />
                {/* Equipes  */}
                <Route path="/equipes" element={<Equipes />} />
                <Route path="edit/equipe/:id" element={<Editar_Equipe />} />
                <Route path="/add/equipes" element={<AddEqui />} />
                <Route path="/sobre" element={<Sobre />} />
                {/* Projetos  */}
                <Route path="/projeto/:id" element={<Projetos props={id}/>} />
                <Route path="edit/projeto/:id" element={<Editar_Projeto />} />
                <Route path="/add/projeto" element={<AddProj />} />
                {/*  Sprints */}
                <Route path="/projeto/sprints/" element={<Sprints />} />
                <Route path="/projeto/add/sprint" element={<AddSprints />} />
                <Route path="/projeto/edit/sprint/:id" element={<Editar_Sprint />} />
            </Routes>
        </Router>
    )
}