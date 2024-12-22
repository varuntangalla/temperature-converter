const request = require('supertest');
const app = require('./server');  // Import the Express app from server.js

describe('Temperature Conversion API', () => {
  
  // Test for valid conversion
  test('should convert Fahrenheit to Celsius', async () => {
    const response = await request(app)
      .post('/temp-converter/api/convert')
      .send({
        value: 32,
        fromUnit: 'Fahrenheit',
        toUnit: 'Celsius'
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });

  // Test for invalid conversion (missing parameters)
  test('should return 400 for missing parameters', async () => {
    const response = await request(app)
      .post('/temp-converter/api/convert')
      .send({
        value: 32,
        fromUnit: 'Fahrenheit'
        // missing 'toUnit'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid input parameters');
  });

  // Test for invalid temperature unit
  test('should return 400 for invalid input unit', async () => {
    const response = await request(app)
      .post('/temp-converter/api/convert')
      .send({
        value: 100,
        fromUnit: 'InvalidUnit', // Invalid unit
        toUnit: 'Celsius'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid input unit');
  });

  // Test for valid check-answer
  test('should check if student response is correct', async () => {
    const response = await request(app)
      .post('/temp-converter/api/check-answer')
      .send({
        studentResponse: 32,  // Student's answer
        value: 0,             // Convert 0 Celsius to Fahrenheit
        fromUnit: 'Celsius',
        toUnit: 'Fahrenheit'
      });

    expect(response.status).toBe(200);
    expect(response.body.isCorrect).toBe(true);
    expect(response.body.correctAnswer).toBe(32);
  });

  // Test for incorrect check-answer
  test('should check if student response is incorrect', async () => {
    const response = await request(app)
      .post('/temp-converter/api/check-answer')
      .send({
        studentResponse: 30,  // Incorrect response
        value: 0,             // Convert 0 Celsius to Fahrenheit
        fromUnit: 'Celsius',
        toUnit: 'Fahrenheit'
      });

    expect(response.status).toBe(200);
    expect(response.body.isCorrect).toBe(false);
    expect(response.body.correctAnswer).toBe(32);
  });

  // Test for invalid check-answer parameters (missing values)
  test('should return 400 for invalid parameters in check-answer', async () => {
    const response = await request(app)
      .post('/temp-converter/api/check-answer')
      .send({
        studentResponse: 32,
        value: 32,
        fromUnit: 'Celsius',
        // missing 'toUnit'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid input parameters');
  });

});