import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import DashboardPreferencesProvider from '@/contexts/dashboard-preferences-context'
import DashboardScreen from '@/modules/dashboard/dashboard.screen'
import { useDashboardFiltersStore } from '@/stores/dashboard-filters.store'

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null,
}))

const dashboardSnapshot = {
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

const renderDashboard = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardPreferencesProvider>
        <DashboardScreen />
      </DashboardPreferencesProvider>
    </QueryClientProvider>
  )
}

describe('DashboardScreen integration', () => {
  beforeEach(() => {
    useDashboardFiltersStore.setState({ selectedTeam: 'ALL' })

    vi.spyOn(globalThis, 'fetch').mockImplementation((input, init) => {
      const url = String(input)

      if (
        url.endsWith('/api/dashboard') &&
        (!init || !init.method || init.method === 'GET')
      ) {
        return Promise.resolve(
          new Response(JSON.stringify(dashboardSnapshot), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )
      }

      return Promise.reject(new Error(`unexpected request: ${url}`))
    })
  })

  it('renders dashboard data fetched by the front layer', async () => {
    renderDashboard()

    expect(screen.getByText('Carregando dashboard...')).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {
        name: 'Distribuicao viva de atendimentos',
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Maria Silva')).toBeInTheDocument()
    expect(screen.getByText('Atendimentos recentes')).toBeInTheDocument()
    expect(screen.getByText('Concluidos hoje')).toBeInTheDocument()
  })

  it('shows front validation feedback before submitting empty values', async () => {
    const user = userEvent.setup()

    renderDashboard()

    await screen.findByRole('heading', {
      name: 'Distribuicao viva de atendimentos',
    })

    await user.click(screen.getByRole('button', { name: 'Novo atendimento' }))
    await user.click(
      screen.getByRole('button', { name: 'Distribuir atendimento' })
    )

    await waitFor(() => {
      expect(
        screen.getByText('Informe um nome com pelo menos 2 caracteres')
      ).toBeInTheDocument()
    })
  })
})
