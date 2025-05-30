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
import EditarProjetos from "./Editar_Projetos";

export default function Routers() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/add/usuario" element={<Registro/>}/>
                <Route path="/update/usuario" element={<UpdateUser/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="login/esqueciSenha" element={<EsqueciSenha/>}/>
                <Route path="login/redefinirSenha" element={<RedefinirSenha/>}/>
                <Route path="/projetos" element={<Projetos/>}/>
                <Route path="edit/projetos" element={<EditarProjetos/>}/>
                <Route path="/add/projetos" element={<AddProj/>}/>
                <Route path="/projetos/sprints" element={<Sprints/>}/>
                <Route path="/projetos/add/sprints" element={<AddSprints/>}/>
                <Route path="/equipes" element={<Equipes/>}/>
                <Route path="/add/equipes" element={<AddEqui/>}/>
            </Routes>
        </Router>   
    )
}