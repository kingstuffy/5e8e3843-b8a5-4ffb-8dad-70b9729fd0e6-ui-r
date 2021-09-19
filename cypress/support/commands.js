Cypress.Commands.add('getDefaultProduct', () => {
  cy.request(Cypress.env('productUrl')).then(({body}) => {
    return body.data;
  });
});

Cypress.Commands.add('createRealTimeReview', () => {
  cy.request({
    url: Cypress.env('reviewUrl'),
    method: 'POST',
    body: {
      product: Cypress.env('defaultProductSlug'),
      rating: 4,
      text: 'Real time review',
    },
  }).then(({body}) => {
    return body.data;
  });
});

Cypress.Commands.add(
  'getInDocument',
  {prevSubject: 'document'},
  (document, selector) => Cypress.$(selector, document),
);
