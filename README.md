# FlowPay Atendimento

Sistema full stack para distribuicao e monitoramento de atendimentos da FlowPay.

## Objetivo

Distribuir atendimentos entre times de Cartoes, Emprestimos e Outros Assuntos, respeitando limite de 3 atendimentos simultaneos por atendente, com fila quando o time estiver lotado e dashboard para acompanhamento em tempo real.

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Redis
- SQLite para modo local sem Docker
- React
- TanStack Query
- TanStack Router
- Zustand
- Radix UI
- Tailwind CSS
- Zod

## Arquitetura

- Monorepo com `apps/api` e `apps/web`
- API REST modularizada em rotas, controllers, services, utils e types
- Dashboard em React com Context API, Zustand, hooks customizados e Atomic Design
- Regras de distribuicao isoladas fora das views

## Rodando com Docker

1. Instale as dependencias com `npm install`.
2. Suba a infraestrutura com `docker compose up -d`.
3. Copie `apps/api/.env.example` para `apps/api/.env`.
4. Execute `npm run db:generate`.
5. Execute `npm run db:migrate`.
6. Execute `npm run db:seed`.
7. Rode a API com `npm run dev:api`.
8. Rode o front com `npm run dev:web`.

## Rodando sem Docker

1. Instale as dependencias com `npm install`.
2. Copie `apps/api/.env.local.example` para `apps/api/.env`.
3. Execute `npm run db:generate:local`.
4. Execute `npm run db:push:local`.
5. Execute `npm run db:seed`.
6. Rode a API com `npm run dev:api`.
7. Rode o front com `npm run dev:web`.

## Endpoints principais

- `GET /health`
- `POST /api/attendances`
- `POST /api/attendances/:id/complete`
- `GET /api/attendances`
- `GET /api/dashboard`

## Validacoes locais

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

## Testes extras entregues

- Teste de integracao de API no backend validando a rota `POST /api/attendances` com `supertest`
- Teste unitario no frontend validando o schema do formulario com Vitest
- Teste de integracao no frontend renderizando o dashboard com providers reais e `fetch` mockado
- Teste E2E com Cypress cobrindo o fluxo de criacao de atendimento pelo dashboard
- Estrutura E2E modularizada com POM em `apps/web/tests/e2e/cypress/pages` e COM em `apps/web/tests/e2e/cypress/components`
- Reaproveitamento de mocks e comandos customizados em `apps/web/tests/e2e/cypress/support/commands.js`

## Seguranca e transporte

- A API e REST
- O trafego nao fica criptografado por padrao no ambiente local porque o setup default usa HTTP
- Existe suporte a HTTPS na API por variaveis de ambiente `HTTPS_ENABLED`, `HTTPS_CERT_PATH` e `HTTPS_KEY_PATH`
- Mitigacao de SQL injection via Prisma, validacao de entrada com Zod e ausencia de concatenacao manual de SQL nas rotas atuais
- Mitigacao de HTML e JavaScript injection com sanitizacao de campos textuais no backend, escaping padrao do React no frontend e CSP no `index.html`
- Endurecimento adicional com `helmet`, `cors` com allowlist, `express-rate-limit`, `x-powered-by` desabilitado, limite de payload JSON e `referrerPolicy` no cliente

## Nice to have entregues

- Validacao de entrada com Zod no backend e no frontend
- Dashboard com polling configuravel para monitoramento em tempo real
- Hook pre-commit com Prettier, lint e typecheck
- Headers de seguranca, CORS configuravel e rate limit na API
- Fila em Redis para ambiente principal e fallback em memoria para ambiente local
- Layout modular com componentes reutilizaveis e variantes estilo shadcn
- Suite de testes com unitario, integracao e E2E em Cypress
- Suite de testes tambem no frontend com Vitest
- Backend mantido com apenas um teste de API considerado critico
- Estrutura de E2E reaproveitavel com POM e COM
