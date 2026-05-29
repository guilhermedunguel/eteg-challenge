<h1 align='center'>ETEG Challenge - Cadastro de Clientes</h1>
<br>
<img src="https://i.imgur.com/3g63FZF.png" alt='projectBanner'>
<hr>

<h2>🟢 Sobre:</h2>
  <h3>🗂️ O projeto:</h3>
  <ul>
    <li><p>Desafio técnico proposto pela ETEG para a vaga de Desenvolvedor Full Stack Pleno. A aplicação consiste em um formulário de cadastro de clientes com persistência em banco de dados PostgreSQL, containerizado com Docker.</p></li>
  </ul>

  <h3>📌 Requisitos atendidos:</h3>
  <ul>
    <li><p>Formulário de cadastro com: nome completo, CPF, e-mail, cor preferida (cores do arco-íris) e observações.</p></li>
    <li><p>Validação de dados no frontend e backend.</p></li>
    <li><p>Persistência em PostgreSQL.</p></li>
    <li><p>Feedback visual de sucesso e erro ao cadastrar.</p></li>
    <li><p>Cadastro único por CPF e e-mail (validação de duplicidade).</p></li>
    <li><p>Cores pré-populadas via seed, modeladas em tabela separada para permitir alterações futuras sem deploy.</p></li>
    <li><p>Projeto containerizado com Docker, pronto para subir com um único comando.</p></li>
  </ul>

  <h3>⚙️ Decisões técnicas:</h3>
  <ul>
    <li>
      <p><strong>Escopo limitado ao enunciado</strong>: a aplicação implementa apenas o caso de uso descrito: cadastro único de cliente. Funcionalidades adicionais foram deliberadamente evitadas para não especular sobre necessidades que não foram validadas. Em um cenário real, seriam definidas em conversa com o time de produto antes da implementação.</p>
    </li>
    <li>
      <p><strong>Fastify</strong> no lugar de Express/NestJS: performance superior, suporte nativo a schema validation e plugin system bem estruturado.</p>
    </li>
    <li>
      <p><strong>Drizzle ORM</strong>: type-safe, migrations nativas, leve e com excelente integração com TypeScript.</p>
    </li>
    <li>
      <p><strong>Arquitetura em camadas</strong> (routes → services → repositories): separação clara de responsabilidades, facilita testes e manutenção.</p>
    </li>
    <li>
      <p><strong>Injeção de dependência manual</strong>: repositories são injetados nos services via construtor, permitindo mocks nos testes sem libs externas.</p>
    </li>
    <li>
      <p><strong>Cores em tabela separada</strong>: o enunciado menciona que "cores podem mudar posteriormente". Modelar como tabela permite adicionar/remover cores via banco, sem alterar código.</p>
    </li>
    <li>
      <p><strong>Seed idempotente</strong>: usa <code>onConflictDoNothing</code>, pode ser executado múltiplas vezes sem duplicar dados.</p>
    </li>
    <li>
      <p><strong>Testes unitários nos services e componentes</strong>: validam lógica de negócio (duplicidade de CPF/email) e comportamento do formulário (máscara, validação, submit, reset).</p>
    </li>
    <li>
      <p><strong>Setup Docker em dois modos</strong> (dev/prod): desenvolvimento com hot reload e watchers para iteração rápida, produção com builds multi-stage, imagens enxutas e código compilado espelhando o que sobe em deploy real.</p>
    </li>
  </ul>
<br>

<h2>🌐 Deploy:</h2>
<ul>
  <li><strong>Aplicação:</strong> <a href="https://eteg.guilhermedunguel.com">https://eteg.guilhermedunguel.com</a></li>
  <li><strong>API:</strong> <a href="https://api.eteg.guilhermedunguel.com">https://api.eteg.guilhermedunguel.com</a></li>
  <li><strong>Documentação da API:</strong> <a href="https://api.eteg.guilhermedunguel.com/docs">https://api.eteg.guilhermedunguel.com/docs</a></li>
</ul>
<p>
  Hospedado no <a href="https://railway.app/">Railway</a>, com deploy automático na branch <code>main</code> gated por CI (GitHub Actions).
</p>
<br>

<h2>🚀 Como rodar localmente:</h2>
<h3>Pré-requisitos:</h3>
<ul>
  <li>Docker e Docker Compose instalados</li>
  <li>Git</li>
</ul>

<h3>Passo a passo:</h3>

```bash
# Clone o repositório
git clone https://github.com/guilhermedunguel/eteg-challenge.git
cd eteg-challenge

# Copie o arquivo de variáveis de ambiente
cp .env.example .env
```

<h3>🛠️ Modo desenvolvimento:</h3>

<p>Hot reload no frontend (Vite dev server) e watcher no backend (<code>tsx --watch</code>)</p>

```bash
docker compose -f docker-compose.dev.yaml up
```

<h3>📦 Modo produção:</h3>

<p>Builds multi-stage, código TypeScript compilado, frontend servido por <strong>nginx</strong> a partir do bundle do Vite. É o mesmo build que sobe no Railway.</p>

```bash
docker compose up
```

<blockquote>
⚠️ Em qualquer um dos modos, aguarde os logs confirmarem que o server está pronto antes de acessar a aplicação. O servidor executa migrations e seed automaticamente na primeira inicialização.
</blockquote>

