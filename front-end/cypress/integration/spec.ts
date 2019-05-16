/// <reference types="cypress" />

// Required for JIT in NG-7
import 'core-js/es7/reflect';

/* eslint-env mocha */
/* global cy */
describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('works', () => {
    cy.contains('Book Store').should('be.visible');
  });

  it('works again', () => {
    cy.contains('Book Store').should('be.visible');
  });
});
