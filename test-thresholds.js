// caso de teste 6 

import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    stages: [
        {'duration': '10s', target: 20},
        {'duration': '20s', target: 10},
        {'duration': '20s', target: 0},
    ],
    thresholds:  {
        http_req_duration: ['p(95)<100'] // 95% das requisições devem responder em menos de 100ms 
    }

}

export default function () {
    const res = http.get('https://test.k6.io')

    check(res, {
        'Status é 200': (r) => r.status === 200,
    })
}