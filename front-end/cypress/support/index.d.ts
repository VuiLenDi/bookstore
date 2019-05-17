/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    addBookCommand(title: string, description: string): Chainable<any>;
  }
}
