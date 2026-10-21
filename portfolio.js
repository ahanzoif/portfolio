document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /* Scroll progress bar */
  const progressBar = document.getElementById("progress-bar");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (progressBar && max > 0) {
      progressBar.style.width = (doc.scrollTop / max) * 100 + "%";
    }
    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 350);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0 });
    });
  }

  /* Mobile menu */
  const menuBtn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-links");

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () =>
      setMenu(!menu.classList.contains("open"))
    );
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Active nav link */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const targets = [...navLinks]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id
            )
          );
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    targets.forEach((t) => navObserver.observe(t));

    /* Subtle reveal on scroll */
    const reveals = document.querySelectorAll(
      ".section-head, .card, .hero-text, .hero-photo"
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* Theme toggle (light / dark) */
  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function currentTheme() {
    const set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function renderToggle() {
    if (!toggle) return;
    toggle.innerHTML =
      currentTheme() === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
  }

  renderToggle();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      renderToggle();
    });
  }
});