export default class AttendanceDialogComponent {
  open() {
    cy.get('[data-cy="open-attendance-dialog"]').click()
  }

  fill(customerName, subject) {
    cy.get('[data-cy="attendance-customer-name"]').clear().type(customerName)
    cy.get('[data-cy="attendance-subject"]').clear().type(subject)
  }

  submit() {
    cy.get('[data-cy="submit-attendance"]').click()
  }
}
