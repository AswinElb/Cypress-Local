//----------------------[By clicking Reports with empty fields]----------------------//
///<reference types="cypress-xpath" />

describe('Download Reports', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as Admin
  it('Downloading Reports For Course Enrollment Summary', function () {
    cy.login()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(2)>button'
      )
      .click()

    //Download CSV / XLSX file
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(1)>a')
      .click() //CSV
    cy.wait(5000)
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(2)>a')
      .click() //XLSX
    cy.wait(5000)
  })

  it('Downloading Reports For Course Enrollment Details', function () {
    cy.login()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(3) > button'
      )
      .click()
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(1)>a')
      .click() //CSV
    cy.wait(3000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
      )
      .click() //Confirm Button

    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(2)>a')
      .click() //XLSX
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
      )
      .click() //Confirm Button
    //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
    cy.wait(4000)
  })

  it('Downloading Reports For Module Enrollment Summary', function () {
    cy.login()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(4) > button'
      )
      .click()

    //Download CSV / XLSX file
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(1)>a')
      .click() //CSV
    cy.wait(5000)
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(2)>a')
      .click() //XLSX
    cy.wait(5000)
  })

  it('Downloading Reports For Module Enrollment Details', function () {
    cy.login()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(5) > button'
      )
      .click()
    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(1)>a')
      .click() //CSV
    cy.wait(3000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
      )
      .click() //Confirm Button

    cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>ul>li:nth-child(2)>a')
      .click() //XLSX
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
      )
      .click() //Confirm Button
    //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
    cy.wait(4000)
  })

  it('Verify Download Reports Button Disabled', function () {
    cy.login()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(3) > button'
      )
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div > div > div > div:nth-child(2) > div > div> div:nth-child(2) > div > label > input'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(5)>div:nth-child(1)>input')
      .click()
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown>div')
      .should('be.visible')
    cy.wait(2000)
  })
})
