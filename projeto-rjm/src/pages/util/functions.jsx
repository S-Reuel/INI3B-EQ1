import { offSession } from "../../data/services/API"
import CryptoJS from "crypto-js"
// Formatação da data para ser apresentada na tela
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
// Formatação da data para ser consumida pela API
export function isFormatDate(param, data) {
    let ano = data.getFullYear()
    let mes = (data.getMonth() + 1 < 10) ? `0${data.getMonth() + 1}` : data.getMonth() + 1
    let dia = (data.getDate() + param < 10) ? `0${data.getDate() + param}` : data.getDate()
    return `${ano}-${mes}-${dia}`
}

export function isFormatStatus(stt) {
    let status = {
        "em_andamento": "Em andamento",
        'pendente': "Pendente",
        'atrasado': 'Atrasado',
        'cancelado': 'Cancelado',
        'concluido': 'Concluido'
    }
    return status[stt]
}

export function redirecionar(caminho) {
    switch (caminho) {
        case 'logout':
            offSession()
            redirecionar('login')
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
            location.href = '/login/esqueciSenha'
            break
        case 'redSenha':
            location.href = '/login/redefinirSenha'
            break
        case 'eq':
            location.href = '/equipes'
            break
        case 'perfil':
            location.href = '/perfil'
            break
    }
}
// Utilizado para voltar as páginas 
export function voltar() {
    history.back();
    //location.replace(document.referrer);
}

export function isCripto(dado) {
    var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
    var id = CryptoJS.AES.encrypt(`${dado}`, key).toString()
    return encodeURIComponent(id)
}

export function isDeCripto(dado) {
    var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
    var bytes = CryptoJS.AES.decrypt(dado, key)
    return bytes.toString(CryptoJS.enc.Utf8)
}