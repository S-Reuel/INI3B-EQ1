import axios from "axios";
import { onSession } from "./Session";
import { redirecionar, voltar } from "../../pages/util/functions";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken')
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/' /* Local */
    baseURL: 'https://b27389022802.ngrok-free.app/api/v2/'  /* Ngrok */
})
/* Função para trar Promise */
export async function obterValor(valor) {
    let resultado = await valor
    return resultado
}

/*  CRUD's Users */
export async function postUser(param) {
    try {
        await URL.post('usuarios', { usuario: param })
        return true
    } catch (error) {
        return (error.status);
    }
}

export async function getUser() {
    try {
        let r = await URL.get("usuarios")
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getUserByEmail() {
    try {
        let r = await URL.get(`usuarios/email/${localStorage.getItem('authEmail')}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateUser(id, param) {
    await URL.patch(`usuarios/${id}`, param)
        .then((res) => res.data);
}

export async function deleteUser(id) {
    try{
        await URL.patch(`usuarios/excluir/${id}`).then((r) => {
            redirecionar('perfil')
        })
    } catch (error) {
        alert(error.status)
    }
}

/* Login */
export async function postLogin(param) {
    try {
        let r = await URL.post('auth/login', param)
        const t = r.data.token;
        if (t != '') {
            onSession('authToken', t, param.email)
            location.href = '/equipes'
        }
    } catch (error) {
        return (error);
    }
}

/*  CRUD's Projetos */
export async function postProj(param) {
    await URL.post('projetos', param)
        .then((res) => {
            res.data
            let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
            if (bool)
                location.href = '../Projetos'
        });
}

export async function getProj() {
    try {
        let r = await URL.get("projetos")
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getProjetosByEquipe(id) {
    try {
        let res = await URL.get(`projeto/projeto_de_equipe/${id}`)
        let tratado = res.data.projetos
        return tratado
    } catch (error) {
        return (error.status);
    }
}

export async function getProjId(id) {
    try {
        let r = await URL.get(`projetos/${id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateProj(id, param) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`projetos/${id}`, param).then(() => {voltar()})
    } else {
        location.reload()
    }
}

export async function deleteProj(id) {
    await URL.delete(`projetos/${id}`)
        .then((res) => res.data);
}

/* CRUD's Equipes */
export async function postEq(param) {
    await URL.post('equipes', param)
        .then((res) => {
            res.data
            let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
            if (bool)
                location.href = '../equipes'
        });
}

export async function getEq() {
    try {
        let r = await URL.get("equipes")
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getEquipeByUser(id) {
    try {
        let r = await URL.get(`equipe/equipe_de_user/${id}`)
        return r.data.id
    } catch (error) {
        return (error.status);
    }
}

export async function updateEq(id) {
    await URL.patch(`equipes/${id}`)
        .then((res) => res.data);
}

export async function deleteEq(id) {
    await URL.delete(`equipes/${id}`)
        .then((res) => res.data);
}
/*  Alteração de senha   */
export async function esqueciSenha(param) {
    let r = await URL.post(`esqueci/`, { email: param })
    return r
}

export async function redefinirSenha(t, e, p) {
    let r = await URL.post(`redefinir/`, { token: t, email: e, password: p })
    return r
}

/*
    Deve ser filtrado os projetos por usuários 
    --> Deve ser pego o id_usuario (l.29) e jogar o id_usuario no filtro de equipe-usuario (l.144)
    --> Pegar o id_equipe (l.144) e jogar o id_equipe para um filtro de projetos-equipes (l.89)
*/