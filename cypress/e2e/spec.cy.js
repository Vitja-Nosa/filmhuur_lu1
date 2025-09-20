describe('Customer CRUD', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl + '/auth/login');
    cy.get('input[name="email"]').type('Mike.Hillyer@sakilastaff.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', baseUrl + '/customers');
  });

  it('should show the customer list', () => {
    cy.get('h5').contains('Customers');
    cy.get('table').should('exist');
  });

  it('should show the create customer form', () => {
    cy.contains('Create Customer').click();
    cy.url().should('include', baseUrl + '/customers/create');
    cy.get('form').should('exist');
    cy.get('input[name="first_name"]').should('exist');
  });

  it('should create a new customer with valid data', () => {
    cy.contains('Create Customer').click();
    cy.get('input[name="first_name"]').type('TestFirst');
    cy.get('input[name="last_name"]').type('TestLast');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="address"]').type('Test Address');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="district"]').type('Test District');
    cy.get('input[name="postal_code"]').type('12345');
    cy.get('select[name="store_id"]').select(1);
    cy.get('select[name="city_id"]').select(1);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', baseUrl + '/customers');
    cy.get('.alert-success').should('exist');
  });

  it('should show the edit customer form', () => {
    cy.get('a.btn-outline-secondary').first().click();
    cy.url().should('include', baseUrl + '/customers/edit');
    cy.get('form').should('exist');
    cy.get('input[name="first_name"]').should('exist');
  });

  it('should delete a customer', () => {
    cy.get('form[action^="/customers/delete/"]').first().within(() => {
      cy.get('button[type="submit"]').click();
    });
    cy.get('.alert-success').should('exist');
  });
});