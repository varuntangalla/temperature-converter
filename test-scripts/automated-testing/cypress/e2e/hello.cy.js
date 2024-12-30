describe('Temperature Conversion for the Teachers - Title Verification', () => {
    it('should display the correct title', () => {
      // Visit the application URL (replace with the actual URL of your app)
      cy.visit('http://student-temp-app-dev-lb-813446244.us-east-1.elb.amazonaws.com/temp-converter/'); 
      cy.get('h1').should('have.text', 'Temperature Conversion for Teachers!');
    });
  });
  