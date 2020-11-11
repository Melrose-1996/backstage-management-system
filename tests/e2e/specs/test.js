// https://docs.cypress.io/api/introduction/api.html
/// <reference types="Cypress" />
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:9201/vip/login')
    cy.contains('.to-register', '还没有账号，请立即注册')
  })
})
