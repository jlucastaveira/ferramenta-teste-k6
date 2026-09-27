import http from 'k6/http'
import { sleep, check } from 'k6'


// caso de teste - CT-05

export default function () {
    const payload = ''
    const params = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    const url = 'https://httpbin.org/post'

    const res = http.post(url, payload, params)

    console.log('Body:' + res.body)

    
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Body veio vazio (nenhum dado processado)': (r) => r.body.includes('"form": {}'),
        'Nenhuma mensagem de Error é informada': (r) => !r.body.includes('error') && !r.body.includes('Error'),
        })

    sleep(1)

}

// Dado esse caso que a API aceita de forma silenciosamente isso nao seria mais valido retornar um Status 400 infromando que os obrigatórios estão invalidos.