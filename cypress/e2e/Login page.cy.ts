///<reference types="cypress" />

describe('Login Page', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as Admin

  it('User should login valid credentials', function () {
    cy.viewport(1500, 1000)
    cy.get('.login-form > :nth-child(2) > :nth-child(1)').should('be.visible')
    cy.get('#email').type('mahesh.a@elblearning.com')
    cy.get('.login-form > :nth-child(2) > :nth-child(4)').should('be.visible')
    cy.get('#password').type('Slacker')
    cy.get('.ng-binding > .ng-valid').click({ force: true })
    //Forgot password page
    //cy.get(':nth-child(2) > a.ng-binding').should('be.visible').click()
    cy.get('#submit').should('be.visible').click()
    cy.wait(3000)
  })

  it('User should login invalid credentials', function () {
    cy.viewport(1500, 1000)
    cy.get('.login-form > :nth-child(2) > :nth-child(1)').should('be.visible')
    cy.get('#email').type('mahesh.a@elblearning.com')
    cy.get('.login-form > :nth-child(2) > :nth-child(4)').should('be.visible')
    cy.get('#password').type('P@ssw0rd')
    cy.get('.ng-binding > .ng-valid').click({ force: true })
    //Forgot password page
    //cy.get(':nth-child(2) > a.ng-binding').should('be.visible').click()
    cy.get('#submit').should('be.visible').click()
    cy.wait(3000)
  })
})
