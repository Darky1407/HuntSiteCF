async function checkGate(requiredStage) {
  const username = localStorage.getItem('huntUsername');
  if (!username) {
    window.location.href = 'index.html';
    return;
  }
  const res = await fetch('/check-progress', {
    method: 'POST',
    body: JSON.stringify({ username: username, stage: requiredStage }),
  });
  const data = await res.json();
  if (!data.complete) {
    window.location.href = 'stage4.html';
  }
}
checkGate('stage5');

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
    const username = localStorage.getItem('huntUsername');

    await fetch('/mark-complete', {
      method: 'POST',
      body: JSON.stringify({ username: username, stage: 'final' }),
    });

    window.location.href = 'landing.html';
  } else {
    feedback.textContent = 'that is not what was hidden.';
  }
}

btn.addEventListener('click', checkAnswer);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkAnswer();
});