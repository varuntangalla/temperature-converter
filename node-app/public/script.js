// script.js
const submit = async () => {
  const value = parseFloat(document.getElementById('value').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const studentResponse = parseFloat(document.getElementById('studentResponse').value);

  if (isNaN(value) || isNaN(studentResponse)) {
    alert('Please provide valid numbers for all fields.');
    return;
  }

  // Check answer
  const response = await fetch('/temp-converter/api/check-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value, fromUnit, toUnit, studentResponse })
  });

  const data = await response.json();
  
  const resultMessage = document.getElementById('resultMessage');
  const correctAnswer = document.getElementById('correctAnswer');
  const correctGif = document.getElementById('correctGif');
  const incorrectGif = document.getElementById('incorrectGif');

  // Hide the GIFs initially
  correctGif.style.display = 'none';
  incorrectGif.style.display = 'none';

  if (data.isCorrect) {
    resultMessage.innerText = 'Correct!';
    correctGif.style.display = 'block';  // Show the correct answer GIF
    correctAnswer.style.display = 'none'; // Hide the correct answer text
  } else {
    resultMessage.innerText = 'Incorrect!';
    correctGif.style.display = 'none';  // Hide the correct answer GIF
    incorrectGif.style.display = 'block'; // Show the incorrect answer GIF
    correctAnswer.innerText = `The correct answer is: ${data.correctAnswer.toFixed(2)} ${toUnit}`;
    correctAnswer.style.display = 'block'; // Show the correct answer text
  }
};
