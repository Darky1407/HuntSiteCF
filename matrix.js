const canvas = document.getElementById("gibberish");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ᔑʖᓵ↸ᒷ Caravan ⎓⊣⍃⍑╎ Minecraft ㄐꖎᒲリ𝙹¡ᑳᔱꖴᓲᓳ╵ℸ ̣⚍⍞⨅";
const fontSize = 22;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(26, 26, 26, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#a2a2a2";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);