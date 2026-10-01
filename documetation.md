# Casos de Teste - K6 - Primeiro Trabalho de Testes

## Ferramenta: K6

---

## CT-01 - Smoke Test

| Campo | Informação |
|---|---|
| **ID** | CT-01 |
| **Título** | Verificação de disponibilidade do sistema (Smoke Test) |
| **Objetivo** | Confirmar que o sistema está no ar e respondendo corretamente antes da realização de testes mais aprofundados. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Usuários Virtuais** | 1 |
| **Script** | `ct01-smoke-test.js` |

### Resultados Esperados

1. A requisição GET retorna status HTTP 200.
2. O check de validação do status HTTP 200 é aprovado.
3. O script é executado sem falhas.

### Passos

1. Executar o script `ct01-smoke-test.js`.
2. Verificar o status da requisição HTTP.
3. Confirmar que o check de status HTTP 200 foi aprovado.
4. Verificar o resultado da execução do script.

---

## CT-02 - Teste de Carga

| Campo | Informação |
|---|---|
| **ID** | CT-02 |
| **Título** | Teste de carga com carga moderada |
| **Objetivo** | Simular o uso do sistema com múltiplos usuários simultâneos, avaliando seu comportamento sob uma carga moderada. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Stages** | 10s → 20 VUs, 30s mantendo 20 VUs, 10s → 0 VUs |
| **Script** | `ct02-load-test.js` |

### Resultados Esperados

1. As requisições realizadas durante o teste devem retornar status HTTP 200.
2. A execução deve registrar os indicadores de desempenho, incluindo a taxa de requisições com falha e o tempo de resposta.
3. Os resultados obtidos devem permitir a análise do comportamento do sistema durante a carga aplicada.

### Passos

1. Configurar os stages no script.
2. Executar o script de teste de carga.
3. Observar o comportamento dos VUs durante a execução.
4. Verificar os status das requisições.
5. Analisar a taxa de requisições com falha e o tempo de resposta no relatório.

---

## CT-03 - Teste de Estresse

| Campo | Informação |
|---|---|
| **ID** | CT-03 |
| **Título** | Teste de estresse com carga elevada |
| **Objetivo** | Avaliar o comportamento do sistema sob uma carga elevada e identificar possíveis limites de capacidade. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Stages** | 30s → 100 VUs, 40s mantendo 100 VUs, 50s → 0 VUs |
| **Script** | `ct03-stress-test.js` |

### Resultados Esperados

1. As requisições realizadas durante o teste devem retornar status HTTP 200.
2. A execução deve registrar os indicadores de desempenho durante o período de carga elevada.
3. A taxa de requisições com falha e o tempo de resposta devem ser registrados para análise.
4. Caso ocorram falhas ou degradação de desempenho, o comportamento observado deve ser registrado.
5. Não há critério de aprovação ou reprovação automático neste teste.

### Passos

1. Configurar os stages com carga elevada.
2. Executar o script `ct03-stress-test.js`.
3. Monitorar os status das requisições durante o teste.
4. Analisar a taxa de requisições com falha.
5. Analisar o comportamento do tempo de resposta durante o período de maior carga.
6. Registrar possíveis falhas ou degradações observadas.

---

## CT-04 - POST com Dados Válidos

| Campo | Informação |
|---|---|
| **ID** | CT-04 |
| **Título** | Validação de requisição POST com dados válidos |
| **Objetivo** | Verificar se a ferramenta realiza corretamente uma requisição POST contendo dados válidos. |
| **URL** | https://httpbin.org/post |
| **Método HTTP** | POST |
| **Body** | `diceSideName=heads` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| **Script** | `ct04-post-valid-data.js` |

### Resultados Esperados

1. A requisição retorna status HTTP 200.
2. A resposta contém o campo `diceSideName`, confirmando que o dado enviado foi recebido pelo endpoint.

### Passos

1. Configurar o payload no formato `application/x-www-form-urlencoded`.
2. Configurar o header `Content-Type: application/x-www-form-urlencoded`.
3. Executar a requisição POST.
4. Verificar o status HTTP retornado.
5. Verificar se a resposta contém o campo `diceSideName`.

---

## CT-05 - POST sem Dados

| Campo | Informação |
|---|---|
| **ID** | CT-05 |
| **Título** | Validação de requisição POST sem dados |
| **Objetivo** | Verificar o comportamento da requisição POST quando nenhum dado é enviado no corpo da requisição. |
| **URL** | https://httpbin.org/post |
| **Método HTTP** | POST |
| **Body** | String vazia `''` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| **Script** | `ct05-post-empty-data.js` |

### Resultados Esperados

1. A requisição retorna status HTTP 200.
2. A resposta indica que nenhum dado foi enviado no formulário.
3. Nenhuma mensagem de erro contendo `Error` é retornada.

### Passos

