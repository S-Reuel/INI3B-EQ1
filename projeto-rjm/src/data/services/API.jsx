import axios from "axios";
import { onSession } from "./Session";

const auth = {
    headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: localStorage.getItem('authToken')
    }}
const Ngrok = { headers: { "ngrok-skip-browser-warning": true } }
const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/' /* Local */
    baseURL: 'https://4e87-186-217-115-164.ngrok-free.app/api/v2/'  /* Ngrok */
})

/*  CRUD's Users */
export async function postUser(param) {
    await URL.post('usuarios', { usuario: param }, Ngrok).then(
        () => { location.href = '/login' }
    )
        .catch(
            (e) => { console.log(`ERRO: ${e.data}`) }
        )
};

export async function getUser() {
    try{
        let r = await URL.get("usuarios", auth)
        return r.data        
    } catch (error) {
        return (error.status);
    }
}


export async function updateUser(id) {
    await URL.put(`usuarios/${id}`)
        .then((res) => res.data);
}

export async function deleteUser(id) {
    await URL.patch(`usuarios/excluir/${id}`, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    })
}

export async function postLogin(param) {
    const r = await URL.post('auth/login', param, Ngrok)
    if(r.alert){
        return (r.alert)
    } else {
        const t = r.data.token;
        onSession('authToken', t)
        location.href = '/usuarios'
    }
}

/*  CRUD's Projetos */
export async function postProj(param) {
    await URL.post('projetos', param, auth)
        .then((res) => {
            res.data
            let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
            if (bool)
                location.href = '../Projetos'
        });
}

export async function getProj() {
    let r = await URL.get("projetos", auth)
    return r.data
}

export async function updateProj(id) {
    await URL.put(`projetos/${id}`)
        .then((res) => res.data);
}

export async function deleteProj(id) {
    await URL.delete(`projetos/${id}`)
        .then((res) => res.data);
}
// Alteração de senha
export async function esqueciSenha(param) {
    let r = await URL.post(`esqueci/`, { email: param }, Ngrok)
    return r
}

export async function redefinirSenha(t, e, p) {
    let r = await URL.post(`redefinir/`, { token: t, email: e, password: p }, Ngrok)
    return r
}