/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import 'cypress-iframe'
import '@4tw/cypress-drag-drop'
import 'cypress-xpath'
import 'cypress-file-upload'

Cypress.Commands.add('parallel', { prevSubject: false }, (funcs) => {
  const promises = funcs.map((func) => {
    return cy.wrap(null).then(() => func())
  })
  return cy.wrap(Promise.all(promises))
})

//*-------------Blue Lightning login functions*----------//

Cypress.Commands.add('login', (_username, _password) => {
  cy.visit('https://edulence.klstaging.net/')

  cy.get('#email').type('mahesh.g@elblearning.com')
  cy.get('#password').type('slacker')
  cy.get('#submit').click()

  //cy.get('#usr-prompt-modal > form > div.right > button:nth-child(1)').should('be.visible').click({force: true})
  cy.get('#usr-user-dropdown').click({ force: true })
  cy.get('.toggle-btn > .arrow').click()
  cy.get('[ui-sref="page.admin"]').click()
  cy.get('.page-main_title').should('be.visible')
  cy.wait(2000)
  //Open new reports
  cy.get('[ng-show="showBlueLightening"] > .btn').click({ force: true })
  cy.wait(1000)
  cy.get('iframe').then(($iframe) => {
    const src = $iframe.prop('src')
    cy.url().then((url) => {
      const newUrl = `${src}`
      cy.visit(newUrl)
      cy.wait(2000)
    })
  })
})
