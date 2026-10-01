import http from 'k6/http'
import { check } from 'k6'


export const options = {
    cloud: {
        projectID: 8485010,
    },
    vus: 5,
    iterations: 5,
}

export default function () {
    const res = http.get('https://httpbin.org/bearer')

    check(res, {
        'Status é 401': (r) => r.status === 401
    })
}
    