
document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let score = 0;
  const answers = {
    q1: "4 hours",
    q2: "So gayi kya?",
    q3: "Kittu ke pyaar se😚",
    q4: "Piruu ka chehra 😘",
    q5: "Goa or Paris 💑"
  };
  Object.keys(answers).forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  });
  let resultText = "";
  if (score === 5) resultText = "💖 You remember everything, my jaan! You're my everything.";
  else if (score >= 3) resultText = "🥺 So close! Tumne mostly yaad rakha... I love you!";
  else resultText = "😜 Bhool gayi? Koi na, main phir se sab yaad dilaunga pyaar se!";
  document.getElementById("result").innerHTML = "<h2>" + resultText + "</h2>";
  document.getElementById("nextBtn").style.display = "inline-block";
});
