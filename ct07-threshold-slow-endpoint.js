import http from 'k6/http'
import { sleep, check } from 'k6'


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000']
    }
}


export default function () {
    const res = http.get('https://httpbin.org/delay/3')

    check(res, {
        'Status é 200': (r) => r.status === 200
    })

    sleep(1)
}