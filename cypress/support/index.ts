declare namespace Cypress {
    interface Chainable {
      getIframe(iframe: any): Chainable<Element>
      Reload: any
      login: any
      LaunchURLandLogin: any
      Scrolltop: any
      xpath: any
      drag: any
    }
    interface Chainable<Subject> {
      parallel(funcs: Array<(...args: any[]) => unknown>): Chainable<Subject>
    }
}