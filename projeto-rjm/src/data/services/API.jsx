import axios from "axios";
import { onSession } from "./Session";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken')
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
const URL = axios.create({
    // baseURL: 'http://localhost:3000/api/v2/' /* Local */
    baseURL: 'https://9fe7-186-217-115-207.ngrok-free.app/api/v2/'  /* Ngrok */
})

/*  CRUD's Users */
export async function postUser(param) {
    await URL.post('usuarios', { usuario: param }).then(
        () => { location.href = '/login' }
    )
        .catch(
            (e) => { console.log(`ERRO: ${e.data}`) }
        )
};

export async function getUser() {
    try{
        let r = await URL.get("usuarios")        
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
    await URL.patch(`usuarios/excluir/${id}`).then((r)=>{
        if(r.status == 200) { location.reload() }
    })
}

export async function postLogin(param) {
    const r = await URL.post('auth/login', param)
    if(r.alert){
        return (r.alert)
    } else {
        const t = r.data.token;
        onSession('authToken', t)
        location.href = '/projetos'
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
    try{
        let r = await URL.get("projetos")
        return r.data        
    } catch (error) {
        return (error.status);
    }
}

export async function updateProj(id) {
    await URL.pacth(`projetos/${id}`)
        .then((res) => res.data);
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
                location.href = '../Projetos'
        });
}

export async function getEq() {
    try{
        let r = await URL.get("equipes")
        return r.data        
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
// Alteração de senha
export async function esqueciSenha(param) {
    let r = await URL.post(`esqueci/`, { email: param })
    return r
}

export async function redefinirSenha(t, e, p) {
    let r = await URL.post(`redefinir/`, { token: t, email: e, password: p })
    return r
}