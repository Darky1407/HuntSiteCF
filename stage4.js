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
    window.location.href = 'stage3.html';
  } else {
    document.getElementById('stage4Content').style.display = 'flex';
  }
}
checkGate('stage3');

const NAV_RIDDLE = "The search is over. Now it only has to give.";

const input = document.getElementById('answerInput');
const btn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const answerBlock = document.getElementById('answerBlock');
const riddleBlock = document.getElementById('riddleBlock');
const riddleText = document.getElementById('riddleText');

async function checkAnswer() {
  const value = input.value.trim().toLowerCase().replace(/\s+/g, ' ');

  const response = await fetch('/check-stage4', {
    method: 'POST',
    body: JSON.stringify({ answer: value }),
  });
  const data = await response.json();

  if (data.correct) {
    const username = localStorage.getItem('huntUsername');

    await fetch('/mark-complete', {
      method: 'POST',
      body: JSON.stringify({ username: username, stage: 'stage4' }),
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
  window.location.href = 'stage5.html';
});