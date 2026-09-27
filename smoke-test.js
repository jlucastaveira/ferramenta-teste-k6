import http from 'k6/http'
import { sleep, check } from 'k6'

// Caso de teste - CT-01

export const options = {
    cloud: {
        projectID: 8480737,
    },
};


export default function () {

    const res = http.get('https://test.k6.io')

    check( res, {
        'status é 200': (r) => r.status === 200
    })

    sleep(2)

    
}