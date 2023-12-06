describe('BL UI Components - BLUITimePicker', function () {
  it('Verify Selected Time', function () {
    cy.LaunchURLandLogin()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-timepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div > div > svg'
      )
      .should('be.visible')
      .click({ force: true })
    //Increase
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div:nth-child(1) > svg'
      )
      .click()
      .click()
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="dp__action_button dp__action_select"]')
      .should('be.visible')
      .click({ force: true })
    cy.Scrolltop()

    //Time Change Decrease
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div > div > svg:nth-child(2)'
      )
      .should('be.visible')
      .click({ multiple: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div:nth-child(3) > svg'
      )
      .click()
      .click()
    cy.Scrolltop()
    cy.wait(1000)
    //Cancel button
    cy.iframe('#storybook-preview-iframe')
      .find('[class="dp__action_button dp__action_cancel"]')
      .should('be.visible')
      .click({ force: true })
    cy.Scrolltop()
  })

  it('Verify BL UI TimePicker', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-timepicker--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //verify enableseconds
    cy.iframe('#storybook-preview-iframe')
      .find('#set-enableSeconds')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-enableSeconds')
      .should('be.visible')
      .click()
    cy.wait(2000)
    cy.Scrolltop()
    //Time icon
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div > div > svg'
      )
      .should('be.visible')
      .click({ force: true })

    //Verify is24
    cy.iframe('#storybook-preview-iframe')
      .xpath("//*[@id='set-is24']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-is24')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    //Time icon
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='story--components-timepicker--default--primary-inner']/div/div/div/div/input"
      )
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    for (let n = 0; n < 23; n++) {
      cy.iframe('#storybook-preview-iframe')
        .find(
          '#story--components-timepicker--default--primary-inner > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div:nth-child(1) > svg'
        )
        .click()
    }
    cy.iframe('#storybook-preview-iframe')
      .find('#control-is24')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Verify placeholder
    cy.iframe('#storybook-preview-iframe')
      .find('#set-placeholder')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-placeholder')
      .type('Automation Time')
    cy.wait(1000)
    cy.Scrolltop()
    cy.wait(2000)

    //Verify clearable
    cy.iframe('#storybook-preview-iframe')
      .find('#set-clearable')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-clearable')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Time icon
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-timepicker--default--primary-inner > div > div > div:nth-child(1) > div > svg'
      )
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    //AM or PM
    cy.iframe('#storybook-preview-iframe')
      .find('.dp__pm_am_button')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.wait(2000)
  })

  //Verify the TimePicker Tabs
  //Default
  it('Verify Default Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-timepicker--default')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div:nth-child(1) > div > svg')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='storybook-root']/div/div/div[2]/div/div[3]/div[2]/button[2]"
      )
      .click()
    cy.wait(2000)
  })

  //With Seconds Enable
  it('Verify With Seconds Enabled Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-timepicker--with-seconds-enabled')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div:nth-child(1) > div > svg')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='storybook-root']/div/div/div[2]/div/div[3]/div[2]/button[2]"
      )
      .click()
    cy.wait(2000)
  })

  //With 24Hrs Format
  it('Verify With 24Hrs Format', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-timepicker--with-24-hour-format')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div:nth-child(1) > div > svg')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='storybook-root']/div/div/div[2]/div/div[3]/div[2]/button[2]"
      )
      .click()
    cy.wait(2000)
  })

  //With Placeholder
  it('Verify With Placeholder', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-timepicker']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-timepicker--with-placeholder')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div:nth-child(1) > div > svg')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='storybook-root']/div/div/div[2]/div/div[3]/div[2]/button[2]"
      )
      .click()
    cy.wait(2000)
  })
})
