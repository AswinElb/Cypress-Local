///<reference types="cypress" />

describe('Dashboard page', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as Admin

  it('Dashboard', function () {
    cy.viewport(1500, 1000)
    cy.get('.login-form > :nth-child(2) > :nth-child(1)').should('be.visible')
    cy.get('#email').type('mahesh.g@elblearning.com')
    cy.get('.login-form > :nth-child(2) > :nth-child(4)').should('be.visible')
    cy.get('#password').type('slacker')
    cy.get('.ng-binding > .ng-valid').click({ force: true })
    //Forgot password page
    //cy.get(':nth-child(2) > a.ng-binding').should('be.visible').click()
    cy.get('#submit').should('be.visible').click()
    cy.wait(3000)
    //Go to admin page
    cy.get('#usr-user-dropdown').click({ force: true })
    cy.get('.toggle-btn > .arrow').click()
    cy.get('[ui-sref="page.admin"]').click()
    cy.get('.page-main_title').should('be.visible')
    cy.wait(3000)
    //Open new reports
    cy.get('[ng-show="showBlueLightening"] > .btn').click({ force: true })
    cy.wait(3000)
    cy.get('iframe').then(($iframe) => {
      const src = $iframe.prop('src')
      cy.url().then((url) => {
        const newUrl = `${src}`
        //cy.origin('newUrl', () => {
        cy.visit(newUrl)
        //Side Panel Open
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.text-black.bg-white>div:nth-child(1)>button')
          .click()
        cy.wait(2000)
        //Dashboard page
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div> div:nth-child(2) > button'
          )
          .click()
      })
    })
  })
})
