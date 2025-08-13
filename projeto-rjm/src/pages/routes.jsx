import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import Login from "./Login";
import Projetos from "./Projetos";
import RedefinirSenha from "./Redefinir_Senha";
import Registro from "./Registro";
import Usuarios from "./Usuarios";
import EsqueciSenha from "./Esqueci_Senha";
import Equipes from "./Equipes";
import Sprints from "./Sprints";
import EditUser from "./Editar_Usuario";
import Perfil from "./Perfil";
import Editar_Projeto from "./Editar_Projeto";
import Sobre from "./Quem_Somos";
import Editar_Equipe from "./Editar_Equipe";
import Editar_Sprint from "./Editar_Sprint.jsx";
import Task from "./Task.jsx";
import Add_Task from "./Add_Task.jsx";
import Editar_Task from "./Editar_Task.jsx";
import Add_Equipe from "./Add_Equipe.jsx";
import Add_Projeto from "./Add_Projeto.jsx";
import Add_Sprint from "./Add_Sprint.jsx";

export default function Routers() {
    return (
        <Router>
            <Routes>
                {/* Usuário  */}
                <Route exact path="/" element={<App />}/>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/edit/usuarios/" element={<EditUser />} />
                <Route path="/add/usuario" element={<Registro />} />
                <Route path="/perfil" element={<Perfil />} />
                {/*  Login */}
                <Route path="/login" element={<Login />} />
                <Route path="login/esqueciSenha" element={<EsqueciSenha />} />
                <Route path="login/redefinirSenha" element={<RedefinirSenha />} />
                {/* Equipes  */}
                <Route path="/equipes" element={<Equipes />} />
                <Route path="edit/equipe/:id" element={<Editar_Equipe />} />
                <Route path="/add/equipes" element={<Add_Equipe />} />
                {/* Projetos  */}
                <Route path="/projeto/:id" element={<Projetos />} />
                <Route path="edit/projeto/:id" element={<Editar_Projeto />} />
                <Route path="/add/projeto" element={<Add_Projeto />} />
                {/*  Sprints */}
                <Route path="/projeto/sprints/:id" element={<Sprints />} />
                <Route path="/projeto/add/sprint" element={<Add_Sprint />} />
                <Route path="/projeto/edit/sprint/:id" element={<Editar_Sprint />} />
                {/*  Task */}
                <Route path="/projeto/sprint/task/:id" element={<Task />} />
                <Route path="/sprint/add/task" element={<Add_Task />} />
                <Route path="/sprint/edit/task/:id" element={<Editar_Task />} />
                <Route path="/sobre" element={<Sobre />} />
            </Routes>
        </Router>
    )
}