<h3>Acesso local (qualquer modo):</h3>
<ul>
  <li><strong>Frontend:</strong> <a href="http://localhost:3000">http://localhost:3000</a></li>
  <li><strong>API:</strong> <a href="http://localhost:3001">http://localhost:3001</a></li>
</ul>

<h3>📖 Documentação interativa da API</h3>
<p>
  Toda a API está documentada via <strong>OpenAPI</strong> e renderizada com <a href="https://scalar.com/">Scalar</a>, disponível em
  <a href="http://localhost:3001/docs"><code>http://localhost:3001/docs</code></a> assim que o servidor sobe.
  É possível explorar os endpoints, schemas de request/response e até disparar chamadas direto pelo navegador.
</p>
<br>

<h2>📁 Estrutura do projeto:</h2>

<p>Monorepo gerenciado por <strong>pnpm workspaces</strong>. Lockfile e configuração de dependências centralizados na raiz.</p>

```
eteg-challenge/
├── packages/
│   ├── server/                # Backend (Fastify + Drizzle + PostgreSQL)
│   │   ├── src/
│   │   │   ├── database/      # Schema, conexão, seed, migrations
│   │   │   ├── repositories/  # Acesso a dados
│   │   │   ├── services/      # Lógica de negócio + testes
│   │   │   ├── routes/        # Rotas HTTP
│   │   │   ├── errors/        # Classes de erro customizadas
│   │   │   └── server.ts      # Entry point
│   │   ├── Dockerfile         # Multi-stage de produção
│   │   ├── Dockerfile.dev     # Imagem de desenvolvimento (tsx --watch)
│   │   └── package.json
│   └── web/                   # Frontend (React + Vite + TypeScript)
│       ├── src/
│       │   ├── components/    # Componentes UI (Input, Button, SelectInput, etc)
│       │   └── utils/         # Utilitários (máscaras, etc)
│       ├── Dockerfile         # Multi-stage de produção (vite build + nginx)
│       ├── Dockerfile.dev     # Imagem de desenvolvimento (vite dev)
│       └── package.json
├── .github/workflows/ci.yaml  # Pipeline de testes (server + web em paralelo)
├── .env.example
├── .npmrc                     # Config do pnpm (supply-chain policies)
├── docker-compose.yaml        # Stack de produção (nginx + node dist)
├── docker-compose.dev.yaml    # Stack de desenvolvimento (hot reload)
├── package.json               # Workspace root
├── pnpm-lock.yaml             # Lockfile único do monorepo
└── pnpm-workspace.yaml        # Definição dos packages
```

<br>

<h2>📡 Endpoints da API:</h2>

| Método | Rota          | Descrição                        |
| ------ | ------------- | -------------------------------- |
| `GET`  | `/v1/colors`  | Lista todas as cores disponíveis |
| `POST` | `/v1/clients` | Cadastra um novo cliente         |

<h3>POST /v1/clients - Body:</h3>

```json
{
  "name": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@email.com",
  "favoriteColorId": 1,
  "observations": "Observações opcionais"
}
```

<h3>Respostas:</h3>
<ul>
  <li><code>201</code> - Cliente cadastrado com sucesso</li>
  <li><code>400</code> - Erro de validação (com <code>code</code> e <code>message</code>)</li>
  <li><code>409</code> - CPF ou e-mail já cadastrado (<code>code</code>: <code>CPF_TAKEN</code> ou <code>EMAIL_TAKEN</code>)</li>
  <li><code>500</code> - Erro interno do servidor</li>
</ul>
<br>

<h2>🧪 Testes:</h2>

```bash
# Instala dependências (na raiz, monorepo pnpm)
pnpm install

# Backend
pnpm --filter server test

# Frontend
pnpm --filter web test

# Ambos
pnpm test
```

<p>Os testes também rodam em CI a cada Pull Request, com jobs paralelos para server e web. Deploy em produção é bloqueado caso algum job falhe.</p>
<br>

<h2>🖥️ Tecnologias:</h2>
<h3>Backend:</h3>
<ul>
  <li>Node.js + TypeScript</li>
  <li>Fastify</li>
  <li>Drizzle ORM</li>
  <li>PostgreSQL</li>
  <li>Zod</li>
  <li>Vitest</li>
</ul>

<h3>Frontend:</h3>
<ul>
  <li>React 19</li>
  <li>TypeScript</li>
  <li>Vite</li>
  <li>Tailwind CSS</li>
  <li>React Hook Form + Zod</li>
  <li>Sonner (toasts)</li>
  <li>Vitest + Testing Library</li>
</ul>

<h3>Infraestrutura:</h3>
<ul>
  <li>Docker + Docker Compose (dev/prod separados)</li>
  <li>Nginx (servindo o bundle estático em produção)</li>
  <li>GitHub Actions (CI)</li>
  <li>Railway (hospedagem)</li>
</ul>
<br>

<h2>✏️ Criado por:</h2>
<div align='center'>
  <img src="https://avatars.githubusercontent.com/u/89926690?v=4" width="100px">
  <br>
  <a href="https://github.com/GuilhermeDunguel">Guilherme Dunguel</a>
</div>
