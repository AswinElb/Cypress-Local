///<reference types="cypress" />

describe('Blue Lightning', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as Admin
  it('Reports', function () {
    cy.viewport(1500, 1000)
    //----------------------[By clicking Reports with empty fields]----------------------//
    cy.get('.login-form > :nth-child(2) > :nth-child(1)').should('be.visible')
    cy.get('#email').type('porkodi.a@elblearning.com')
    cy.get('.login-form > :nth-child(2) > :nth-child(4)').should('be.visible')
    cy.get('#password').type('Slacker')
    cy.get('.ng-binding > .ng-valid').click({ force: true })
    cy.get('#submit').should('be.visible').click()
    cy.wait(3000)
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
        cy.visit(newUrl)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.text-black.bg-white>div:nth-child(1)>button')
          .click()

        //----------------------[Course Enrollment Summary ]----------------------//
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(2)>div>button'
          )
          .click()

        //Download CSV / XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        //cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(1)>a').click() //CSV
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(2)>a')
          .click() //XLSX
        cy.wait(5000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.text-black.bg-white>div:nth-child(1)>button')
          .click() //Back to reports
        cy.wait(2000)

        //----------------------[Course Enrollment Details ]----------------------//
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(3)>div>button'
          )
          .click()

        //Download CSV / XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(2000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(1)>a')
          .click() //CSV
        cy.wait(3000)
        //cy.wait(2000)
        //cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(2)>a').click() //XLSX
        //cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
          )
          .click() //Confirm Button
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
        cy.wait(4000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.text-black.bg-white>div:nth-child(1)>button')
          .click()
        cy.wait(4000)

        //----------------------[Module Enrollment Summary ]----------------------//

        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(4)>div>button'
          )
          .should('be.visible')
          .click()

        //Download CSV / XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(2000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(1)>a')
          .click() //CSV
        // cy.wait(2000)
        // cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(2)>a').click() //XLSX
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.text-black.bg-white>div:nth-child(1)>button')
          .click()
        cy.wait(4000)

        //----------------------[Module Enrollment Details ]----------------------//
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(5)>div>button'
          )
          .should('be.visible')
          .click()

        //Download CSV / XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(2000)
        //cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(1)>a').click() //CSV
        //cy.wait(4000)
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)').click()
        //cy.wait(4000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(2)>a')
          .click() //XLSX
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
          )
          .click() //Confirm Button
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
        cy.wait(2000)
      })
    })
  })
})
