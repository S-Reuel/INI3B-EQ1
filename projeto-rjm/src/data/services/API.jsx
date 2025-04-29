import axios from "axios";
import { onSession } from "./Session";

export const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/'
    baseURL: 'https://d7bd-186-217-115-248.ngrok-free.app/api/v2/'
})

// CRUD's Users
export async function postAPIUser(param) {
    let res = await URL.post('usuarios', { usuario: param })
    return res.data
};

export async function getAPIUser() {
    let res = await URL.get("usuarios", { headers: { "ngrok-skip-browser-warning": true } })
    return res.data
}

export async function postAPILogin(param) {
    let res = await URL.post('auth/login', param)
    return res.data
    // .then((res) => {
    //     let r = JSON.stringify(res.data)
    //     onSession('authToken', r)
    //     location.href = '/usuarios'
    // })
    // .catch((e) => { console.log(e) })
}

export async function updateAPIUser(id) {
    let res = await URL.put(`usuarios/${id}`)
    return res.data
    // .then((res) => res.data);
}

export async function deleteAPIUser(id) {
    let res = await URL.delete(`usuarios/${id}`)
    return res.data
    // .then((res) => res.data);
}

// CRUD's Projetos
export async function postAPIProj(param) {
    let res = await URL.post('projetos', param)
    return res.data
    // .then((res) => {
    //     res.data
    //     let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
    //     if (bool)
    //         location.href = '../principal'
    // });
}

export async function getAPIProj() {
    let res = await URL.get("projetos")
    return res.data
    // .then((res) => res.data);
}

export async function updateAPIProj(id) {
    let res = await URL.put(`projetos/${id}`)
    return res.data
    // .then((res) => res.data);
}

export async function deleteAPIProj(id) {
    let res = await URL.delete(`projetos/${id}`)
    return res.data
    // .then((res) => res.data);
}