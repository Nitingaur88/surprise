const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = canvas.height;
  const radius = 2;
  const color = `hsl(${Math.floor(random(0, 360))}, 100%, 60%)`;
  const speed = random(3, 7);
  fireworks.push({ x, y, radius, color, speed, particles: [] });
}

function createParticles(firework) {
  for (let i = 0; i < 40; i++) {
    const angle = (Math.PI * 2 * i) / 40;
    const speed = random(1, 5);
    firework.particles.push({
      x: firework.x,
      y: firework.y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      radius: 2,
      alpha: 1,
      color: firework.color
    });
  }
}

function updateFireworks() {
  ctx.fillStyle = ctx.fillStyle = "rgba(255, 240, 245, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, index) => {
    if (!fw.exploded) {
      fw.y -= fw.speed;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
      ctx.fillStyle = fw.color;
      ctx.fill();
      if (fw.y < random(150, 300)) {
        fw.exploded = true;
        createParticles(fw);
      }
    } else {
      fw.particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.02;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.fill();
      });
    }

    if (fw.exploded && fw.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(index, 1);
    }
  });

  if (Math.random() < 0.05) createFirework();

  requestAnimationFrame(updateFireworks);
}

function hexToRgb(h) {
  const result = /^hsl(\d+), *(\d+)%, *(\d+)%/i.exec(h);
  if (result) {
    let h = parseInt(result[1]) / 360;
    let s = parseInt(result[2]) / 100;
    let l = parseInt(result[3]) / 100;

    let r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = function(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)}`;
  }
  return "255,255,255";
}

updateFireworks();