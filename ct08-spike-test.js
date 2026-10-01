import http from 'k6/http'
import { sleep, check } from 'k6'


export const options = {
    stages: [
        {duration: '5s', target: 100},
        {duration: '10s', target: 100},
        {duration: '5s', target: 0}
    ], 
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<500'],
    }
}


export default function () {
    const  res = http.get('https://test.k6.io')

    check(res, {
        'Status é 200': (r) => r.status === 200
    })

    sleep(1)
}