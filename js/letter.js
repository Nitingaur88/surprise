const lines = document.querySelectorAll(".line");
lines.forEach((line, i) => {
  line.style.opacity = 0;
  setTimeout(() => {
    line.style.transition = "opacity 1s";
    line.style.opacity = 1;
  }, 1000 * (i + 1));
});