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
    window.location.href = 'stage1.html';
  } else {
    document.getElementById('stage2Content').style.display = 'flex';
  }
}
checkGate('stage1');

const NAV_RIDDLE = "Sound carries more than it says. The third fragment rides beneath it.";
window.reveal = function () {
  const codes = [88, 69, 78, 79, 76, 73, 84, 72];
  const word = String.fromCharCode(...codes);
  console.log('%c' + word, 'color: #999; font-size: 20px; letter-spacing: 4px;');
  return word;
};

const input = document.getElementById('answerInput');
const btn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const answerBlock = document.getElementById('answerBlock');
const riddleBlock = document.getElementById('riddleBlock');
const riddleText = document.getElementById('riddleText');

async function checkAnswer() {
  const value = input.value.trim().toLowerCase().replace(/\s+/g, ' ');

  const response = await fetch('/check-stage2', {
    method: 'POST',
    body: JSON.stringify({ answer: value }),
  });
  const data = await response.json();

  if (data.correct) {
    const username = localStorage.getItem('huntUsername');

    await fetch('/mark-complete', {
      method: 'POST',
      body: JSON.stringify({ username: username, stage: 'stage2' }),
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
  window.location.href = 'stage3.html';
});