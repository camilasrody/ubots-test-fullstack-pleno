import DashboardPage from '../pages/dashboard.page.js'

describe('dashboard flow', () => {
  it('creates a new attendance from the dashboard', () => {
    const dashboardPage = new DashboardPage()

    cy.mockDashboard()
    cy.mockCreateAttendance('Cliente E2E')

    dashboardPage.visit()
    dashboardPage.expectLoaded()
    dashboardPage.attendanceDialog.open()
    dashboardPage.attendanceDialog.fill('Cliente E2E', 'Problema com cartao')
    dashboardPage.attendanceDialog.submit()

    cy.wait('@createAttendance')
    cy.wait('@refreshDashboard')
    dashboardPage.expectAttendanceVisible('Cliente E2E')
  })
})