1. Configurar uma requisição POST com body vazio.
2. Configurar o header `Content-Type: application/x-www-form-urlencoded`.
3. Executar o script.
4. Verificar o status HTTP retornado.
5. Analisar o conteúdo da resposta.
6. Verificar se não há mensagem de erro na resposta.

---

## CT-06 - Threshold de Tempo de Resposta

| Campo | Informação |
|---|---|
| **ID** | CT-06 |
| **Título** | Validação de threshold de tempo de resposta |
| **Objetivo** | Verificar se o K6 aplica corretamente um critério de aprovação baseado no tempo de resposta das requisições. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Stages** | 10s → 20 VUs, 20s → 10 VUs, 20s → 0 VUs |
| **Threshold** | `http_req_duration: ['p(95)<100']` |
| **Script** | `ct06-threshold-response-time.js` |

### Resultados Esperados

1. O threshold é considerado aprovado quando 95% das requisições apresentam tempo de resposta inferior a 100 ms.
2. Caso o valor de p95 ultrapasse 100 ms, o threshold é marcado como falho.
3. O resultado do threshold deve ser apresentado no relatório de execução.

### Passos

1. Configurar o threshold no `options` do script.
2. Configurar os stages definidos para o teste.
3. Executar o script.
4. Verificar o resultado do threshold no relatório.
5. Comparar o valor de p95 obtido com o limite de 100 ms.

---

## CT-07 - Endpoint com Resposta Lenta

| Campo | Informação |
|---|---|
| **ID** | CT-07 |
| **Título** | Validação de threshold em endpoint com resposta lenta |
| **Objetivo** | Verificar se o K6 identifica uma resposta que ultrapassa o tempo máximo definido, mesmo quando a requisição retorna status HTTP 200. |
| **URL** | https://httpbin.org/delay/3 |
| **Método HTTP** | GET |
| **Threshold** | `http_req_duration: ['p(95)<2000']` |
| **Script** | `ct07-threshold-slow-endpoint.js` |

### Resultados Esperados

1. A requisição deve retornar status HTTP 200.
2. O tempo de resposta deve ultrapassar o threshold de 2000 ms devido ao atraso configurado no endpoint.
3. O threshold deve ser marcado como falho caso o p95 ultrapasse 2000 ms.
4. A execução deve indicar falha do threshold mesmo que o status HTTP seja 200.

### Passos

1. Configurar a requisição para o endpoint com resposta lenta.
2. Configurar o threshold de 2000 ms.
3. Executar o teste.
4. Verificar o status HTTP retornado.
5. Verificar o tempo de resposta registrado.
6. Verificar o resultado do threshold.

---

## CT-08 - Teste de Pico

| Campo | Informação |
|---|---|
| **ID** | CT-08 |
| **Título** | Teste de pico com aumento súbito de usuários |
| **Objetivo** | Avaliar o comportamento do sistema diante de um aumento abrupto no número de usuários simultâneos, aplicando um critério formal de aprovação/reprovação (thresholds) sobre esse cenário. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Stages** | 5s → 100 VUs, 10s mantendo 100 VUs, 5s → 0 VUs |
| **Thresholds** | `http_req_failed: ['rate<0.01']` e `http_req_duration: ['p(95)<500']` |
| **Script** | `ct08-spike-test.js` |

### Resultados Esperados

1. A execução deve registrar o comportamento do sistema durante o aumento súbito de carga.
2. A taxa de requisições com falha deve se manter abaixo de 1% (`rate<0.01`).
3. O tempo de resposta no percentil 95 deve se manter abaixo de 500 ms.
4. Diferente do CT-03, que apenas observa o comportamento, o CT-08 aplica thresholds para validar formalmente se o sistema mantém padrões aceitáveis mesmo durante um pico súbito de carga.

### Passos

1. Configurar os stages com aumento súbito de VUs.
2. Configurar os thresholds de falha e tempo de resposta.
3. Executar o teste.
4. Verificar o resultado dos checks e dos thresholds no relatório.
5. Registrar o comportamento observado durante o pico.

---

## CT-09 - Acesso sem Autenticação

| Campo | Informação |
|---|---|
| **ID** | CT-09 |
| **Título** | Verificação de acesso sem autenticação |
| **Objetivo** | Verificar se o sistema impede o acesso a um recurso protegido quando não são fornecidas credenciais de autenticação, inclusive sob múltiplas tentativas simultâneas. |
| **URL** | https://httpbin.org/bearer |
| **Método HTTP** | GET |
| **Header Authorization** | Não informado |
| **Usuários Virtuais** | 5 |
| **Iterações** | 5 |
| **Script** | `ct09-auth-unauthorized.js` |

### Resultados Esperados

1. A requisição deve retornar status HTTP 401 em todas as 5 iterações.
2. O check de validação do status HTTP 401 deve ser aprovado em 100% das execuções.
3. O acesso ao recurso protegido deve ser negado de forma consistente, mesmo com múltiplas tentativas concorrentes.

