//<reference types="cypress-xpath" />
/// <reference types="cypress" />
///
import '../../support/commands';
import '../../support/index';

describe('Navigation Functionalities', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  it('Verify Loggin In RLP Reports ', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(2000)
  })

  //Bar Filters
  it('Verify Last 24hrs, Last 7days, last 30days & Last 365days Filters ', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(2000)
    //Last 24hrs
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div > div > label:nth-child(2)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Last 7days
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div > div > label:nth-child(4)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Last 30days
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div > div > label:nth-child(6)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Last 365days
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div > div > label:nth-child(8)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Date Range filter
  it('Verify Select Date Range filter', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div.flex.w-100.ml-2 > div > div > div > label.btn.button-primary.navbar-button.leading-none.tw-col > svg'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Navigation Bar
  it.only('Verify The Navigation Bar Menu Is Clickable', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(3000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.text-black.bg-white>div:nth-child(1)>button')
      .click()
  })

  //Repots
  it('Verify The Reports', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.text-black.bg-white>div:nth-child(1)>button')
      .click()
    //Course Enrollment Summary
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(2)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Course Enrollment Detail
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(3)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Module Enrollment Summary
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(4)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Module Enrollment Detail
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(5)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Schedule Repots
  it('Verify The Schedule Report Icon & Tooltip', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.text-black.bg-white>div:nth-child(1)>button')
      .click()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(2)>button')
      .should('be.visible')
      .click({ force: true })
    //Schedule icon
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.p-0.m-0.w-100 > div > div > div:nth-child(1) > div > div > div > div:nth-child(2) '
      )
      .trigger('mouseover')
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div> div > div > div:nth-child(1) > div > div > div > div > div.flex > div > svg'
      )
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div> div > div > div.modal-footer.flex.justify-end > button.btn.btn-outline-primary'
      )
      .click({ force: true })
    cy.wait(1000)
  })

  //Download Repots CSV / XLSX format
  it('Verify The Download Report Icon & Tooltip', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.text-black.bg-white>div:nth-child(1)>button')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(3)>button')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div')
      .trigger('mouseover')
      .click()
    cy.wait(1000)
  })

  //Previous Button
  it('Verify Previous Icon Is Clickable', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.text-black.bg-white>div:nth-child(1)>button')
      .click()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(5)>button')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.w-100>div:nth-child(1)>div>div:nth-child(2)>div:nth-child(1)>button'
      )
      .click()
  })

  //Close Button (x)
  it('Verify Close(X) Button', () => {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > button > svg'
      )
      .should('be.visible')
      .click({ force: true })
  })
})
