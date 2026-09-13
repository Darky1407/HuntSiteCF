if (sessionStorage.getItem('stage3complete') !== 'true') {
  window.location.href = 'stage3.html';
}


const NAV_RIDDLE = "The final fragment does not hide. It waits where you last looked away.";

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
    answerBlock.classList.add('hidden');
    riddleText.textContent = NAV_RIDDLE;
    riddleBlock.classList.remove('hidden');
    sessionStorage.setItem('stage4complete', 'true');
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