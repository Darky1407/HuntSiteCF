if (sessionStorage.getItem('finalcomplete') !== 'true') {
  window.location.href = 'final.html';
}

const nameInput = document.getElementById('nameInput');
const nameSubmitBtn = document.getElementById('nameSubmitBtn');
const nameBlock = document.getElementById('nameBlock');
const thanksMsg = document.getElementById('thanksMsg');

nameSubmitBtn.addEventListener('click', async function () {
  const name = nameInput.value.trim();
  if (!name) return;

  await fetch('/.netlify/functions/notify-complete', {
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