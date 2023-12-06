///<reference types="cypress" />

describe('Recurring Course', function () {
  beforeEach(() => {
    cy.visit('https://edulence.klstaging.net/')
  })
  //Login as Admin
  it('Verify Creating Recurring Course In Content Tab', function () {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(3000)
    //Go to Admin page
    cy.get('#usr-user-dropdown').click({ force: true })
    cy.get('.toggle-btn > .arrow').click()
    cy.wait(3000)
    cy.get('[ui-sref="page.admin"]').click()
    cy.get('.page-main_title').should('be.visible')
    cy.wait(3000)
    //Select Content tab
    cy.get('[ng-if="fullAccess && !isMobile"]').click()
    cy.wait(5000)
    //Click Add New Button
    cy.get(
      '#adm-content-tree-list > :nth-child(1) > .btn-container > [ng-click="add()"]'
    ).click()
    //Click Edit
    cy.get(
      ':nth-child(1) > .folderArea > .folder-header > .folder-header-wrapper > .row2 > .ctrl-container > [ng-hide="item.locked || item.editable"] > :nth-child(2) > a'
    )
      .should('be.visible')
      .click({ force: true })
    cy.get('.ng-pristine.ng-valid-date-disabled > .ng-invalid')
    cy.get('#page_nav > ul > li.ng-scope.active > a > p').scrollIntoView()
    cy.wait(4000)
    cy.get(
      '#adm-content-tree-list > adm-content-tree-folder > div > ul > li:nth-child(1) > div > div.folder-header > div.edit-form.ng-scope > form > input'
    )
      .click({ force: true })
      .type('Testing course check', { scrollBehavior: false })

    cy.get(
      '#adm-content-tree-list > adm-content-tree-folder > div > ul > li:nth-child(1) > div > div.folder-header > div.edit-form.ng-scope > form > textarea'
    )
      .should('be.visible')
      .type(
        'If a course is set to be recurring, then we also set a frequency in days',
        { scrollBehavior: false }
      )
    //Enrollment Settings
    cy.get(
      '.enrollment-settings-group > .btn-group > [btn-radio="true"]'
    ).click({ force: true })
    //Recurring Enrollment
    cy.get(':nth-child(4) > .btn-group > [btn-radio="true"]').click({
      force: true,
    })
    cy.get('.enrollment-settings-group.ng-scope > .form-control').should(
      'be.visible'
    )
    cy.wait(3000)
    cy.xpath("(//input[@type='number'])[2]")
      .should('be.visible')
      .click({ force: true })
      .type('5')
    cy.wait(3000)
    cy.xpath("(//div[@class='btn-group btn-group-xs'])[13]").click({
      force: true,
    })
    cy.get(
      '#adm-content-tree-list > adm-content-tree-folder > div > ul > li:nth-child(1) > div > div.folder-header > div.edit-form.ng-scope > form > div:nth-child(25) > label:nth-child(1)'
    ).click({ force: true })
    //Update Course Button
    cy.get('.ng-valid-date-disabled.ng-dirty > .btn-container > .submit').click(
      { force: true }
    )
    cy.get('#page_nav > ul > li.ng-scope.active > a > p').scrollIntoView()
    cy.wait(3000)

    //Drag the module
    cy.xpath("(//div[@class='input-group'])[1]/input")
      .click({ force: true })
      .type('Testing')
    cy.get('#page_nav > ul > li.ng-scope.active > a > p').scrollIntoView()
    cy.wait(4000)
    cy.get(
      '#adm-content-session-list > div.list-view.panel > div.body.innerscroll > ul > li:nth-child(1)'
    ).drag(
      '#adm-content-tree-list > adm-content-tree-folder > div > ul > li:nth-child(1) > div > adm-content-tree-folder > div>ul',
      { force: true }
    )
    cy.wait(4000)

    //Click publish
    cy.get(':nth-child(1) > .btn-container > .right > .btn').click({
      force: true,
    })
    cy.get('.body > .ng-pristine > .btn-container > .submit').click({
      force: true,
    })
  })

  it('Verify Enroll Recurring Course To Users', function () {
    cy.visit('https://edulence.klstaging.net/')
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(3000)
    //Go to Admin page
    cy.get('#usr-user-dropdown').click({ force: true })
    cy.get('.toggle-btn > .arrow').click()
    cy.wait(3000)
    cy.get('[ui-sref="page.admin"]').click()
    cy.get('.page-main_title').should('be.visible')
    cy.wait(3000)
    //Select Enrollment
    cy.get('[ng-if="fullAccess || assignmentsAccess"] > a > p').click()
    cy.get(
      '#adm-assignments-course-list>.header>.header-items-container>.searchbox>.input-group>.form-control'
    ).type('Recurring course check')
    cy.get(
      '#adm-assignments-course-list>div:nth-child(2)>ul>li:nth-child(1)>table>tbody>tr:nth-child(2)>td>div>button'
    ).click()
    cy.get(
      '#adm-assignments-user-list > div:nth-child(2) > div > div > div> div.input-group > input'
    ).type('mahesh.g')
    //cy.get('#adm-assignments-user-list>div:nth-child(2)>div:nth-child(2)>table>tbody>tr:nth-child(2)>td:nth-child(1)>input').should('be.visible').check()

    //Click Enroll
    cy.get(
      '#adm-assignments-user-list > div:nth-child(2) > div.header > button.btn.btn-edulence.submit'
    ).click()
    //Sucess message (X)
    //cy.get('#adm-growl > .glyphicon').click
  })

  it('Check Enrolled Recurring Course In Users View ', function () {
    cy.visit('https://edulence.klstaging.net/')
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(3000)
  })

  it('Check Recurring Course In Administration Reports', function () {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(3000)
    //cy.get('bl-wc-rlp-report').shadow().find('.text-black.bg-white>div:nth-child(1)>button').click()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(3)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Course text field
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        ' div.flex.flex-col.content-between.gap-4.filter-items.pt-2 > div:nth-child(2) > div > label > input'
      )
      .click()
      .type('Recurring course check')
  })

  it('Verify Enrollment Type Filters', function () {
    cy.viewport(1500, 1000)
    cy.login()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.bg-white.border-r-2>div:nth-child(3)>div:nth-child(3)>button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('[class="tw-text-gray-500 tw-transition-transform"]')
      .click()
    //Current & Pst Enrollment
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(3)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //Download reports
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .trigger('mouseout')
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > ul > li:nth-child(1) > a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal > div> div > div > div > button:nth-child(1)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('[class="tw-text-gray-500 tw-transition-transform"]')
      .click()
    //Past Enrollment only
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //Download reports
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .trigger('mouseout')
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > ul > li:nth-child(2) > a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal > div> div > div > div > button:nth-child(1)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('[class="tw-text-gray-500 tw-transition-transform"]')
      .click()
    //Current Enrollements Only
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //Download reports
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > div > div > div')
      .trigger('mouseout')
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#dropdown > ul > li:nth-child(1) > a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.schedule-email-modal > div> div > div > div > button:nth-child(1)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })
})
