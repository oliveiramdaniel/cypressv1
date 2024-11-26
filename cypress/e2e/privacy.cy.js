    Cypress._.times(5, function() {
        it.only('tests the privacy policy page independently', function() {
            cy.visit('./src/privacy.html')
        })
    })