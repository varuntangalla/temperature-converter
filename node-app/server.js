const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Temperature conversion logic
const convertTemperature = (value, fromUnit, toUnit) => {
  let tempInCelsius;

  // Convert to Celsius based on the input unit
  switch (fromUnit) {
    case 'Celsius':
      tempInCelsius = value;
      break;
    case 'Fahrenheit':
      tempInCelsius = (value - 32) * (5 / 9);
      break;
    case 'Kelvin':
      tempInCelsius = value - 273.15;
      break;
    case 'Rankine':
      tempInCelsius = (value - 491.67) * (5 / 9);
      break;
    default:
      throw new Error('Invalid input unit');
  }

  // Convert from Celsius to the target unit
  switch (toUnit) {
    case 'Celsius':
      return tempInCelsius;
    case 'Fahrenheit':
      return (tempInCelsius * (9 / 5)) + 32;
    case 'Kelvin':
      return tempInCelsius + 273.15;
    case 'Rankine':
      return (tempInCelsius + 273.15) * (9 / 5);
    default:
      throw new Error('Invalid target unit');
  }
};

const validateAnswer = (studentResponse, correctAnswer) => {
  const roundedStudentResponse = Math.round(studentResponse * 10) / 10;
  const roundedCorrectAnswer = Math.round(correctAnswer * 10) / 10;
  return studentResponse === correctAnswer;
};

// Create a router for /temp-converter
const tempConverter = express.Router();

// API endpoint to convert temperatures under /temp-converter
tempConverter.post('/api/convert', (req, res) => {
  const { value, fromUnit, toUnit } = req.body;
  if (typeof value !== 'number' || !fromUnit || !toUnit) {
    return res.status(400).json({ error: 'Invalid input parameters' });
  }

  try {
    const result = convertTemperature(value, fromUnit, toUnit);
    res.json({ result: Math.round(result * 10) / 10 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// API endpoint to check the student answer under /temp-converter
tempConverter.post('/api/check-answer', (req, res) => {
  const { studentResponse, value, fromUnit, toUnit } = req.body;
  if (typeof studentResponse !== 'number' || typeof value !== 'number' || !fromUnit || !toUnit) {
    return res.status(400).json({ error: 'Invalid input parameters' });
  }

  try {
    const correctAnswer = convertTemperature(value, fromUnit, toUnit);
    const isCorrect = validateAnswer(studentResponse, correctAnswer);
    const roundedCorrectAnswer = Math.round(correctAnswer * 100) / 100; // Rounded to two decimal places
    res.json({
      isCorrect,
      correctAnswer: roundedCorrectAnswer
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Use /temp-converter as the base route for all API routes
app.use('/temp-converter', tempConverter);

// Serve static files (if needed) under /temp-converter endpoint
app.use('/temp-converter', express.static('public'));

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/temp-converter`);
  });
}

// Export app for testing
module.exports = app;