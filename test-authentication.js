import http from 'k6/http'
import { check } from 'k6'

const nome = 'admin'
const senha = 'admin123'

export default function () {
    const credenciais = `${nome}:${senha}`
    
    const url = `https://${credenciais}@quickpizza.grafana.com/api/basic-auth/${nome}/${senha}`

    let res = http.get(url)

    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Está autenticado': (r) => r.json().authenticated === true,
        'É o usuário correto': (r) => r.json().user === nome,
    })

}



