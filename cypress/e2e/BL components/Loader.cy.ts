describe('BL UI Components - BLUILoader', function () {
  it.only('Verify BL UI Loader', function () {
    cy.LaunchURLandLogin()
    cy.xpath("//*[@id='components-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-loader--docs']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Verify Small
    cy.iframe('#storybook-preview-iframe')
      .find('#set-small')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-small')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    //Zoom
    //    cy.iframe('#storybook-preview-iframe').find('#anchor--components-loader--default > div > div.css-l1e2yg > div > div > button:nth-child(1) > svg')
    //    .click().click().click().click().click()

    //Verify Color
    cy.iframe('#storybook-preview-iframe').find('#control-color').select('Blue')
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#anchor--components-loader--default > div > div.css-l1e2yg > div > div > button:nth-child(1) > svg'
      )
      .scrollIntoView()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-color')
      .select('Gray (Default)')
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#anchor--components-loader--default > div > div.css-l1e2yg > div > div > button:nth-child(1) > svg'
      )
      .scrollIntoView()
    cy.wait(2000)
  })

  //Verify the Loader Tabs
  //Default
  it.only('Verify Default Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-loader--default']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Small
  it.only('Verify Small Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-loader--small']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Blue Loader
  it.only('Verify Blue Loader Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-loader--blue-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })

  //Blue Small
  it.only('Verify Blue Small Tab', function () {
    cy.Reload()
    cy.xpath("//*[@id='components-loader']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.xpath("//*[@id='components-loader--blue-small']")
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
  })
})
