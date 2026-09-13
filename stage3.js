if (sessionStorage.getItem('stage2complete') !== 'true') {
  window.location.href = 'stage2.html';
}


const NAV_RIDDLE = "The final fragment does not hide. It waits where you last looked away.";
const audio = document.getElementById('stage3Audio');
const playBtn = document.getElementById('playBtn');
const vizCanvas = document.getElementById('visualizer');
const vizCtx = vizCanvas.getContext('2d');

let audioCtx, analyser, source, dataArray, bufferLength;
let isPlaying = false;

function setupAudioGraph() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function draw() {
  requestAnimationFrame(draw);
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  vizCtx.clearRect(0, 0, vizCanvas.width, vizCanvas.height);
  const barWidth = (vizCanvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] / 255) * vizCanvas.height;
    vizCtx.fillStyle = '#555';
    vizCtx.fillRect(x, vizCanvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}
draw();

playBtn.addEventListener('click', function () {
  setupAudioGraph();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (!isPlaying) {
    audio.play();
    playBtn.textContent = '❚❚ pause';
  } else {
    audio.pause();
    playBtn.textContent = '▶ play';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('ended', function () {
  isPlaying = false;
  playBtn.textContent = '▶ play';
});

const input = document.getElementById('answerInput');
const btn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const answerBlock = document.getElementById('answerBlock');
const riddleBlock = document.getElementById('riddleBlock');
const riddleText = document.getElementById('riddleText');

async function checkAnswer() {
  const value = input.value.trim().toLowerCase().replace(/\s+/g, ' ');

  const response = await fetch('/check-stage3', {
    method: 'POST',
    body: JSON.stringify({ answer: value }),
  });
  const data = await response.json();

  if (data.correct) {
    answerBlock.classList.add('hidden');
    riddleText.textContent = NAV_RIDDLE;
    riddleBlock.classList.remove('hidden');
    sessionStorage.setItem('stage3complete', 'true');
  } else {
    feedback.textContent = 'incorrect.';
  }
}

btn.addEventListener('click', checkAnswer);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkAnswer();
});

document.getElementById('nextStageBtn').addEventListener('click', function () {
  window.location.href = 'stage4.html';
});