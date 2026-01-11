const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const cta = document.getElementById("cta");

const updateThemeLabel = () => {
  const isDark = root.dataset.theme === "dark";
  themeToggle.textContent = isDark ? "Light" : "Dark";
};

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  updateThemeLabel();
});

updateThemeLabel();

cta.addEventListener("click", () => {
  document.querySelector("#features").scrollIntoView({ behavior: "smooth" });
});

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.round(target / 60));
      const tick = () => {
        current = Math.min(target, current + step);
        el.textContent = current;
        if (current < target) {
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const fadeTargets = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

fadeTargets.forEach((target) => fadeObserver.observe(target));

const canvas = document.getElementById("pulse");
const ctx = canvas.getContext("2d");
const resize = () => {
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
};

const points = Array.from({ length: 64 }, (_, i) => ({
  x: i / 63,
  amplitude: Math.random() * 0.6 + 0.2,
  speed: Math.random() * 0.02 + 0.01,
  offset: Math.random() * Math.PI * 2,
}));

const draw = (t) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3 * devicePixelRatio;
  ctx.strokeStyle = root.dataset.theme === "dark" ? "#38bdf8" : "#6d6bff";
  ctx.beginPath();
  points.forEach((point, i) => {
    const x = point.x * canvas.width;
    const y =
      canvas.height / 2 +
      Math.sin(t * point.speed + point.offset) *
        (canvas.height * 0.2) *
        point.amplitude;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
  requestAnimationFrame(draw);
};

resize();
window.addEventListener("resize", resize);
requestAnimationFrame(draw);
