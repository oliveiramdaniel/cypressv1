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

//03

    it('select a product (YouTube) by its text', function() {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('select a product (Mentoring) for its value (value)', function() {
        cy.get('#product').select('mentorship').should('have.value','mentorship')
    })

    it('select a product (Blog) by its index', function() {
        cy.get('#product').select(1).should('have.value','blog')
    })

//04
    it('mark the type of service "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('mark each type of service"', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

//05
    it('check both checkboxes, then uncheck the last one', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('error when the phone number becomes mandatory but is not filled in before submitting the form', function() {
        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel');
        cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira');
        cy.get('#email').type('danielmoliveira@outlook.com');
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Submit').click();

        cy.get('.error').should('be.visible')
    })

//06

    it('select a file from the fixtures folder', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('select a file by simulating a drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('selects a file using a fixture given an alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json') 
        })
    })

    //07
    it('checks that the privacy policy opens in another tab without the need for a click', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it.only('accesses the privacy policy page by removing the target and then clicking on the link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('CAC TAT - Privacy Policy').should('be.visible')
    })

    it('tests the privacy policy page independently', function() {

    })

  })