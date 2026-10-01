import http from 'k6/http'
import { sleep, check } from 'k6'


export const options = {
    stages: [
        {duration: '10s', target: 20},
        {duration: '30s', target: 20},
        {duration: '10s', target: 0},
    ]
}
 

export default function (){
    const res = http.get('https://test.k6.io')

    check(res, {
        'status é 200': (r) => r.status === 200,
    })

    sleep(1)
}