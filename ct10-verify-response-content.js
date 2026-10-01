import http from 'k6/http'
import { check } from  'k6'


export default function () {
    const res = http.get('https://test.k6.io')

    
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Na pagina contém "QuickPizza"': (r) => r.body.includes('QuickPizza'),
        'Corpo da resposta é maior ou igual à 500 caracteres': (r) => r.body.length >= 500,
        'Content-Type é HTML': (r) => r.headers['Content-Type' || ''].includes('text/html')
    })
}