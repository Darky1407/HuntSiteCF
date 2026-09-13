const audio = document.getElementById('introAudio');

if (!localStorage.getItem('introPlayed')) {
  audio.play().catch(function () {
  });
  localStorage.setItem('introPlayed', 'true');
}

async function checkStage5Complete() {
  const username = localStorage.getItem('huntUsername');
  if (!username) return;

  const res = await fetch('/check-progress', {
    method: 'POST',
    body: JSON.stringify({ username: username, stage: 'stage5' }),
  });
  const data = await res.json();

  if (data.complete) {
    document.getElementById('finalLink').classList.remove('hidden');
  }
}
checkStage5Complete();

document.getElementById('finalBtn').addEventListener('click', function () {
  window.location.href = 'final.html';
});

document.getElementById('continueBtn').addEventListener('click', function () {
  window.location.href = 'stage1.html';
});