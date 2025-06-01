import { offSession } from "../../data/services/Session";

export function isFormat(data){
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

export function redirecionar(caminho){
    if(caminho == 'logout'){
        offSession('authToken')
        location.href='/'
    } else if( caminho == 'projetos'){
        location.href='/projetos'
    }
}

export function voltar(){ history.back() }