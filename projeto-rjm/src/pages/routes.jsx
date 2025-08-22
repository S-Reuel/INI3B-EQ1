import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import Login from "./Login";
import Projetos from "./Projetos";
import RedefinirSenha from "./Redefinir_Senha";
import Registro from "./Registro";
import Usuarios from "./Usuarios.jsx";
import EsqueciSenha from "./Esqueci_Senha";
import Equipes from "./Equipes";
import Sprints from "./Sprints";
import EditUser from "./Editar_Usuario";
import Editar_Projeto from "./Editar_Projeto";
import Sobre from "./Quem_Somos";
import Editar_Equipe from "./Editar_Equipe";
import Editar_Sprint from "./Editar_Sprint.jsx";
import Tasks from "./Tasks.jsx";
import Editar_Task from "./Editar_Task.jsx";
import Add_Equipe from "./Add_Equipe.jsx";
import Add_Sprint from "./Add_Sprint.jsx";
import Task from "./Task.jsx";

export default function Routers() {
    return (
        <Router>
            <Routes>
                {/* Usuário  */}
                <Route exact path="/" element={<App />}/>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/edit/usuarios/" element={<EditUser />} />
                <Route path="/add/usuario" element={<Registro />} />
                {/*  Login */}
                <Route path="/login" element={<Login />} />
                <Route path="login/esqueciSenha" element={<EsqueciSenha />} />
                <Route path="login/redefinirSenha" element={<RedefinirSenha />} />
                {/* Equipes  */}
                <Route path="/equipes" element={<Equipes />} />
                <Route path="edit/equipe/:id" element={<Editar_Equipe />} />
                {/* Projetos  */}
                <Route path="/projetos/:equipe_id" element={<Projetos />} />
                <Route path="edit/projeto/:id" element={<Editar_Projeto />} />
                {/*  Sprints */}
                <Route path="/projeto/sprints/:projeto_id" element={<Sprints />} />
                <Route path="/projeto/add/sprint/:projeto_id" element={<Add_Sprint />} />
                <Route path="/projeto/edit/sprint/:id" element={<Editar_Sprint />} />
                {/*  Task */}
                <Route path="/projeto/sprint/tasks/:sprint_id" element={<Tasks />} />
                <Route path="/sprint/edit/task/:task_id" element={<Editar_Task />} />
                <Route path="/projeto/sprint/task/:task_id" element={<Task />} />
                <Route path="/sobre" element={<Sobre />} />
            </Routes>
        </Router>
    )
}