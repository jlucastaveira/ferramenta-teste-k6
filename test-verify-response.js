import http from 'k6/http'
import { check, sleep } from  'k6'

export default function () {
    const res = http.get('https://test.k6.io')

    
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Na pagina contém "QuickPizza"': (r) => r.body.includes('QuickPizza'),
    })
}