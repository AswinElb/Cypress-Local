describe('Bl UI Components', function () {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
  it('Verify BL UI Tooltip', function () {
    //Launching URL and Login with valid credentials
    cy.LaunchURLandLogin()
    cy.get('#components-tooltip--docs')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)

    //Content
    cy.iframe('#storybook-preview-iframe')
      .find('#control-content')
      .type('{backspace}')
      .clear()
      .type('Cypress check')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-tooltip--default--primary-inner > div > div > div > div > button > span'
      )
      .scrollIntoView()
      .click()
    cy.wait(1000)

    //Heading
    cy.iframe('#storybook-preview-iframe')
      .xpath("//button[@id='set-heading']")
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-heading')
      .type('Cypress Automation')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-tooltip--default--primary-inner > div > div > div > div > button > span'
      )
      .scrollIntoView()
      .click()

    //placement
    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Top')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .click()

    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Bottom')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .click()

    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Left')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .scrollIntoView()
      .click()
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Right')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .scrollIntoView()
      .click()
    cy.wait(1000)

    //Verify Theme
    cy.iframe('#storybook-preview-iframe').find('#control-theme').select('Dark')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .scrollIntoView()
      .click()
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-theme')
      .select('Light')
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        '//*[@id="story--components-tooltip--default--primary-inner"]/div/div/div/div/button/span'
      )
      .scrollIntoView()
      .click()
    cy.wait(1000)
  })

  //Verify the Tooltip Tabs
  //Default

  it('Verify Default Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--default')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Bottom
  it('Verify Bottom Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--bottom')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //left
  it('Verify left Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--left')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Right
  it('Verify Right Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--right')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Light theme
  it('Verify Light Theme Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--light-theme')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Light Bottom
  it('Verify Light Bottom Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--light-bottom')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Light left
  it('Verify Light Left Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--light-left')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //Light right
  it('Verify Light Right Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--light-right')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //With-Heading
  it('Verify With-Heading Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--with-heading')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div > button')
      .click({ force: true })
    cy.wait(2000)
  })

  //light with heading
  it('Verify Light With Heading Tab', function () {
    cy.Reload()
    cy.get('#components-tooltip--light-with-heading')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath("//*[@id='storybook-root']/div/div/div/div/button")
      .click({ force: true })
    cy.wait(2000)
  })
})
