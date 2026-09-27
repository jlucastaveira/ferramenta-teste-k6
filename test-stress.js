import http from 'k6/http'
import { check, sleep } from 'k6'


// Caso de teste - CT-03

export const options = {
    stages: [
        {duration: "30s", target: 100},
        {duration: "40s", target: 100},
        {duration: "50s", target: 0}
    ]

}

export default function() {
    const res = http.get('https://test.k6.io')

    check(res, {
        'status é 200': (r) => r.status === 200
    })

    sleep(1)
}