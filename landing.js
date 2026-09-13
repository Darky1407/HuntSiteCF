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
    window.location.href = 'final.html';
  }
}
checkGate('final');

const nameInput = document.getElementById('nameInput');
const nameSubmitBtn = document.getElementById('nameSubmitBtn');
const nameBlock = document.getElementById('nameBlock');
const thanksMsg = document.getElementById('thanksMsg');

nameSubmitBtn.addEventListener('click', async function () {
  const name = nameInput.value.trim();
  if (!name) return;

  await fetch('/notify-complete', {
    method: 'POST',
    body: JSON.stringify({ name: name, time: new Date().toISOString() }),
  }).catch(function () {
    // fail silently
  });

  nameBlock.classList.add('hidden');
  thanksMsg.classList.remove('hidden');
});

nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') nameSubmitBtn.click();
});