import { Counter } from 'k6/metrics'
import http from 'k6/http'
import { check } from 'k6'


const meuContadorErros = new Counter('meu_contador_erros')

export const options= {
    stages: [
        {duration: '10s', target: 20},
        {duration: '30s', target: 20},
        {duration: '10s', target: 0},
    ]
}

export default function () {
    let url 

    if (Math.random() < 0.2){
        url = 'https://test.k6.io/pagina-que-nao-existe'
    } else {
        url = 'https://test.k6.io'
    }

    const res = http.get(url)

    if (res.status !== 200) {
        meuContadorErros.add(1)
    }

    check(res, {
        'Status é 200': (r) => r.status === 200
    })
}