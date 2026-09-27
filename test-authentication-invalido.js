import http from 'k6/http'
import { check } from 'k6'

export default function () {
    const res = http.get('https://httpbin.org/bearer')

    check(res, {
        'Status é 401': (r) => r.status === 401
    })
}
    