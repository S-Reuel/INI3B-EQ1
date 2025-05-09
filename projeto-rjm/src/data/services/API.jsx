import axios from "axios";
import { onSession } from "./Session";

const Ngrok =  { headers: { "ngrok-skip-browser-warning": true } }
const URL = axios.create({
    /* Local */
    // baseURL: 'http://localhost:3000/api/v2/' 
    /* Ngrok */
    baseURL: 'https://8b20-186-217-113-95.ngrok-free.app/api/v2/'
})

// CRUD's Users
export async function postUser(param) {
    await URL.post('usuarios', { usuario: param }, Ngrok).then(
        () => {location.href = '/login'}
    )
    .catch(
        (e) => {console.log(`ERRO: ${e.data}`)}
    )
};

export async function getUser() {
    let res = await URL.get("usuarios", Ngrok)
    return res.data
}

export async function postLogin(param) {
    await URL.post('auth/login', param).then((res) => {
        let r = JSON.stringify(res.data.token)
        onSession('authToken', r)
        location.href = '/usuarios'
    }).catch(
        (e) => { console.log(e) }
    )
}

export async function updateUser(id) {
    await URL.put(`usuarios/${id}`)
    .then((res) => res.data);
}

export async function deleteUser(id) {
    await URL.delete(`usuarios/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }}, Ngrok)
    .then((res) => res.data);
}

// CRUD's Projetos
export async function postProj(param) {
    await URL.post('projetos', param)
    .then((res) => {
        res.data
        let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
        if (bool)
            location.href = '../principal'
    });
}

export async function getProj() {
    await URL.get("projetos")
    .then((res) => res.data);
}

export async function updateProj(id) {
    await URL.put(`projetos/${id}`)
    .then((res) => res.data);
}

export async function deleteProj(id) {
    await URL.delete(`projetos/${id}`)
    .then((res) => res.data);
}

export async function esqueciSenha(param) {
    let r = await URL.post(`esqueci/`, {email: param}, Ngrok)
    return r
}

export async function redefinirSenha(t, e, p) {
    let r = await URL.post(`redefinir/`, {token: t,email: e, password: p}, Ngrok)
    return r
}