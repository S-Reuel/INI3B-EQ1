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
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    let dia = data.getDate()
    return `${dia} de ${mesFormat[mes]} de ${ano}`;
}

export function isFormatDate(data) {
    let ano = data.getFullYear()
    let mes = (data.getMonth() + 1 < 10) ? `0${data.getMonth() + 1}` : data.getMonth() + 1
    let dia = (data.getDate() < 10) ? `0${data.getDate()}` : data.getDate()
    return `${ano}-${mes}-${dia}`
    /*
        Update é para quando é alterada a data pelo usuário em editar sprints
        get é num primeiro instante no qual deve ser apresentada na tela a data vinda do Back-end
        
        if (tipo == "update") {
            let dia = (data.getDate() + 1 < 10) ? `0${data.getDate() + 1}` : data.getDate() + 1
            return `${ano}-${mes}-${dia}`
        } else if (tipo == "get") {
        }
    */
}

export function dateFormatter(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short'
    }).format(date)
}

export function redirecionar(caminho) {
    switch (caminho) {
        case 'logout':
            offSession()
            redirecionar('prin')
            break
        case 'prin':
            location.href = '/'
            break
        case 'user':
            location.href = '/usuarios'
            break
        case 'addUser':
            location.href = '/add/usuario'
            break
        case 'edUser':
            location.href = '/edit/usuarios/'
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
        case 'eq':
            location.href = '/equipes'
            break
        case 'perfil':
            location.href = '/perfil'
            break
    }
}

export function voltar() {
    history.back();
}