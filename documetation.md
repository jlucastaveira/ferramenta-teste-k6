# Casos de Teste - K6 - Primeiro trabalho de testes

## Ferramenta K6

### CT-01 - Smoke Test

| **ID** | CT-01 |
|---|---|
| **Título** | Verificação de disponibilidade do sistema (Smoke Test) |
| **Objetivo** | Confirmar que o sistema está no ar e respondendo corretamente antes da realização de testes mais aprofundados. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io/)<br>Método HTTP: GET<br>Usuários Virtuais: 1<br>Script: `smoke-test.js` |
| **Resultados Esperados** | 1. A requisição GET retorna status HTTP 200.<br>2. O check de validação do status HTTP 200 é aprovado.<br>3. O script é executado sem falhas. |
| **Passos** | 1. Executar o script `smoke-test.js`.<br>2. Verificar o status da requisição HTTP.<br>3. Confirmar que o check de status HTTP 200 foi aprovado.<br>4. Verificar o resultado da execução do script. |
| **Script** | `smoke-test.js` |

---

### CT-02 - Teste de carga

| **ID** | CT-02 |
|---|---|
| **Título** | Teste de carga com carga moderada |
| **Objetivo** | Simular o uso do sistema com múltiplos usuários simultâneos, avaliando seu comportamento sob uma carga moderada. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io/)<br>Método HTTP: GET<br>Stages: 10s → 20 VUs, 30s mantendo 20 VUs, 10s → 0 VUs |
| **Resultados Esperados** | 1. As requisições realizadas durante o teste devem retornar status HTTP 200.<br>2. A execução deve registrar os indicadores de desempenho, incluindo a taxa de requisições com falha e o tempo de resposta.<br>3. Os resultados obtidos devem permitir a análise do comportamento do sistema durante a carga aplicada. |
| **Passos** | 1. Configurar os `stages` no script.<br>2. Executar o script de teste de carga.<br>3. Observar o comportamento dos VUs durante a execução.<br>4. Verificar os status das requisições.<br>5. Analisar a taxa de requisições com falha e o tempo de resposta no relatório. |
| **Script** | `test-carga.js` |

---

### CT-03 - Teste de estresse

| **ID** | CT-03 |
|---|---|
| **Título** | Teste de estresse com carga elevada |
| **Objetivo** | Avaliar o comportamento do sistema sob uma carga elevada e identificar possíveis limites de capacidade. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io/)<br>Método HTTP: GET<br>Stages: 30s → 100 VUs, 40s mantendo 100 VUs, 50s → 0 VUs |
| **Resultados Esperados** | 1. As requisições realizadas durante o teste devem retornar status HTTP 200.<br>2. A execução deve registrar os indicadores de desempenho durante o período de carga elevada.<br>3. A taxa de requisições com falha e o tempo de resposta devem ser registrados para análise.<br>4. Caso ocorram falhas ou degradação de desempenho, o comportamento observado deve ser registrado.<br>5. Não há critério de aprovação ou reprovação automático neste teste. |
| **Passos** | 1. Configurar os `stages` com carga elevada.<br>2. Executar o script `test-stress.js`.<br>3. Monitorar os status das requisições durante o teste.<br>4. Analisar a taxa de requisições com falha.<br>5. Analisar o comportamento do tempo de resposta durante o período de maior carga.<br>6. Registrar possíveis falhas ou degradações observadas. |
| **Script** | `test-stress.js` |

---

### CT-04 - POST com dados válidos

