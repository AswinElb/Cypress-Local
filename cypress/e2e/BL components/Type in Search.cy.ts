describe('Bl UI Components - BLUITypeInSearch', function () {
  it('Verify BL UI Type In Search', function () {
    cy.LaunchURLandLogin()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--docs')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //optionList
    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-minus-menu css-1vujydj"]:nth-child(5)')
      .scrollIntoView()
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#set-optionsList')
      .scrollIntoView()
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-plus-menu css-k52l0m"]')
      .scrollIntoView()
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-1trcvz8"]')
      .type('1')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-177mwmb"]')
      .type('Check 1')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-enyqhd"]')
      .click({ force: true })
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-plus-menu css-k52l0m"]')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-1trcvz8"]')
      .type('2')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-177mwmb"]')
      .type('Check 2')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-enyqhd"]')
      .click({ force: true })
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-plus-menu css-k52l0m"]')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-1trcvz8"]')
      .type('3')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-177mwmb"]')
      .type('Check 3')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-enyqhd"]')
      .click({ force: true })
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-plus-menu css-k52l0m"]')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-1trcvz8"]')
      .type('4')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-177mwmb"]')
      .type('Check 4')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-enyqhd"]')
      .click({ force: true })
    cy.wait(1000)

    cy.iframe('#storybook-preview-iframe')
      .find('[class="rejt-plus-menu css-k52l0m"]')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-1trcvz8"]')
      .type('5')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-177mwmb"]')
      .type('Check 5')
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('[class="css-enyqhd"]')
      .click({ force: true })
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //IsMoreDtaLoading
    cy.iframe('#storybook-preview-iframe')
      .find('#control-isMoreDataLoading')
      .should('be.visible')
      .click({ force: true })
    cy.Scrolltop
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-isMoreDataLoading')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)

    //Disabled
    cy.iframe('#storybook-preview-iframe')
      .find('#control-disabled')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true })
    cy.Scrolltop
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#control-disabled')
      .scrollIntoView()
      .click({ force: true })
    cy.wait(2000)

    //label
    cy.iframe('#storybook-preview-iframe')
      .find('#control-label')
      .scrollIntoView()
      .type('{backspace}')
      .clear()
      .type('Cyprss Automation')
    cy.wait(1000)
    cy.Scrolltop()
    cy.wait(1000)

    //MaxHeight
    cy.iframe('#storybook-preview-iframe')
      .find('#control-maxHeightPx')
      .should('be.visible')
      .type('{backspace}')
      .clear()
      .type('300')
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //AllOptionsSelectedtext
    cy.iframe('#storybook-preview-iframe')
      .find('#set-allOptionsSelectedText')
      .should('be.visible')
      .click({ force: true })
    cy.iframe('#storybook-preview-iframe')
      .find('#control-allOptionsSelectedText')
      .should('be.visible')
      .type('{backspace}')
      .clear()
      .type('Blue Lightning')
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //IsStatic
    cy.iframe('#storybook-preview-iframe')
      .find('#set-isStatic')
      .should('be.visible')
      .click({ force: true })
    cy.iframe('#storybook-preview-iframe').find('#control-isStatic').click()
    cy.wait(1000)
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //SortBy
    cy.iframe('#storybook-preview-iframe')
      .find('#control-sortBy')
      .select('Label')
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-sortBy')
      .select('Subtitle')
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //Placement
    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Top')
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    cy.iframe('#storybook-preview-iframe')
      .find('#control-placement')
      .select('Bottom')
    cy.Scrolltop()
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(2000)

    //unselectSingleItem
    cy.iframe('#storybook-preview-iframe')
      .find('#set-unselectSingleItem')
      .should('be.visible')
      .click({ force: true })
    cy.iframe('#storybook-preview-iframe')
      .find('#control-unselectSingleItem')
      .should('be.visible')
      .click({ force: true })
    cy.Scrolltop
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > label > input'
      )
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='story--components-type-in-search--default--primary-inner']/div/div/div/div[1]/div/div[3]/div[1]/input"
      )
      .click({ force: true })
    cy.iframe('#storybook-preview-iframe')
      .xpath(
        "//*[@id='story--components-type-in-search--default--primary-inner']/div/div/div/div[1]/div/div[5]/div[1]/input"
      )
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#story--components-type-in-search--default--primary-inner')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find(
        '#story--components-type-in-search--default--primary-inner > div > div > div > div > div:nth-child(1) > div.tw-opacity-0.tw-transition-opacity.tw-duration-200 > span > i > svg'
      )
      .click({ force: true })
    cy.wait(2000)
  })

  //Default
  it('Verify Default Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--default')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.wait(1000)
  })

  //Static Dropdown
  it('Verify Static Dropdown Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--static-dropdown')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.wait(1000)
  })

  //Sorted By Subtitle
  it('Verify Sorted By Subtitle Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--sorted-by-subtitle')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > div> button')
      .click({ force: true })
    cy.wait(1000)
  })

  //Unselect Single Item
  it('Verify Unselect Single Item Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--unselect-single-item')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.wait(1000)
  })

  //With All Options Selected Text
  it('Verify With All Options Selected Text Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--with-all-options-selected-text')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.wait(1000)
  })

  //Custom Max Height
  it('Verify Custom Max Height Tab', function () {
    cy.Reload()
    cy.get('#components-type-in-search')
      .should('be.visible')
      .click({ force: true })
    cy.wait(2000)
    cy.get('#components-type-in-search--custom-max-height')
      .should('be.visible')
      .click({ force: true })
    cy.wait(1000)
    cy.iframe('#storybook-preview-iframe')
      .find('#storybook-root > div > div > div > label > input')
      .click({ force: true })
    cy.wait(1000)
  })
})
