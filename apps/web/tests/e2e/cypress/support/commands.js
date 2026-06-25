const defaultSnapshot = {
  summary: {
    active: 2,
    queued: 1,
    completedToday: 7,
    agentsOnline: 3,
  },
  teams: [
    { team: 'CARDS', active: 1, queued: 1, agents: 1 },
    { team: 'LOANS', active: 1, queued: 0, agents: 1 },
    { team: 'OTHER', active: 0, queued: 0, agents: 1 },
  ],
  agents: [
    {
      id: 'agent-1',
      name: 'Ana Cartoes',
      team: 'CARDS',
      activeAttendances: 1,
      capacityLeft: 2,
    },
    {
      id: 'agent-2',
      name: 'Diego Emprestimos',
      team: 'LOANS',
      activeAttendances: 1,
      capacityLeft: 2,
    },
    {
      id: 'agent-3',
      name: 'Gabi Outros',
      team: 'OTHER',
      activeAttendances: 0,
      capacityLeft: 3,
    },
  ],
  recentAttendances: [
    {
      id: 'attendance-1',
      customerName: 'Maria Silva',
      subject: 'Problema com cartao fisico',
      team: 'CARDS',
      status: 'ACTIVE',
      queuedAt: null,
      startedAt: '2026-06-25T10:00:00.000Z',
      completedAt: null,
      createdAt: '2026-06-25T10:00:00.000Z',
      updatedAt: '2026-06-25T10:00:00.000Z',
      assignedAgent: {
        id: 'agent-1',
        name: 'Ana Cartoes',
        team: 'CARDS',
      },
    },
  ],
}

Cypress.Commands.add('mockDashboard', (snapshot = {}) => {
  cy.intercept('GET', /\/api\/dashboard$/, {
    statusCode: 200,
    body: {
      ...defaultSnapshot,
      ...snapshot,
    },
  }).as('getDashboard')
})

Cypress.Commands.add('mockCreateAttendance', (customerName = 'Cliente E2E') => {
  cy.intercept('POST', /\/api\/attendances$/, {
    statusCode: 201,
    body: {
      id: 'attendance-e2e',
      customerName,
      subject: 'Problema com cartao',
      team: 'CARDS',
      status: 'ACTIVE',
      queuedAt: null,
      startedAt: '2026-06-25T11:00:00.000Z',
      completedAt: null,
      createdAt: '2026-06-25T11:00:00.000Z',
      updatedAt: '2026-06-25T11:00:00.000Z',
      assignedAgent: {
        id: 'agent-1',
        name: 'Ana Cartoes',
        team: 'CARDS',
      },
    },
  }).as('createAttendance')

  cy.intercept('GET', /\/api\/dashboard$/, {
    statusCode: 200,
    body: {
      ...defaultSnapshot,
      summary: {
        ...defaultSnapshot.summary,
        active: 3,
      },
      recentAttendances: [
        {
          id: 'attendance-e2e',
          customerName,
          subject: 'Problema com cartao',
          team: 'CARDS',
          status: 'ACTIVE',
          queuedAt: null,
          startedAt: '2026-06-25T11:00:00.000Z',
          completedAt: null,
          createdAt: '2026-06-25T11:00:00.000Z',
          updatedAt: '2026-06-25T11:00:00.000Z',
          assignedAgent: {
            id: 'agent-1',
            name: 'Ana Cartoes',
            team: 'CARDS',
          },
        },
        ...defaultSnapshot.recentAttendances,
      ],
    },
  }).as('refreshDashboard')
})
