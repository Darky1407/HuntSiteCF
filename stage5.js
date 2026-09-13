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
  } else {
    document.getElementById('stage5Content').style.display = 'flex';
  }
}
checkGate('stage4');

document.getElementById('continueBtn').addEventListener('click', async function () {
  const username = localStorage.getItem('huntUsername');

  await fetch('/mark-complete', {
    method: 'POST',
    body: JSON.stringify({ username: username, stage: 'stage5' }),
  });

  window.location.href = 'poem.html';
});