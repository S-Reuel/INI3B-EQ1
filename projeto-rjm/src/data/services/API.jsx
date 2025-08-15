import axios from "axios";
import { onSession } from "./Session";
import { redirecionar, voltar } from "../../pages/util/functions";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken')
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/' /* Local */
    baseURL: 'https://6f332ad6e86d.ngrok-free.app/api/v2/'  /* Ngrok */
})

/* Função para tratar Promise */
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
    try {
        await URL.patch(`usuarios/${id}`, param).then(() => {
            let bool = confirm("Perfil atualizado com sucesso!\nAperte OK para restornar à página anterior.")
            if (bool)
                redirecionar('perfil')
        });
    } catch (error) {
        alert(error.status)
    }
}

export async function deleteUser(id) {
    try {
        await URL.patch(`usuarios/excluir/${id}`).then((r) => {
            redirecionar('perfil')
        })
    } catch (error) {
        alert(error.status)
    }
}

/* CRUD's Equipes */
export async function postEquipe(param) {
    const usuario = await getUserByEmail()
    await URL.post('equipes', param).then((res) => {
        let usuario_id = usuario.id
        let equipe_id = res.data.id
        let papel = "dev"
        addUserEquipe({ usuario_id, equipe_id, papel })
    });
}

async function addUserEquipe(param) {
    await URL.post('usuario_equipes', param).then(() => {
        let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
        if (bool)
            location.href = '../equipes'
    })
}

export async function getEquipeById(id) {
    try {
        let r = await URL.get(`equipes/${id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getEquipeByUser() {
    try {
        let req = getUserByEmail()
        let a = await obterValor(req)
        let r = await URL.get(`equipe/equipe_de_user/${a.id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateEquipe(id, param) {
    try {
        let r = await URL.patch(`equipes/${id}`, param).then(() => redirecionar('eq'))
    } catch (error) {
        return (error.status);
    }
}

export async function deleteEquipe(id) {
    await URL.delete(`equipes/${id}`)
        .then((res) => res.data);
}

/*  CRUD's Projetos */
export async function postProjeto(param) {
    await URL.post('projetos', param)
        .then((res) => {
            res.data
            let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
            if (bool)
                location.href = '../Projetos'
        });
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

export async function getProjetoId(id) {
    try {
        let r = await URL.get(`projetos/${id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateProjeto(id, param) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`projetos/${id}`, param).then(() => { voltar() })
    } else {
        location.reload()
    }
}

export async function deleteProjeto(id) {
    await URL.delete(`projetos/${id}`)
        .then((res) => res.data);
}

/*  CRUD's Sprints */
export async function postSprint(param) {
    await URL.post('sprints', param)
        .then((res) => {
            res.data
            let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
            if (bool)
                location.href = ''
        });
}

export async function getSprintsByProjeto(id) {
    try {
        let res = await URL.post(`projetos/ps/`, {id})
        let tratado = res.data.sprints
        return tratado
    } catch (error) {
        alert(error.status);
    }
}

export async function getSprintsId(id) {
    try {
        let r = await URL.get(``)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateSprint(id, param) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`/${id}`, param).then(() => { voltar() })
    } else {
        location.reload()
    }
}

export async function deleteSprint(id) {
    await URL.delete(`/${id}`)
        .then((res) => res.data);
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

/*  Alteração de senha   */
export async function esqueciSenha(param) {
    let r = await URL.post(`esqueci/`, { email: param })
    return r
}

export async function redefinirSenha(t, e, p) {
    let r = await URL.post(`redefinir/`, { token: t, email: e, password: p })
    return r
}