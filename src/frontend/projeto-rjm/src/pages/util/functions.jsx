import { offSession } from "../../data/services/Session";

export function isFormat(data) {
    let mesFormat = {
        1: "Janeiro", 2: "Fevereiro",
        3: "Março", 4: "Abril",
        5: "Maio", 6: "Junho",
        7: "Julho", 8: "Agosto",
        9: "Setembro", 10: "Outubro",
        11: "Novembro", 12: "Dezembro"
    }
    let mes = data.getMonth()
    let ano = data.getFullYear()
    let dia = data.getDate()
    return `${dia} de ${mesFormat[mes+1]} de ${ano}`;
}

export function dateFormatter(date){
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short'
    }).format(date)
}

export function redirecionar(caminho) {
    switch (caminho) {
        case 'logout':
            offSession()
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

export function voltar() { location.href = document.referrer }