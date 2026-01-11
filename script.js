const pawStream = document.querySelector(".paw-stream");
const pulseToggle = document.getElementById("pulseToggle");
const scrollGallery = document.getElementById("scrollGallery");
const colorBlast = document.getElementById("colorBlast");
const backTop = document.getElementById("backTop");

const createPaw = () => {
  const paw = document.createElement("span");
  paw.className = "paw";
  const size = Math.random() * 16 + 18;
  paw.style.width = `${size}px`;
  paw.style.height = `${size}px`;
  paw.style.left = `${Math.random() * 100}%`;
  paw.style.animationDuration = `${Math.random() * 6 + 6}s`;
  paw.style.animationDelay = `${Math.random() * 3}s`;
  pawStream.appendChild(paw);

  paw.addEventListener("animationend", () => {
    paw.remove();
  });
};

const spawnPaws = () => {
  for (let i = 0; i < 10; i += 1) {
    createPaw();
  }
};

spawnPaws();
setInterval(createPaw, 1200);

pulseToggle.addEventListener("click", () => {
  document.body.classList.toggle("color-blast");
  const active = document.body.classList.contains("color-blast");
  pulseToggle.textContent = active ? "鼓動OFF" : "鼓動ON";
});

colorBlast.addEventListener("click", () => {
  document.body.classList.toggle("color-blast");
});

scrollGallery.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});

backTop.addEventListener("click", () => {
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.round(target / 50));
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

const hero = document.querySelector(".hero");
const handleParallax = () => {
  const offset = window.scrollY;
  hero.style.transform = `translateY(${offset * 0.05}px)`;
  requestAnimationFrame(handleParallax);
};

requestAnimationFrame(handleParallax);
