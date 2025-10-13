import axios from "axios"
import CryptoJS from "crypto-js"
import { redirecionar, voltar } from "../../pages/util/functions"

axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken')
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = true
const URL = axios.create({
    baseURL: 'https://eq1.ini3b.projetoscti.com.br/api/v2/' /* Servidor CTI */
})

/* Função para tratar Promise */
export async function obterValor(valor) {
    // pega o valor enviado e o conver em dado
    return await valor
}

function onSession(key, dd) {
    localStorage.setItem(key, dd)
}

export function offSession() {
    localStorage.clear()
}

/* Função para pegar os membros da equipe */
export async function getMembros(params) {
    /* 
        Busca os membros pelo ID da equipe e retorna um JSON com todas as informações 
        { id, nome, email, user_git, excluido, password_reset_sent_at, avatar_url }
    */
    try {
        let r = await URL.get(`equipe/membros/${params}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
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
        // Descriptografia
        var result = localStorage.getItem('authEmail')
        var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
        var bytes = CryptoJS.AES.decrypt(result, key)
        var dadosDescriptografados = bytes.toString(CryptoJS.enc.Utf8)
        // return dadosDescriptografados
        // Consulta
        if (dadosDescriptografados) {
            let r = await URL.get(`usuarios/email/${dadosDescriptografados}`)
            return r.data
        }
    } catch (error) {
        return (error.status);
    }
}

export async function getUserByName(nome) {
    // Lista as informações do usuário pesquisado
    try {
        let r = await URL.get(`usuarios/nome/${nome}`)
        return r.data
    } catch (error) {
        return (error.status);
    }
}

export async function updateUser(id, params) {
    // Atualiza as informações do usuário
    try {
        await URL.patch(`usuarios/${id}`, params).then(() => { location.reload() });
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
export async function postEquipe(membros, params) {
    /* 
        Cria equipe apartir das informações digitadas pelo usuário
        O usuário que cria o projeto é definido como DEV
        É chamada outra função para adicionar o usuario na nova Equipe
    */
    try {
        const usuario = await getUserByEmail()
        let usuario_id = usuario.id
        await URL.post('equipes', params).then((res) => {
            let equipe_id = res.data.id
            addUserEquipe(membros, usuario_id, equipe_id)
        });
    } catch (error) {
        alert(error.status)
    }
}

async function addUserEquipe(membros, usuario_id, equipe_id) {
    // Função chamada para adicionar o usuário criador na nova equipe
    try {
        if (usuario_id != 0) {
            await URL.post('usuario_equipes', { usuario_id, equipe_id, papel: "admin" }).then(() => {
                if (membros.length != 0) {
                    membros.map((usuario) => {
                        let usuario_id = usuario.ID
                        let papel = usuario.papel
                        URL.post('usuario_equipes', { usuario_id, equipe_id, papel })
                    })
                    location.reload()
                }
            })
        } else {
            if (membros.length != 0) {
                membros.map((usuario) => {
                    let usuario_id = usuario.ID
                    let papel = usuario.papel
                    URL.post('usuario_equipes', { usuario_id, equipe_id, papel })
                })
                location.reload()
            }
        }
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

export async function updateEquipe(membros, id, params) {
    // Atualiza a equipe
    try {
        await URL.patch(`equipes/${id}`, params).then(() => {
            addUserEquipe(membros, 0, id)
        })
    } catch (error) {
        return (error.status);
    }
}

export async function deleteEquipe(id) {
    // Deleta equipe
    try {
        await URL.patch(`equipes/${id}`, { excluido: "true" }).then(() => { redirecionar('eq') })
    } catch (error) {
        alert(error.status)
    }
}

export async function deleteUserByEquipe(id) {
    try {
        await URL.delete(`usuario_equipes/${id}`).then(() => { location.reload() })
    } catch (error) {
        return (true)
    }
}

/*  CRUD's Projetos */
export async function postProjeto(equipe_id, params) {
    try {
        await URL.post('projetos', params).then((res) => {
            let projeto_id = res.data.id
            postProjetoByEquipe({ projeto_id, equipe_id })
        })
    } catch (error) {
        return (error.status);
    }
}

async function postProjetoByEquipe(params) {
    try {
        await URL.post('equipe_projetos', params).then(() => { location.reload() })
    } catch (error) {
        alert(error.status);
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
        await URL.patch(`projetos/${id}`, { excluido: "true" }).then(() => voltar())
    } catch (error) {
        alert(error.status)
    }
}

/*  CRUD's Sprints */
export async function postSprint(params) {
    try {
        await URL.post('sprints', params).then(() => { location.reload() })
    } catch (error) {
        return (true)
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
        await URL.patch(`sprints/${id}`, { excluido: "true" }).then(() => { voltar() });
    } catch (error) {
        alert(error.status)
    }
}

/*  CRUD's Task */
export async function postTask(sprint_id, params) {
    try {
        await URL.post('tasks', { task: params }).then((res) => {
            let task_id = res.data.id
            postTaskBySprint({ sprint_id, task_id })
        });
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
        await URL.patch(`/tasks/${id}`, { excluido: "true" }).then(() => { voltar() })
    } catch (error) {
        alert(error.status)
    }
}

/* Login */
export async function postLogin(params) {
    try {
        // Chave secreta para criptografia (NUNCA DEIXE HARD-CODED!)
        var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
        var dadosCriptografados = CryptoJS.AES.encrypt(params.email, key).toString()
        // Criptografar e salvar
        await URL.post('auth/login', params).then((r) => {
            let t = r.data.token
            if (t != '') {
                onSession('authToken', t)
                onSession('authEmail', dadosCriptografados)
                location.href = '/equipes'
            }
        })
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
        return (false)
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