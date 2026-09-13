if (sessionStorage.getItem('stage4complete') !== 'true') {
  window.location.href = 'stage4.html';
}

document.getElementById('continueBtn').addEventListener('click', function () {
  sessionStorage.setItem('stage5complete', 'true');
  window.location.href = 'poem.html';
});