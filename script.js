const btn = document.getElementById("startBtn");
const audio = document.getElementById("introAudio");

btn.addEventListener("click", function () {
  audio.src = "intro.mp3";
  audio.play();
});

audio.addEventListener("ended", function () {
  window.location.href = "poem.html";
});