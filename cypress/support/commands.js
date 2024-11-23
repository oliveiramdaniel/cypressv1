Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(){
    const description = 'Test,Test,Test,Test,Test,Test,Test,Test,Test'

    cy.get('#firstName').type('Daniel').should('have.value', 'Daniel');
    cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira');
    cy.get('#email').type('danielmoliveira@outlook.com').should('have.value', 'danielmoliveira@outlook.com');
    cy.get('select').select('Blog');
    cy.get('input[type="radio"][value="praise"]').check();
    cy.get('input[type="checkbox"][value="email"]').check();
    cy.get('#open-text-area').type(description, {delay: 0 })
    cy.contains('button', 'Submit').click().should('be.visible');

    cy.get('.success').should('be.visible')
})