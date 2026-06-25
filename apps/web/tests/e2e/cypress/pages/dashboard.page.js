import AttendanceDialogComponent from '../components/attendance-dialog.component.js'

export default class DashboardPage {
  constructor() {
    this.attendanceDialog = new AttendanceDialogComponent()
  }

  visit() {
    cy.visit('/')
  }

  expectLoaded() {
    cy.get('[data-cy="dashboard-page"]').should('be.visible')
    cy.contains('Distribuicao viva de atendimentos').should('be.visible')
  }

  expectAttendanceVisible(customerName) {
    cy.get('[data-cy="attendance-feed"]')
      .contains(customerName)
      .should('be.visible')
  }
}
