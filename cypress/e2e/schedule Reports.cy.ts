///<reference types="cypress" />

describe('Schedule reports', function () {
  it('Verify The schedule Report Title & Navigation Bar', function () {
    cy.login()

    //Schedule report
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .contains('Scheduled Reports')
      .should('be.visible')
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('div > div.p-0.m-0.w-100 > div > div > div > div > button > svg')
      .should('be.visible')
      .click({ force: true })
  })

  it('Scheduled For Course Enrollement Summary Reports', function () {
    cy.login()

    //Course Enrollement summary
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(2)>button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //Select course
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div> div:nth-child(1) > div > label > input'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(1)>div:nth-child(1)>input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(8)>div:nth-child(1)>input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(9)>div:nth-child(1)>input')
      .should('be.visible')
      .click({ force: true })

    //Schedule report
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(1) > div > div > div > div > div.tw-max-w-full > div > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Name Field
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#reportName')
      .should('be.visible')
      .type('Course summary Automation')

    //Verify frequency check box
    cy.get('bl-wc-rlp-report').shadow().find('#includeWeekends').check()
    cy.wait(1000)

    //Set frequency time
    // cy.get('bl-wc-rlp-report').shadow().find('div > div.p-0.m-0.w-100 > div > div > div > div > div.tw-flex-grow > div.tw-p-6 > form > div> div > div > div > div > svg').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__overlay_row.dp__flex_row >div >div:nth-child(1) >div:nth-child(1) >svg').should('be.visible').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__action_button.dp__action_select').should('be.visible').click()
    // cy.wait(2000)

    //Select Range
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(3)')
      .click()
    cy.wait(1000)

    // //Add recipients
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div.tw-p-6 > form > div:nth-child(8) > div > div > div'
      )
      .type('sujith.g@elblearning.com')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click()
    cy.wait(2000)

    //Pause
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Resume
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Edit
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(1)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(4)')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Delete
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(3)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.modal-footer.flex.justify-end>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.wait(1000)
  })

  it('Scheduled For Course Enrollement Detail Reports', function () {
    cy.login()

    //Course Enrollement Detail
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(3)>button'
      )
      .click()
    cy.wait(1000)

    //Schedule report
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(1) > div > div > div > div > div.tw-max-w-full > div > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Name Field
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#reportName')
      .should('be.visible')
      .type('Automation Check')

    //Verify frequency check box
    cy.get('bl-wc-rlp-report').shadow().find('#includeWeekends').check()
    cy.wait(2000)
    //Set frequency time
    // cy.get('bl-wc-rlp-report').shadow().find('div > div.p-0.m-0.w-100 > div > div > div > div > div.tw-flex-grow > div.tw-p-6 > form > div> div > div > div > div > svg').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__overlay_row.dp__flex_row >div >div:nth-child(1) >div:nth-child(1) >svg').should('be.visible').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__action_button.dp__action_select').should('be.visible').click()
    // cy.wait(2000)
    //Select Range
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(2)')
      .click()
    cy.wait(1000)
    //Add recipients
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div.tw-p-6 > form > div:nth-child(8) > div > div > div'
      )
      .type('sujith.g@elblearning.com')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click()
    cy.wait(2000)

    //Pause

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >ul >li:nth-child(2) >a'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Resume

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >ul >li:nth-child(2) >a'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Edit

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >ul >li:nth-child(1) >a'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(4)')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Delete

    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(2)>td:nth-child(6)>div >div >ul >li:nth-child(3) >a'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.modal-footer.flex.justify-end>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  it('Scheduled For Module Enrollement Summary Reports', function () {
    cy.login()

    //Module Enrollement summary
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div.bg-white.border-r-2.border-solid>div:nth-child(3)>div:nth-child(4)>button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //Select Module
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > label > input'
      )
      .should('be.visible')
      .click({ force: true })
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(1)>div:nth-child(1)>input')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(4)>div:nth-child(1)>input')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(5)>div:nth-child(1)>input')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(7)>div:nth-child(1)>input')
      .click()
    cy.wait(1000)

    //Schedule report
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(1) > div > div > div > div > div.tw-max-w-full > div > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Name Field
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#reportName')
      .should('be.visible')
      .type('Module summary Automation')

    //Verify frequency check box
    cy.get('bl-wc-rlp-report').shadow().find('#includeWeekends').check()
    cy.wait(1000)

    //Set frequency time
    // cy.get('bl-wc-rlp-report').shadow().find('div > div.p-0.m-0.w-100 > div > div > div > div > div.tw-flex-grow > div.tw-p-6 > form > div> div > div > div > div > svg').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__overlay_row.dp__flex_row >div >div:nth-child(1) >div:nth-child(1) >svg').should('be.visible').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__action_button.dp__action_select').should('be.visible').click()
    // cy.wait(2000)

    //Select Range
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(1)')
      .click()
    cy.wait(1000)
    //Add recipients
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div.tw-p-6 > form > div:nth-child(8) > div > div > div'
      )
      .type('sujith.g@elblearning.com{ENTER}')
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click()
    cy.wait(2000)

    //Pause
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Resume
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Edit
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(1)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(3)')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Delete
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(3)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.modal-footer.flex.justify-end>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.wait(1000)
  })

  it('Scheduled For Module Enrollement Detail Reports', function () {
    cy.login()

    //Module Enrollement Detail
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div> div:nth-child(3) > div:nth-child(5) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //Select users
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > label > input'
      )
      .should('be.visible')
      .click({ force: true })
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(2)>div:nth-child(1)>input')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div> div > div > table > thead > tr > th:nth-child(8)'
      )
      .click()
    cy.wait(1000)

    //Select Module
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div > label > input'
      )
      .should('be.visible')
      .click({ force: true })
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(1)>div:nth-child(1)>input')
      .click()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(3)>div:nth-child(1)>input')
      .click()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-block.tw-text-sm>div:nth-child(4)>div:nth-child(1)>input')
      .click()

    //Schedule report
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(1) > div > div > div > div > div.tw-max-w-full > div > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Name Field
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#reportName')
      .should('be.visible')
      .type('Module Detail Automation')
    cy.wait(1000)

    //Frequency
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#frequencyType')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(3)')
      .click()
    cy.wait(1000)

    //Verify frequency check box
    // cy.get('bl-wc-rlp-report').shadow().find('#includeWeekends').check()
    // cy.wait(1000)

    //Set frequency time
    // cy.get('bl-wc-rlp-report').shadow().find('div > div.p-0.m-0.w-100 > div > div > div > div > div.tw-flex-grow > div.tw-p-6 > form > div> div > div > div > div > svg').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__overlay_row.dp__flex_row >div >div:nth-child(1) >div:nth-child(1) >svg').should('be.visible').click({force: true})
    // cy.wait(1000)
    // cy.get('bl-wc-rlp-report').shadow().find('.dp__action_button.dp__action_select').should('be.visible').click()
    // cy.wait(2000)

    //Select Range
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(3)')
      .click()
    cy.wait(1000)
    //Add recipients
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div > div > div > div.tw-p-6 > form > div:nth-child(8) > div > div > div'
      )
      .type('sujith.g@elblearning.com{ENTER}')
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click()
    cy.wait(2000)

    //Pause
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Resume
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(2)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Edit
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(1)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#range > input')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('#elb-simple-select > ul > li:nth-child(4)')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.tw-p-6.tw-flex-shrink-0>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Delete
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(6)>div >div >button '
      )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.dropdown-menu.show>li:nth-child(3)>a')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find('.modal-footer.flex.justify-end>button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.wait(1000)
  })

  it('Verify dowloading using last run', function () {
    cy.login()
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        'div > div.p-0.m-0.w-100 > div > div > div:nth-child(2) > div > div:nth-child(4) > button'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.get('bl-wc-rlp-report')
      .shadow()
      .find(
        '.table.table-striped.mb-0>tbody>tr:nth-child(1)>td:nth-child(4)>div>span'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
  })
})
