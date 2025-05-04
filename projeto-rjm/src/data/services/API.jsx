import axios from "axios";

const Ngrok =  { headers: { "ngrok-skip-browser-warning": true } }
const URL = axios.create({
    /* Local */
    baseURL: 'http://localhost:3000/api/v2/' 
    /* Ngrok */
    // baseURL: '/api/v2/'
})

// CRUD's Users
export async function postUser(param) {
    let res = await URL.post('usuarios', { usuario: param })
    return res.data
};

export async function getUser() {
    let res = await URL.get("usuarios")
    return res.data
}

export async function postLogin(param) {
    let res = await URL.post('auth/login', param)
    return res.data
    // .then((res) => {
    //     let r = JSON.stringify(res.data)
    //     onSession('authToken', r)
    //     location.href = '/usuarios'
    // })
    // .catch((e) => { console.log(e) })
}

export async function updateUser(id) {
    let res = await URL.put(`usuarios/${id}`)
    return res.data
    // .then((res) => res.data);
}

export async function deleteUser(id) {
    let res = await URL.delete(`usuarios/${id}`)
    return res.data
    // .then((res) => res.data);
}

// CRUD's Projetos
export async function postProj(param) {
    let res = await URL.post('projetos', param)
    return res.data
    // .then((res) => {
    //     res.data
    //     let bool = confirm("Adicionado com sucesso! Aperte OK para restornar à página anterior.")
    //     if (bool)
    //         location.href = '../principal'
    // });
}

export async function getProj() {
    let res = await URL.get("projetos")
    return res.data
    // .then((res) => res.data);
}

export async function updateProj(id) {
    let res = await URL.put(`projetos/${id}`)
    return res.data
    // .then((res) => res.data);
}

export async function deleteProj(id) {
    let res = await URL.delete(`projetos/${id}`)
    return res.data
    // .then((res) => res.data);
}