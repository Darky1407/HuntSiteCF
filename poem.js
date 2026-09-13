
if (sessionStorage.getItem('stage5complete') === 'true') {
  document.getElementById('finalLink').classList.remove('hidden');
}

document.getElementById('finalBtn').addEventListener('click', function () {
  window.location.href = 'final.html';
});

document.getElementById('continueBtn').addEventListener('click', function () {
  window.location.href = 'stage1.html';
});