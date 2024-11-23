/// <reference types="Cypress" />

describe('Customer Service Center TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('check the application Title', function() {
        //Check if the title is equal
        cy.title().should('be.equal', 'Customer Service Center TAT')
    })

    it('Fill in the required fields and submit the form', function() {
        const description = 'Test,Test,Test,Test,Test,Test,Test,Test,Test'

        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel');
        cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira');
        cy.get('#email').type('danielmoliveira@outlook.com').should('have.value', 'danielmoliveira@outlook.com');
        cy.get('select').select('Blog');
        cy.get('input[type="radio"][value="praise"]').check();
        cy.get('input[type="checkbox"][value="email"]').check();
        cy.get('#open-text-area').type(description, {delay: 0 })
        cy.contains('button', 'Submit').click();

        cy.get('.success').should('be.visible')
    })


    it('displays error message when submitting the form with an email with invalid formatting', function() {
        
        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel');
        cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira');
        cy.get('#email').type('danielmoliveira@outlook,com');
        cy.get('select').select('Blog');
        cy.get('input[type="radio"][value="praise"]').check();
        cy.get('input[type="checkbox"][value="email"]').check();
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Submit').click();

        cy.get('.error').should('be.visible')
    })

    it('phone field remains empty when filled with non-numeric value', function() {
        cy.get('#phone')
            .type('abcddsadsad')
            .should('have.value', '')
    })

    it('error when the phone number becomes mandatory but is not filled in before submitting the form', function() {
        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel');
        cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira');
        cy.get('#email').type('danielmoliveira@outlook.com');
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Submit').click();

        cy.get('.error').should('be.visible')
    })

    it('fills and clears the name, surname, email and telephone fields', function() {
        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel').clear().should('have.value','')
        cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira').clear().should('have.value','')
        cy.get('#email').type('danielmoliveira@outlook.com').clear().should('have.value','')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('1234567').clear().should('have.value','')
        cy.contains('button', 'Submit').click().should('be.visible');

        cy.get('.error').should('be.visible')
    })

    it('error submitting the form without filling in the required fields', function() {
        cy.contains('button', 'Submit').click().should('be.visible');

        cy.get('.error').should('be.visible')
    })

    it('successfully submit the form using a custom command', function() {
        cy.fillMandatoryFieldAndSubmit()

        cy.get('.success').should('be.visible')

    })

  })