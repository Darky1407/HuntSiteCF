if (sessionStorage.getItem('stage4complete') !== 'true') {
  window.location.href = 'stage4.html';
}

const input = document.getElementById('answerInput');
const btn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');

async function checkAnswer() {
  const value = input.value.trim().toLowerCase().replace(/\s+/g, ' ');

  const response = await fetch('/check-final', {
    method: 'POST',
    body: JSON.stringify({ answer: value }),
  });
  const data = await response.json();

  if (data.correct) {
    sessionStorage.setItem('finalcomplete', 'true');
    window.location.href = 'landing.html';
  } else {
    feedback.textContent = 'that is not what was hidden.';
  }
}

btn.addEventListener('click', checkAnswer);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkAnswer();
});