document.getElementById('instructionsContinue').addEventListener('click', function () {
  document.getElementById('instructions').classList.add('hidden');
  document.getElementById('usernameGate').classList.remove('hidden');
});
function getUsername() {
  return localStorage.getItem("huntUsername");
}

function setUsername(name) {
  localStorage.setItem(
    "huntUsername",
    name.trim().toLowerCase().replace(/\s+/g, "_"),
  );
}

const usernameGate = document.getElementById("usernameGate");
const startWrap = document.getElementById("startWrap");

const existingName = getUsername();
if (existingName) {
  usernameGate.classList.add("hidden");
  startWrap.classList.remove("hidden");
} else {
  document
    .getElementById("usernameSubmit")
    .addEventListener("click", async function () {
      console.log("button clicked"); // confirm the click is even registering
      const rawName = document.getElementById("usernameInput").value.trim();
      console.log("typed name:", rawName);
      if (!rawName) return;

      try {
        const res = await fetch("/check-username", {
          method: "POST",
          body: JSON.stringify({ username: rawName }),
        });
        const text = await res.text();
        console.log("RAW RESPONSE:", text);
        const data = JSON.parse(text);

        if (data.available) {
          setUsername(rawName);
          usernameGate.classList.add("hidden");
          startWrap.classList.remove("hidden");
        } else {
          document.getElementById("usernameFeedback").textContent =
            "that name is taken. try another.";
        }
      } catch (err) {
        console.log("ERROR:", err);
      }
    });
}

const btn = document.getElementById("startBtn");

btn.addEventListener('click', function () {
  window.location.href = 'poem.html';
});

audio.addEventListener("ended", function () {
  window.location.href = "poem.html";
});
