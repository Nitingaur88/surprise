const startDate = new Date("2020-07-07");
const today = new Date();
const diffTime = Math.abs(today - startDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
document.getElementById("days").innerText = `${diffDays} Days`;