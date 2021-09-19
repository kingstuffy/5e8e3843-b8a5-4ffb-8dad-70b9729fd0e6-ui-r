const TEST_RATING = 3;
const TEST_RATING_TEXT = 'Test Text';

describe('Home', () => {
  it('should list product details and reviews', () => {
    cy.getDefaultProduct().as('product');

    cy.get('@product').then((product) => {
      cy.visit('/')
        .get('[data-cy="product-name"]')
        .contains(product.name)
        .get('[data-cy="product-average-rating"]')
        .contains(product.averageRating)
        .get(product.reviews)
        .each((review) => {
          cy.get(`[data-cy="review-item-${review.id}"]`)
            .get('[data-cy="review-rating"]')
            .contains(review.rating)
            .get('[data-cy="review-text"]')
            .then(($text) => {
              if (review.text) {
                cy.wrap($text).contains(review.text);
              }
            });
        });
    });
  });

  it('should add review and populate list', () => {
    cy.intercept({
      method: 'POST',
      url: Cypress.env('reviewUrl'),
    }).as('newReview');

    cy.visit('/')
      .get('[data-cy="open-review-modal-button"]')
      .click()
      .get('[data-cy="review-form"]')
      .should('exist')
      .get('[data-cy="submit-review-button"]')
      .click()
      .get('[data-cy="ratings-error"]')
      .should('exist')
      .get(`[data-cy="ratings-button-${TEST_RATING}"]`)
      .first()
      .click()
      .get('[data-cy="ratings-error"]')
      .should('not.exist')
      .get('[data-cy="review-form-text"]')
      .type(TEST_RATING_TEXT)
      .get('[data-cy="submit-review-button"]')
      .click()
      .wait('@newReview')
      .get('@newReview')
      .then((newReview) => {
        cy.get(
          `[data-cy="review-item-${newReview.response.body.data.review.id}"]`,
        )
          .should('exist')
          .within(() => {
            cy.get('[data-cy="review-rating"]')
              .contains(TEST_RATING)
              .get('[data-cy="review-text"]')
              .contains(TEST_RATING_TEXT);
          });
      });
  });

  it('should receive real time review', () => {
    cy.intercept(Cypress.env('productUrl')).as('newReview');

    cy.visit('/')
      .createRealTimeReview()
      .as('realTimeReview')
      .wait('@newReview')
      .get('@realTimeReview')
      .then((newReview) => {
        cy.get(`[data-cy="review-item-${newReview.review.id}"]`).should(
          'exist',
        );
      });
  });
});
