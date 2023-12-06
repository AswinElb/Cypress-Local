///<reference types="cypress-xpath" />

describe('Blue Lightning', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as enterprise admin
  //----------------------[Course Enrollment Summary ]----------------------//

  it('Course Enrollment Summary', function () {
    cy.viewport(1500, 1000)
    cy.get('.login-form > :nth-child(2) > :nth-child(1)').should('be.visible')
    cy.get('#email').type('porkodi.a@elblearning.com')
    cy.get('.login-form > :nth-child(2) > :nth-child(4)').should('be.visible')
    cy.get('#password').type('Slacker')
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
        //Verify the disabled office filter
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.min-h-screen.bg-white.shadow-md>div:nth-child(2)>div')
          .click()
        //Add enterprise to enterprise filter
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(4)>div>div>label>input'
          )
          .click()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(5)>div>input')
          .check()
        cy.wait(3000)
        //cy.get('bl-wc-rlp-report').shadow().find('.block.px-4.text-sm.max-h-100>div:nth-child(6)>div>input').check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2.text-sm>i>svg')
          .click()
        //Add office
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(5)'
          )
          .click()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(1)>div>input'
          )
          .check()
        cy.wait(3000)
        //cy.get('bl-wc-rlp-report').shadow().find('.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(2)>div>input').check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2>i>svg')
          .click()

        //Download CSV/XLSX  file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(1)>a')
          .click() //CSV
        // cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(2)>a').click() //XLSX
        cy.wait(4000)
      })
    })
  })
  //----------------------[Course Enrollment Details ]----------------------//

  it('Course enrollment details', function () {
    cy.viewport(1500, 1000)
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

        //Select Dropdown Reports
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.min-h-screen.bg-white.shadow-md>div:nth-child(2)>div')
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.form-select')
          .select('Course Enrollment Detailed')

        //Add enterprise
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(7)>div>div'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(5)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(6)>div>input')
          .check()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2.text-sm>i>svg')
          .click() //X- button

        //Add office
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(8)'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(1)>div>input'
          )
          .check()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(2)>div>input'
          )
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2>i>svg')
          .click() //X-button

        //Download CSV/XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(5000)
        //cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(1)>a').click() //CSV
        //cy.wait(3000)
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)').click()
        //cy.wait(2000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(2)>a')
          .click() //XLSX
        // cy.wait(4000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
          )
          .click() //Confirm Button
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
        cy.wait(4000)
      })
    })
  })
  //----------------------[Module Enrollment Summary ]----------------------//

  it('Module Enrollment Summary', function () {
    cy.viewport(1500, 1000)
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

    cy.get('[ng-show="showBlueLightening"] > .btn').click({ force: true })
    cy.wait(3000)
    cy.get('iframe').then(($iframe) => {
      const src = $iframe.prop('src')
      cy.url().then((url) => {
        const newUrl = `${src}`
        cy.visit(newUrl)

        //Select Dropdown Reports
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.min-h-screen.bg-white.shadow-md>div:nth-child(2)>div')
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.form-select')
          .select('Module Enrollment Summary')
        //Add enterprise
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(4)>div>div'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(3)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(4)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(5)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(6)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(7)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2.text-sm>i>svg')
          .click() //X- button
        //Add office
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(5)'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(1)>div>input'
          )
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(2)>div>input'
          )
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2>i>svg')
          .click() //X-button

        //Download CSV/XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(2000)
        //cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(1)>a').click() //CSV
        //cy.wait(2000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(2)>a')
          .click() //XLSX
        cy.wait(3000)
      })
    })
  })
  //----------------------[Module Enrollment Details ]----------------------//

  it('Module enrollement details', function () {
    cy.viewport(1500, 1000)
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
    cy.get('[ng-show="showBlueLightening"] > .btn').click({ force: true })
    cy.wait(3000)
    cy.get('iframe').then(($iframe) => {
      const src = $iframe.prop('src')
      cy.url().then((url) => {
        const newUrl = `${src}`
        cy.visit(newUrl)

        //Select Dropdown Reports
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.min-h-screen.bg-white.shadow-md>div:nth-child(2)>div')
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.form-select')
          .select('Module Enrollment Detailed')

        //Add enterprise
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(4)>div>div'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(5)>div>input')
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.block.px-4.text-sm.max-h-100>div:nth-child(6)>div>input')
          .check()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2.text-sm>i>svg')
          .click() //X- button

        //Add office
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.card-header-summary.bg-white>div:nth-child(2)>div:nth-child(5)'
          )
          .click()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(1)>div>input'
          )
          .check()
        cy.wait(3000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            '.absolute.mt-2.right-0.z-20.w-48.py-2>div>div:nth-child(2)>div>input'
          )
          .check()
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('.flex.justify-end.p-3.-mt-2>i>svg')
          .click() //X-button

        //Download CSV/XLSX file
        cy.get('bl-wc-rlp-report').shadow().find('#dropdown>div').click()
        cy.wait(5000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find('#dropdown>ul>li:nth-child(1)>a')
          .click() //CSV
        // cy.wait(5000)
        // cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)').click()
        // cy.wait(4000)
        // cy.get('bl-wc-rlp-report').shadow().find('#dropdown>ul>li:nth-child(2)>a').click() //XLSX
        // cy.wait(5000)
        cy.get('bl-wc-rlp-report')
          .shadow()
          .find(
            'div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(1)'
          )
          .click() //Confirm Button
        //cy.get('bl-wc-rlp-report').shadow().find('div.schedule-email-modal>div.modal.fade.show>div>div>div.modal-footer.flex>button:nth-child(2)').click() //Cancel Button
      })
    })
  })
})