| **ID** | CT-04 |
|---|---|
| **Título** | Validação de requisição POST com dados válidos |
| **Objetivo** | Verificar se a ferramenta realiza corretamente uma requisição POST contendo dados válidos. |
| **Entradas** | URL: [https://httpbin.org/post](https://httpbin.org/post)<br>Método HTTP: POST<br>Body: `diceSideName=heads`<br>Content-Type: `application/x-www-form-urlencoded` |
| **Resultados Esperados** | 1. A requisição retorna status HTTP 200.<br>2. A resposta contém o campo `diceSideName`, confirmando que o dado enviado foi recebido pelo endpoint. |
| **Passos** | 1. Configurar o payload no formato `application/x-www-form-urlencoded`.<br>2. Configurar o header `Content-Type: application/x-www-form-urlencoded`.<br>3. Executar a requisição POST.<br>4. Verificar o status HTTP retornado.<br>5. Verificar se a resposta contém o campo `diceSideName`. |
| **Script** | `test-post-validos.js` |

---

### CT-05 - POST sem dados

| **ID** | CT-05 |
|---|---|
| **Título** | Validação de requisição POST sem dados |
| **Objetivo** | Verificar o comportamento da requisição POST quando nenhum dado é enviado no corpo da requisição. |
| **Entradas** | URL: [https://httpbin.org/post](https://httpbin.org/post)<br>Método HTTP: POST<br>Body: string vazia `''`<br>Content-Type: `application/x-www-form-urlencoded` |
| **Resultados Esperados** | 1. A requisição retorna status HTTP 200.<br>2. A resposta indica que nenhum dado foi enviado no formulário.<br>3. Nenhuma mensagem de erro contendo `Error` é retornada. |
| **Passos** | 1. Configurar uma requisição POST com body vazio.<br>2. Configurar o header `Content-Type: application/x-www-form-urlencoded`.<br>3. Executar o script.<br>4. Verificar o status HTTP retornado.<br>5. Analisar o conteúdo da resposta.<br>6. Verificar se não há mensagem de erro na resposta. |
| **Script** | `test-post-invalido.js` |

---

### CT-06 - Threshold de tempo de resposta

| **ID** | CT-06 |
|---|---|
| **Título** | Validação de threshold de tempo de resposta |
| **Objetivo** | Verificar se o K6 aplica corretamente um critério de aprovação baseado no tempo de resposta das requisições. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io/)<br>Método HTTP: GET<br>Stages: 10s → 20 VUs, 20s → 10 VUs, 20s → 0 VUs<br>Threshold: `http_req_duration: ['p(95)<100']` |
| **Resultados Esperados** | 1. O threshold é considerado aprovado quando 95% das requisições apresentam tempo de resposta inferior a 100 ms.<br>2. Caso o valor de p95 ultrapasse 100 ms, o threshold é marcado como falho.<br>3. O resultado do threshold deve ser apresentado no relatório de execução. |
| **Passos** | 1. Configurar o threshold no `options` do script.<br>2. Configurar os `stages` definidos para o teste.<br>3. Executar o script.<br>4. Verificar o resultado do threshold no relatório.<br>5. Comparar o valor de p95 obtido com o limite de 100 ms. |
| **Script** | `test-thresholds.js` |

---

### CT-07 - Endpoint com resposta lenta

| **ID** | CT-07 |
|---|---|
| **Título** | Validação de threshold em endpoint com resposta lenta |
| **Objetivo** | Verificar se o K6 identifica uma resposta que ultrapassa o tempo máximo definido, mesmo quando a requisição retorna status HTTP 200. |
| **Entradas** | URL: [https://httpbin.org/delay/3](https://httpbin.org/delay/3)<br>Método HTTP: GET<br>Threshold: `http_req_duration: ['p(95)<2000']` |
| **Resultados Esperados** | 1. A requisição deve retornar status HTTP 200.<br>2. O tempo de resposta deve ultrapassar o threshold de 2000 ms devido ao atraso configurado no endpoint.<br>3. O threshold deve ser marcado como falho caso o p95 ultrapasse 2000 ms.<br>4. A execução deve indicar falha do threshold mesmo que o status HTTP seja 200. |
| **Passos** | 1. Configurar a requisição para o endpoint com resposta lenta.<br>2. Configurar o threshold de 2000 ms.<br>3. Executar o teste.<br>4. Verificar o status HTTP retornado.<br>5. Verificar o tempo de resposta registrado.<br>6. Verificar o resultado do threshold. |
| **Script** | `test-thresholds-lento.js` |

---

### CT-08 - Teste de pico

| **ID** | CT-08 |
|---|---|
| **Título** | Teste de pico com aumento súbito de usuários |
| **Objetivo** | Avaliar o comportamento do sistema diante de um aumento abrupto no número de usuários simultâneos, aplicando um critério formal de aprovação/reprovação (thresholds) sobre esse cenário. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io)<br>Método HTTP: GET<br>Stages: 5s → 100 VUs, 10s mantendo 100 VUs, 5s → 0 VUs<br>Thresholds: `http_req_failed: ['rate<0.01']`, `http_req_duration: ['p(95)<500']` |
| **Resultados Esperados** | 1. A execução deve registrar o comportamento do sistema durante o aumento súbito de carga.<br>2. A taxa de requisições com falha deve se manter abaixo de 1% (`rate<0.01`).<br>3. O tempo de resposta no percentil 95 deve se manter abaixo de 500 ms.<br>4. Diferente do CT-03 (que apenas observa o comportamento), o CT-08 aplica thresholds para validar formalmente se o sistema mantém padrões aceitáveis mesmo durante um pico súbito de carga. |
| **Passos** | 1. Configurar os `stages` com aumento súbito de VUs.<br>2. Configurar os thresholds de falha e tempo de resposta.<br>3. Executar o teste.<br>4. Verificar o resultado dos checks e dos thresholds no relatório.<br>5. Registrar o comportamento observado durante o pico. |
| **Script** | `test-peak.js` |

---

### CT-09 - Acesso sem autenticação

| **ID** | CT-09 |
|---|---|
| **Título** | Verificação de acesso sem autenticação |
| **Objetivo** | Verificar se o sistema impede o acesso a um recurso protegido quando não são fornecidas credenciais de autenticação. |
| **Entradas** | URL: [https://httpbin.org/bearer](https://httpbin.org/bearer)<br>Método HTTP: GET<br>Header `Authorization`: não informado |
| **Resultados Esperados** | 1. A requisição deve retornar status HTTP 401.<br>2. O check de validação do status HTTP 401 deve ser aprovado.<br>3. O acesso ao recurso protegido deve ser negado. |
| **Passos** | 1. Configurar uma requisição GET sem o header `Authorization`.<br>2. Executar o teste.<br>3. Verificar o status HTTP retornado.<br>4. Validar o resultado do check de status 401.<br>5. Confirmar que o acesso ao recurso foi negado. |
| **Script** | `test-authentication-invalido.js` |

---

### CT-10 - Conteúdo da resposta

| **ID** | CT-10 |
|---|---|
| **Título** | Verificação do conteúdo da resposta |
| **Objetivo** | Verificar se a resposta da requisição contém o conteúdo esperado além do status HTTP correto. |
| **Entradas** | URL: [https://test.k6.io](https://test.k6.io/)<br>Método HTTP: GET<br>Conteúdo esperado: `QuickPizza` |
| **Resultados Esperados** | 1. A requisição deve retornar status HTTP 200.<br>2. O corpo da resposta deve conter o texto `QuickPizza`.<br>3. Os checks de status e conteúdo devem ser aprovados. |
| **Passos** | 1. Executar a requisição GET.<br>2. Verificar o status HTTP retornado.<br>3. Verificar se o corpo da resposta contém o texto `QuickPizza`.<br>4. Verificar os resultados dos checks. |
| **Script** | `test-verify-response.js` |

---

### CT-11 - Verificação de acesso com autenticação válida

| **ID** | CT-11 |
|---|---|
| **Título** | Verificação de acesso com autenticação válida (Basic Auth) |
| **Objetivo** | Verificar se o sistema autentica corretamente o usuário quando credenciais válidas são fornecidas, complementando o CT-09 (que testa a ausência de credenciais). |
| **Entradas** | URL: `https://quickpizza.grafana.com/api/basic-auth/{usuário}/{senha}`<br>Método HTTP: GET<br>Autenticação: Basic Auth embutida na URL (`usuário:senha@host`) |
| **Resultados Esperados** | 1. A requisição retorna status HTTP 200.<br>2. A resposta confirma que o usuário foi autenticado (`authenticated: true`).<br>3. A resposta confirma que o usuário autenticado é o esperado. |
| **Passos** | 1. Configurar as credenciais válidas.<br>2. Montar a URL com autenticação embutida (Basic Auth).<br>3. Executar a requisição GET.<br>4. Verificar o status HTTP retornado.<br>5. Validar os campos de autenticação e usuário na resposta. |
| **Script** | `test-authentication.js` |

---

## Referências

### Ferramenta de teste

- [Documentação do K6](https://grafana.com/docs/k6/)

### APIs utilizadas nos testes

- [HTTPBin](https://httpbin.org/)
- [K6 Test API](https://test.k6.io/)
- [QuickPizza](https://quickpizza.grafana.com/)