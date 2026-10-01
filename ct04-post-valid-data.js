import http from 'k6/http'
import { sleep, check } from 'k6'


export default function () {
    const payload = 'diceSideName=heads'; 
    const params = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    const url = 'https://httpbin.org/post'

    const res = http.post(url, payload, params)


    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Payload foi repetido com valor correto': (r) => r.body.includes('diceSideName') && r.body.includes('heads'),
    })


    sleep(1)
}
