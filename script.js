// selector helper
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ========== NAV MOBILE ==========
const navBtn = $("#navBtn");
const navMenu = $("#navMenu");

navBtn?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

$$(".nav-menu a").forEach((a) => {
  a.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ========== THEME TOGGLE ==========
const themeBtn = $("#themeBtn");
const root = document.documentElement;

function setTheme(mode) {
  if (mode === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");

  localStorage.setItem("theme", mode);
  themeBtn.textContent = mode === "light" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "light" ? "light" : "dark");

themeBtn?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
});

// ========== FOOTER YEAR ==========
$("#year").textContent = new Date().getFullYear();

// ========== COUNTER ANIMATION ==========
let counterDone = false;
const hero = $("#home");

function animateCounters() {
  $$("[data-counter]").forEach((el) => {
    const target = Number(el.getAttribute("data-counter") || "0");
    let current = 0;

    const step = Math.max(1, Math.floor(target / 40));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 25);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    if (!counterDone && entries.some((e) => e.isIntersecting)) {
      counterDone = true;
      animateCounters();
    }
  },
  { threshold: 0.35 }
);

if (hero) observer.observe(hero);

// ========== FORM DEMO ==========
const form = $("#contactForm");
const note = $("#note");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();

  note.textContent = `✅ Terima kasih, ${name || "kamu"}! Pesanmu sudah tersimpan.`;
  form.reset();
});
