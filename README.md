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
- React
- TanStack Query
- TanStack Router
- Zustand
- Radix UI
- Tailwind CSS
- Zod

## Como rodar

1. Instale as dependencias com `npm install` na raiz.
2. Suba a infraestrutura com `docker compose up -d`.
3. Copie `apps/api/.env.example` para `apps/api/.env`.
4. Execute `npm run db:migrate`.
5. Execute `npm run db:seed`.
6. Rode a API com `npm run dev:api`.
7. Rode o front com `npm run dev:web`.

## Validacoes locais

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
