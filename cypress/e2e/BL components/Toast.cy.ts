describe('BL UI Components - BLUIToast', function () {
  it('Verify BL UI Toast', function () {
    cy.LaunchURLandLogin()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--docs')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-toast--default--primary-inner > button:nth-child(1)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //close toast
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-toast--default--primary-inner > button:nth-child(2)'
      )
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Default
  it('Verify Default Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-toast--default']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Manual close
  it('Verify Manual Close Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--manual-close')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Warning Type
  it('Verify Warning Type Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--warning-type')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Success Type
  it('Verify Success Type Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--success-type')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Info Type
  it('Verify Info Type Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--info-type')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Error Type
  it('Verify Error Type Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--error-type')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Bottom Left
  it('Verify Bottom Left Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--bottom-left')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Changed Timeout
  it('Verify Changed Timeout Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-toast']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-toast--changed-timeout')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //open toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(1)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    //Close toast
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > button:nth-child(2)')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })
})
