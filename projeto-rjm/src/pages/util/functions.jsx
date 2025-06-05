import { offSession } from "../../data/services/Session";

export function isFormat(data) {
    let mesFormat = {
        0: "Janeiro", 1: "Fevereiro",
        2: "Março", 3: "Abril",
        4: "Maio", 5: "Junho",
        6: "Julho", 7: "Agosto",
        8: "Setembro", 9: "Outubro",
        10: "Novembro", 11: "Dezembro"
    }
    let mes = data.getMonth()
    let ano = data.getFullYear()
    let dia = data.getDate()
    return `${dia} de ${mesFormat[mes]} de ${ano}`;
}

export function redirecionar(caminho) {
    switch (caminho) {
        case 'logout':
            offSession('authToken')
            location.href = '/'
            break
        case 'user':
            location.href = '/usuarios'
            break
        case 'addUser':
            location.href = '/add/usuario'
            break
        case 'login':
            location.href = '/login'
            break
        case 'esqSenha':
            location.href = 'login/esqueciSenha'
            break
        case 'redSenha':
            location.href = 'login/redefinirSenha'
            break
        case 'proj':
            location.href = '/projetos'
            break
        case 'addProj':
            location.href = '/add/projetos'
            break
        case 'addSpr':
            location.href = '/projetos/add/sprints'
            break
        case 'eq':
            location.href = '/equipes'
            break
        case 'addEq':
            location.href = '/add/equipes'
            break
    }
}

export function voltar() { history.back() }