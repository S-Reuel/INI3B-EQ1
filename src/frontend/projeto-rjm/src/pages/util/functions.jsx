import { Navigate, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js"
import { offSession } from "../../data/services/API"
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

export function useRedirecionar(caminho) {
    const navigate = useNavigate()
    return (caminho) => {
        switch (caminho) {
            case 'logout':
                offSession()
                navigate('/login')
                break
            case 'prin':
                navigate('/')
                break
            case 'user':
                navigate('/usuarios')
                break
            case 'addUser':
                navigate('/add/usuario')
                break
            case 'edUser':
                navigate('/edit/usuarios/')
                break
            case 'login':
                navigate('/login')
                break
            case 'esqSenha':
                navigate('/login/esqueciSenha')
                break
            case 'redSenha':
                navigate('/login/redefinirSenha')
                break
            case 'eq':
                navigate('/equipes')
                break
            case 'perfil':
                navigate('/perfil')
                break
            default:
                break
        }
    }
}
// Utilizado para voltar as páginas 
export function voltar() {
    history.back();
    // location.replace(document.referrer); //--Diego: se utilizar esta linha em vez de history.back(), a página anterior é automaticamente recarregada ao retornar à ela.
}

export function useVoltar() {
    const navigate = useNavigate();

    return () => navigate(-1);
}

// Utilizado para voltar as páginas 
export function voltar() {
    history.back();
    // location.replace(document.referrer); //--Diego: se utilizar esta linha em vez de history.back(), a página anterior é automaticamente recarregada ao retornar à ela.
}

export function isCripto(dado) {
    var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
    var bytes = CryptoJS.AES.encrypt(`${dado}`, key).toString()
    return encodeURIComponent(bytes)
}

export function isDeCripto(dado) {
    try {
        if (!dado) return null
        var key = "lnOywPDcNeNyh&7c97ixysnXTtR"
        const decoded = decodeURIComponent(dado)

        var bytes = CryptoJS.AES.decrypt(decoded, key)
        var resultado = bytes.toString(CryptoJS.enc.Utf8)

        if (!resultado) return null

        return resultado
    } catch (error) {
        console.error("Erro ao descriptografar:", error);
        return null
    }

}

export function hideButtonsByFuncao() {
    switch (isDeCripto(localStorage.getItem("authFunc"))) {
        case "dev":
            return "dev"
        case "lider":
            return "lider"
        default:
            return "gestor"
    }
}