const NAV_RIDDLE = "It will not show itself, but it will answer those who ask. The second fragment waits beyond.";

const input = document.getElementById('answerInput');
const btn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const answerBlock = document.getElementById('answerBlock');
const riddleBlock = document.getElementById('riddleBlock');
const riddleText = document.getElementById('riddleText');

async function checkAnswer() {
  const value = input.value.trim().toLowerCase().replace(/\s+/g, ' ');

  const response = await fetch('/check-stage1', {
    method: 'POST',
    body: JSON.stringify({ answer: value }),
  });
  const data = await response.json();

  if (data.correct) {
    const username = localStorage.getItem('huntUsername');

    await fetch('/mark-complete', {
      method: 'POST',
      body: JSON.stringify({ username: username, stage: 'stage1' }),
    });

    answerBlock.classList.add('hidden');
    riddleText.textContent = NAV_RIDDLE;
    riddleBlock.classList.remove('hidden');
  } else {
    feedback.textContent = 'incorrect.';
  }
}

btn.addEventListener('click', checkAnswer);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkAnswer();
});

document.getElementById('nextStageBtn').addEventListener('click', function () {
  window.location.href = 'stage2.html';
});