// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command that adds two given numbers
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestAPI(query: string): any
  }
}
