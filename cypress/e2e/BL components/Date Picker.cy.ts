describe('BL UI Components - BLUIDatePicker', function () {
  it('Verify BL UI DatePicker', function () {
    cy.LaunchURLandLogin()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-datepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //isRange
    cy.iframe('#storybook-preview-iframe')
      .find('#control-isRange')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > svg'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div.dp__calendar > div > div > div > div:nth-child(4) > div:nth-child(3) > div'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div.dp__calendar > div:nth-child(5) > div:nth-child(5) > div'
      )
      .click()
    cy.wait(1000)
    cy.Scrolltop()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-isRange')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //Dateformat
    cy.iframe('#storybook-preview-iframe')
      .find('#control-dateFormat')
      .type('{backspace}')
      .clear()
      .type('MM/dd/yyyy')
    cy.wait(1000)
    cy.Scrolltop()

    //mondayfirst
    cy.reload()
    cy.xpath("//*[@id='components-datepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-mondayFirst')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > svg'
      )
      .click()
    cy.wait(1000)

    //timepicker
    cy.reload()
    cy.xpath("//*[@id='components-datepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find('#set-timePicker')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-timePicker')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > svg'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div> div > div:nth-child(2) > div > div:nth-child(2) > div > div > svg'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '[class="dp__time_col dp__time_col_reg"]:nth-child(3)>div:nth-child(1)>svg'
      )
      .click()
      .click()
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        ' div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div.dp__overlay > div > div.dp__button.dp__button_bottom > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Autoapply
    cy.reload()
    cy.xpath("//*[@id='components-datepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe').find('#set-autoApply').click()
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div > div > svg'
      )
      .click()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-datepicker--default--primary-inner > div > div > div> div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="dp__action_button dp__action_select"]')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-autoApply')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //clearable
    cy.iframe('#storybook-preview-iframe').find('#set-clearable').click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-clearable')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        'div > div.dp__main.dp__theme_light > div > div > svg.dp__icon.dp__clear_icon.dp__input_icons'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //initialdate
    cy.iframe('#storybook-preview-iframe')
      .find('#control-initialDate-date')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-initialDate-time')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
  })

  //Default
  it('Verify Default Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-datepicker--default')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div.dp__main.dp__theme_light > div > div > svg:nth-child(2)'
      )
      .click()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div> div.dp__outer_menu_wrap > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(4) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(2000)
  })

  //Range Picker
  it('Verify Range Picker Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-datepicker--range-picker')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div.dp__main.dp__theme_light > div > div > svg:nth-child(2)'
      )
      .click()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(3) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(5) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(2000)
  })

  //With Custom Date Format
  it('Verify With Custom Date Format Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-datepicker--with-custom-date-format')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div.dp__main.dp__theme_light > div > div > svg:nth-child(2)'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(3) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(1000)
  })

  //With Monday First
  it('Verify With Monday First Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-datepicker--with-monday-first')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div.dp__main.dp__theme_light > div > div > svg:nth-child(2)'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(3) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(1000)
  })

  //Without Auto Apply
  it('Verify Without Auto Apply Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-datepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-datepicker--without-auto-apply')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div.dp__main.dp__theme_light > div > div > svg:nth-child(2)'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#storybook-root > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(3) > div:nth-child(6) > div'
      )
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="dp__action_button dp__action_select"]')
      .should('be.visible')
      .click({ force: true })
  })
})
