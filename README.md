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
      <p><strong>Cores em tabela separada</strong>: o enunciado menciona que "isso pode mudar posteriormente". Modelar como tabela permite adicionar/remover cores via banco, sem alterar código.</p>
    </li>
    <li>
      <p><strong>Seed idempotente</strong>: usa <code>onConflictDoNothing</code>, pode ser executado múltiplas vezes sem duplicar dados.</p>
    </li>
    <li>
      <p><strong>Testes unitários nos services e componentes</strong>: validam lógica de negócio (duplicidade de CPF/email) e comportamento do formulário (máscara, validação, submit, reset).</p>
    </li>
  </ul>
<br>

<h2>🚀 Como rodar:</h2>
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

# Suba a aplicação
docker compose up
```

<blockquote>
⚠️ Aguarde os logs confirmarem que o server está pronto antes de acessar a aplicação. O servidor executa migrations e seed automaticamente na primeira inicialização.
</blockquote>

<ul>
  <li><strong>Frontend:</strong> <a href="http://localhost:3000">http://localhost:3000</a></li>
  <li><strong>API:</strong> <a href="http://localhost:3001">http://localhost:3001</a></li>
  <li><strong>Documentação da API (Scalar):</strong> <a href="http://localhost:3001/docs">http://localhost:3001/docs</a></li>
</ul>
<br>

<h2>📁 Estrutura do projeto:</h2>

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
│   │   ├── Dockerfile
│   └── web/                   # Frontend (React + Vite + TypeScript)
│       ├── src/
│       │   ├── components/    # Componentes UI (Input, Button, SelectInput, etc)
│       │   └── utils/         # Utilitários (máscaras, etc)
│       ├── Dockerfile
├── .env.example
├── docker-compose.yaml
└── .github/workflows/ci.yml
```
<br>

<h2>📡 Endpoints da API:</h2>

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/v1/colors` | Lista todas as cores disponíveis |
| `POST` | `/v1/clients` | Cadastra um novo cliente |

<h3>POST /v1/clients - Body:</h3>

```json
{
  "name": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@email.com",
  "favoriteColorId": 1,
  "obs": "Observações opcionais"
}
```

<h3>Respostas:</h3>
<ul>
  <li><code>201</code> - Cliente cadastrado com sucesso</li>
  <li><code>400</code> - Erro de validação</li>
  <li><code>409</code> - CPF ou e-mail já cadastrado</li>
  <li><code>500</code> - Erro interno do servidor</li>
</ul>
<br>

<h2>🧪 Testes:</h2>

```bash
# Backend
cd packages/server
pnpm test

# Frontend
cd packages/web
pnpm test
```
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
  <li>Docker + Docker Compose</li>
  <li>GitHub Actions (CI)</li>
</ul>
<br>

<h2>✏️ Criado por:</h2>
<div align='center'>
  <img src="https://avatars.githubusercontent.com/u/89926690?v=4" width="100px">
  <br>
  <a href="https://github.com/GuilhermeDunguel">Guilherme Dunguel</a>
</div>
