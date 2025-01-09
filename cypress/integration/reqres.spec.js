describe('ReqRes API Testing Suite', () => {
  const baseUrl = Cypress.env('API_BASE_URL') || 'https://reqres.in/api';

  before(() => {
    cy.log('Starting the ReqRes API Test Suite');
  });

  after(() => {
    cy.log('Completed the ReqRes API Test Suite');
  });

  describe('User Endpoints', () => {
    it('Fetches a single user by ID', () => {
      cy.request('GET', `${baseUrl}/users/2`).then((response) => {
        expect(response.status, 'Status should be 200').to.eq(200);
        expect(response.body.data).to.include.keys('id', 'email', 'first_name', 'last_name');
      });
    });

    it('Handles request for a non-existent user', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, 'Status should be 404').to.eq(404);
      });
    });
  });

  describe('Resource Endpoints', () => {
    it('Fetches a list of resources', () => {
      cy.request('GET', `${baseUrl}/unknown`).then((response) => {
        expect(response.status, 'Status should be 200').to.eq(200);
        expect(response.body.data, 'Data should be a non-empty array').to.be.an('array').and.not.to.be.empty;
      });
    });

    it('Fetches a single resource by ID', () => {
      cy.request('GET', `${baseUrl}/unknown/2`).then((response) => {
        expect(response.status, 'Status should be 200').to.eq(200);
        expect(response.body.data).to.include.keys('id', 'name', 'year', 'color', 'pantone_value');
      });
    });

    it('Handles request for a non-existent resource', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/unknown/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, 'Status should be 404').to.eq(404);
      });
    });
  });

  describe('Login', () => {
    it('Logs in successfully with valid credentials', () => {
      const credentials = { email: 'eve.holt@reqres.in', password: 'cityslicka' };

      cy.request('POST', `${baseUrl}/login`, credentials).then((response) => {
        expect(response.status, 'Status should be 200').to.eq(200);
        expect(response.body).to.include.keys('token');
      });
    });

    it('Fails to log in with missing password', () => {
      const credentials = { email: 'eve.holt@reqres.in' };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: credentials,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, 'Status should be 400').to.eq(400);
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });

    it('Fails to log in with invalid credentials', () => {
      const credentials = { email: 'invalid.email@example.com', password: 'wrongpassword' };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: credentials,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, 'Status should be 400').to.eq(400);
        expect(response.body).to.have.property('error', 'user not found');
      });
    });
  });

  describe('Delayed Response', () => {
    it('Handles delayed response successfully', () => {
      cy.request('GET', `${baseUrl}/users?delay=3`).then((response) => {
        expect(response.status, 'Status should be 200').to.eq(200);
        expect(response.body.data, 'Data should be a non-empty array').to.be.an('array').and.not.to.be.empty;
      });
    });
  });
});
