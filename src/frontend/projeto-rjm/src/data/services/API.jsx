import axios from "axios"
import { onSession } from "./Session"
import { redirecionar, voltar } from "../../pages/util/functions"

axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken')
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/' /* Local */
    baseURL: 'https://a3fbeaf14c95.ngrok-free.app/api/v2/'  /* Ngrok */
})

/* Função para tratar Promise */
export async function obterValor(valor) {
    // pega o valor enviado e o conver em dado
    let resultado = await valor
    return resultado
}

/*  CRUD's Users */
export async function postUser(params) {
    try {
        // Cria o usuário apartir da um JSON de usuario onde está contido os dados do usuário, paramêtros em JSON
        await URL.post('usuarios', { usuario: params })
        return true
    } catch (error) {
        return (error.status);
    }
}

export async function getUser() {
    // Lista todos os usuários não excluídos
    try {
        let r = await URL.get("usuarios")
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getUserByEmail() {
    // Lista as informações do usuário logado
    try {
        let r = await URL.get(`usuarios/email/${localStorage.getItem('authEmail')}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateUser(id, params) {
    // Atualiza as informações do usuário
    try {
        if (confirm("Perfil atualizado com sucesso!\nAperte OK para restornar à página anterior."))
            await URL.patch(`usuarios/${id}`, params).then(() => { redirecionar('login') });
    } catch (error) {
        alert(error.status)
    }
}

export async function deleteUser(id) {
    try {
        await URL.patch(`usuarios/excluir/${id}`).then(() => { location.reload() })
    } catch (error) {
        alert(error.status)
    }
}

/* CRUD's Equipes */
export async function postEquipe(params) {
    /* 
        Cria equipe apartir das informações digitadas pelo usuário
        O usuário que cria o projeto é definido como DEV
        É chamada outra função para adicionar o usuario na nova Equipe
    */
    try {
        const usuario = await getUserByEmail()
        let usuario_id = usuario.id
        let papel = "dev"
        await URL.post('equipes', params).then((res) => {
            let equipe_id = res.data.id
            addUserEquipe({ usuario_id, equipe_id, papel })
        });
    } catch (error) {
        alert(error.status)
    }
}

async function addUserEquipe(params) {
    // Função chamada para adicionar o usuário criador na nova equipe
    try {
        if (confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior."))
            await URL.post('usuario_equipes', params).then(() => { location.href = '../equipes' })
    } catch (error) {
        alert(error.status);
    }
}

export async function getEquipeById(id) {
    // Lista a equipe pelo ID
    try {
        let r = await URL.get(`equipes/${id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function getEquipeByUser() {
    // Lista as equipe onde o usuários está presente
    try {
        let req = getUserByEmail()
        let usuario = await obterValor(req)
        let res = await URL.get(`equipe/equipe_de_user/${usuario.id}`)
        return res.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateEquipe(id, params) {
    // Atualiza a equipe
    try {
        await URL.patch(`equipes/${id}`, params).then(() => redirecionar('eq'))
    } catch (error) {
        return (error.status);
    }
}

export async function deleteEquipe(id) {
    try {
        await URL.delete(`equipes/${id}`).then((res) => res.data)
    } catch (error) {
        alert(error.status)
    }
}

/*  CRUD's Projetos */
export async function postProjeto(equipe_id, params) {
    try {
        let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
        if (bool) {
            await URL.post('projetos', params).then((res) => {
                let projeto_id = res.data.id
                postProjetoByEquipe({ projeto_id, equipe_id })
            })
        }
    } catch (error) {
        return (error.status);
    }
}

async function postProjetoByEquipe(params) {
    try {
        await URL.post('equipe_projetos', params).then(() => { location.reload() })
    } catch (error) {
        return (error.status);
    }
}

export async function getProjetosByEquipe(id) {
    try {
        let res = await URL.get(`projeto/projeto_de_equipe/${id}`)
        return res.data
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

export async function updateProjeto(id, params) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`projetos/${id}`, params).then(() => { voltar() })
    } else {
        location.reload()
    }
}

export async function deleteProjeto(id) {
    try {
        await URL.delete(`projetos/${id}`).then((res) => res.data)
    } catch (error) {
        alert(error.status)
    }
}

/*  CRUD's Sprints */
export async function postSprint(params) {
    try {
        let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
        if (bool) {
            await URL.post('sprints', params).then(() => { location.reload() })
        } else {
            location.reload()
        }
    } catch (error) {
        alert(error.status)
    }
}

export async function getSprintsByProjeto(id) {
    try {
        let res = await URL.post(`projetos/ps/`, { id })
        return res.data
    } catch (error) {
        alert(error.status)
    }
}

export async function getSprintsId(id) {
    try {
        let r = await URL.get(`sprints/${id}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateSprint(id, params) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`sprints/${id}`, params).then(() => { voltar() })
    } else {
        location.reload()
    }
}

export async function deleteSprint(id) {
    try {
        await URL.delete(`/${id}`).then((res) => res.data);
    } catch (error) {
        alert(error.status)
    }
}

/*  CRUD's Task */
export async function postTask(sprint_id, params) {
    try {
        let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
        if (bool) {            
            await URL.post('tasks', {task: params}).then((res) => {
                let task_id = res.data.id
                postTaskBySprint({sprint_id, task_id})
            });
        }
    } catch (error) {
        alert(error.status)
    }
}

async function postTaskBySprint(params) {
    try {
        await URL.post('sprint_tasks', params).then(() => { location.reload() })
    } catch (error) {
        return (error.status);
    }
}

export async function getTaskBySprint(id) {
    try {
        let res = await URL.get(`sprint/task/${id}`)
        return res.data
    } catch (error) {
        alert(error.status)
    }
}

export async function getTaskId(id) {
    try {
        let r = await URL.get(`tasks/${id}`)
        return r.data
    } catch (error) {
        return (error.status)
    }
}

export async function getTaskByGitHub(id) {
    try {
        let r = await URL.get(`task/githubdataid/${id}`)
        return r.data
    } catch (error) {
        return (error.status)
    }
}

export async function updateTask(id, params) {
    let bool = confirm("Atualizado com sucesso! Aperte OK para restornar à página anterior.")
    if (bool) {
        await URL.patch(`/tasks/${id}`, params).then(() => { voltar() })
    } else {
        location.reload()
    }
}

export async function deleteTask(id) {
    try {
        await URL.delete(`/${id}`).then((res) => res.data)
    } catch (error) {
        alert(error.status)
    }
}

/* Login */
export async function postLogin(params) {
    try {
        let r = await URL.post('auth/login', params)
        const t = r.data.token;
        if (t != '') {
            onSession('authToken', t, params.email)
            location.href = '/equipes'
        }
    } catch (error) {
        return (error);
    }
}

/*  Alteração de senha   */
export async function esqueciSenha(params) {
    try {
        let r = await URL.post(`esqueci/`, { email: params })
        return r.data.alert
    } catch (error) {
        alert(error.status)
    }
}

export async function redefinirSenha(t, e, p) {
    try {
        let r = await URL.post(`redefinir/`, { token: t, email: e, password: p })
        return r.data.alert
    } catch (error) {
        alert(error.status)
    }
}