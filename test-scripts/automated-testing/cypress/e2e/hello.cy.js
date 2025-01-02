describe('Temperature Conversion for the Teachers - Title Verification', () => {
  it('should display the correct title', () => {
    // Visit the application URL (replace with the actual URL of your app)
    cy.visit('http://student-temp-app-dev-lb-762622184.us-east-1.elb.amazonaws.com/temp-converter');
    cy.get('h1').should('have.text', 'Temperature Conversion for Teachers!');
  });
});

describe('Temperature Conversion UI Tests', () => {
  beforeEach(() => {
    // Visit your application page
    cy.visit('http://student-temp-app-dev-lb-762622184.us-east-1.elb.amazonaws.com/temp-converter') // Replace with your website URL
  });

  it('should accept integer input values in the input field', () => {
    cy.get('input[id="value"]') // Replace with actual input field selector
      .type('100')
      .should('have.value', '100');
  });

  it('should accept decimal input values in the input field', () => {
    cy.get('input[id="value"]') // Replace with actual input field selector
      .clear()
      .type('100.5')
      .should('have.value', '100.5');
  });

  it('should display all units in the "From Unit" dropdown', () => {
    // Define the expected units in the order they appear in the HTML
    const expectedUnits = ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'];
  
    // Select the "From Unit" dropdown and iterate over its children (the options)
    cy.get('select[id="fromUnit"]') // Use the id of the dropdown
      .children('option')  // Select all option elements inside the dropdown
      .each((option, index) => {
        // Ensure that each option contains the correct text value in the expected order
        cy.wrap(option).should('have.text', expectedUnits[index]);
      });
  });
  
  it('should display all units in the "To Unit" dropdown', () => {
    const expectedUnits = ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'];

    cy.get('select[id="toUnit"]') // Replace with actual To Unit dropdown selector
      .children()
      .each((option, index) => {
        cy.wrap(option).should('have.text', expectedUnits[index]);
      });
  });

  it('should accept integer values in the student response field', () => {
    cy.get('input[id="studentResponse"]') // Replace with actual student response input selector
      .type('212')
      .should('have.value', '212');
  });

  it('should accept decimal values in the student response field', () => {
    cy.get('input[id="studentResponse"]') // Replace with actual student response input selector
      .clear()
      .type('100.5')
      .should('have.value', '100.5');
  });

  it('should show "Correct" when the student response is accurate', () => {
    const inputValue = '100';
    const fromUnit = 'Celsius';
    const toUnit = 'Celsius';
    const studentResponse = '100';
  
    cy.wait(2000);
  
    // Input the temperature value
    cy.get('input[id="value"]', { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .type(inputValue)
      .should('have.value', inputValue);
  
    // Select units for conversion
    cy.get('select[id="fromUnit"]').select(fromUnit);
    cy.get('select[id="toUnit"]').select(toUnit);
  
    // Input the student response
    cy.get('input[id="studentResponse"]')
      .should('exist')
      .and('be.visible')
      .type(studentResponse)
      .should('have.value', studentResponse);
  
    // Click the submit button
    cy.get('button.submit-btn').should('exist').and('be.visible').click();
  
    // Verify the result message
    cy.get('#resultMessage', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Correct!');
  });

  it('should show "Incorrect" when the student response is accurate', () => {
    const inputValue = '317.33';
    const fromUnit = 'Kelvin';
    const toUnit = 'Fahrenheit';
    const studentResponse = '111.554';
  
    cy.wait(2000);
  
    // Input the temperature value
    cy.get('input[id="value"]', { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .type(inputValue)
      .should('have.value', inputValue);
  
    // Select units for conversion
    cy.get('select[id="fromUnit"]').select(fromUnit);
    cy.get('select[id="toUnit"]').select(toUnit);
  
    // Input the student response
    cy.get('input[id="studentResponse"]')
      .should('exist')
      .and('be.visible')
      .type(studentResponse)
      .should('have.value', studentResponse);
  
    // Click the submit button
    cy.get('button.submit-btn').should('exist').and('be.visible').click();
  
    // Verify the result message
    cy.get('#resultMessage', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Incorrect!');
  });
  
});