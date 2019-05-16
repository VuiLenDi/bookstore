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
    cy.get('h1').should('contain', 'BookStore');
  });

  it('Addbook successfully', () => {

  })
});