### Passos

1. Configurar 5 VUs e 5 iterações no `options` do script.
2. Executar uma requisição GET sem o header `Authorization` em cada iteração.
3. Executar o teste.
4. Verificar o status HTTP retornado em cada iteração.
5. Validar que o check de status 401 passou em 100% dos casos.

---

## CT-10 - Conteúdo da Resposta

| Campo | Informação |
|---|---|
| **ID** | CT-10 |
| **Título** | Verificação do conteúdo da resposta |
| **Objetivo** | Verificar se a resposta da requisição contém o conteúdo esperado, possui tamanho consistente com uma página carregada corretamente e retorna o tipo de conteúdo adequado. |
| **URL** | https://test.k6.io |
| **Método HTTP** | GET |
| **Conteúdo esperado** | `QuickPizza` |
| **Tamanho mínimo esperado** | 500 caracteres |
| **Content-Type esperado** | `text/html` |
| **Script** | `ct10-verify-response-content.js` |

### Resultados Esperados

1. A requisição deve retornar status HTTP 200.
2. O corpo da resposta deve conter o texto `QuickPizza`.
3. O corpo da resposta deve ter mais de 500 caracteres, confirmando que a página não veio vazia ou truncada.
4. O header `Content-Type` deve conter `text/html`.
5. Os 4 checks devem ser aprovados.

### Passos

1. Executar a requisição GET.
2. Verificar o status HTTP retornado.
3. Verificar se o corpo da resposta contém o texto `QuickPizza`.
4. Verificar se o tamanho do corpo é maior que 500 caracteres.
5. Verificar se o header `Content-Type` contém `text/html`.
6. Verificar os resultados dos 4 checks.

---

## CT-11 - Autenticação Válida

| Campo | Informação |
|---|---|
| **ID** | CT-11 |
| **Título** | Verificação de acesso com autenticação válida (Basic Auth) |
| **Objetivo** | Verificar se o sistema autentica corretamente o usuário quando credenciais válidas são fornecidas, inclusive sob múltiplas tentativas simultâneas, complementando o CT-09, que testa a ausência de credenciais. |
| **URL** | https://quickpizza.grafana.com/api/basic-auth/{usuário}/{senha} |
| **Método HTTP** | GET |
| **Autenticação** | Basic Auth embutida na URL (`usuário:senha@host`) |
| **Usuários Virtuais** | 5 |
| **Iterações** | 5 |
| **Script** | `ct11-auth-valid.js` |

### Resultados Esperados

1. A requisição retorna status HTTP 200 em todas as 5 iterações.
2. A resposta confirma que o usuário foi autenticado (`authenticated: true`) em 100% das execuções.
3. A resposta confirma que o usuário autenticado é o esperado em todas as iterações.

### Passos

1. Configurar 5 VUs e 5 iterações no `options` do script.
2. Configurar as credenciais válidas.
3. Montar a URL com autenticação embutida (Basic Auth).
4. Executar a requisição GET em cada iteração.
5. Verificar o status HTTP retornado.
6. Validar os campos de autenticação e usuário na resposta em todas as iterações.

---

## CT-12 - Métrica Customizada

| Campo | Informação |
|---|---|
| **ID** | CT-12 |
| **Título** | Rastreamento de métrica customizada (Counter) |
| **Objetivo** | Verificar se o K6 permite criar e rastrear métricas próprias, além das métricas padrão (`http_req_duration`, `http_req_failed`), demonstrando controle estendido sobre a coleta de dados do teste. |
| **URL principal** | https://test.k6.io |
| **URL secundária** | URL inexistente, utilizada em aproximadamente 20% das requisições |
| **Método HTTP** | GET |
| **Stages** | 10s → 20 VUs, 30s mantendo 20 VUs, 10s → 0 VUs |
| **Métrica customizada** | `Counter('meu_contador_erros')` |
| **Script** | `ct12-custom-metric-counter.js` |

### Resultados Esperados

1. A métrica customizada `meu_contador_erros` aparece na seção **CUSTOM** do relatório final.
2. O valor da métrica reflete aproximadamente 20% do total de requisições realizadas.
3. O check de status 200 reflete a mesma proporção de falhas registrada pela métrica customizada.

### Passos

1. Declarar a métrica `Counter` fora da função `default`.
2. Configurar a lógica condicional que direciona aproximadamente 20% das requisições para uma URL inexistente.
3. Incrementar a métrica customizada quando o status for diferente de 200.
4. Executar o teste.
5. Verificar a seção **CUSTOM** no relatório final.

---

# Referências

## Ferramenta de Teste

- [Documentação oficial do K6](https://grafana.com/docs/k6/latest/)

## APIs utilizadas nos testes

- [HTTPBin](https://httpbin.org/)
- [K6 Test API](https://test.k6.io/)
- [QuickPizza](https://quickpizza.grafana.com/)