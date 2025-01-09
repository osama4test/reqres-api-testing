ReqRes API Testing Suite
This project contains a set of automated API tests for the ReqRes API using Cypress and Mocha. The suite covers multiple endpoints and scenarios, including user and resource retrieval, login functionality, and handling delayed responses.

Prerequisites
Before getting started, ensure that you have the following software installed:

- Node.js (LTS version recommended) - Install Node.js
- Git (for version control) - Install Git
- Cypress (for automated testing) - Install Cypress

Setup Instructions

1. Clone the Repository
First, clone the repository to your local machine using Git:

git clone https://github.com/osama4test/reqres-api-testing.git

2. Install Dependencies
Navigate to the project folder and install all the necessary dependencies:

cd reqres-api-testing
npm install
This will install all required dependencies, including Cypress and Mocha.

3. Test Execution
To run the tests in the project, you can use the following Cypress commands:

Open Cypress UI:
npx cypress open
This command will open the Cypress test runner in interactive mode, where you can select and run individual tests.

4. Test Reports
Once the tests are executed, Cypress will automatically generate a report of the results in the terminal. For more detailed reporting, you can configure additional reporting tools or plugins in your cypress.json configuration file.

Test Structure
The tests are organized as follows:

User Endpoints:

Fetch a single user by ID.
Handle requests for non-existent users.

Resource Endpoints:

Fetch a list of resources.
Fetch a single resource by ID.
Handle requests for non-existent resources.

Login:

Test valid login credentials.
Test missing password scenario.
Test invalid login credentials.

Delayed Response:

Handle requests with a delay parameter.
