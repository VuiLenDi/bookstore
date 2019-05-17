/// <reference types="cypress" />

// Required for JIT in NG-7
import 'core-js/es7/reflect';

/* eslint-env mocha */
/* global cy */
describe('BookStore', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('has a heading', () => {
    cy.get('h1').should('contain', 'Book Store');
  });

  describe('AddBook Form should be invalid', () => {
    it('Missing input for title', () => {
      cy.get('#mat-select-0')
        .click()
        .then(() => {
          cy.get('#mat-option-0').click();
        });
      cy.get('#mat-input-1').type('Lorem Ipsum');
      cy.get('button.addbook-button')
        .contains('Add')
        .click()
        .then(() => {
          cy.get('form').should('have.class', 'ng-invalid');
        });
    });

    it('Missing description for title', () => {
      cy.get('#mat-input-0').type('Subtile');
      cy.get('#mat-select-0')
        .click()
        .then(() => {
          cy.get('#mat-option-0').click();
        });

      cy.get('button.addbook-button')
        .contains('Add')
        .click()
        .then(() => {
          cy.get('form').should('have.class', 'ng-invalid');
        });
    });
  });

  it('Addbook successfully', () => {
    cy.addBookCommand('Title: The subtle art of not giving a', 'Lorem Ipsum');

    cy.get('ul li')
      .its('length')
      .then(length => {
        cy.get('button.addbook-button')
          .contains('Add')
          .click();

        cy.wait(1000).then(() => {
          cy.get('ul li')
            .its('length')
            .should('be.greaterThan', length);
        });
      });
  });
});
