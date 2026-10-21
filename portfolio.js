document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const progressBar = document.getElementById("progress-bar");
  const backToTop = document.getElementById("backToTop");
  const themeToggle = document.getElementById("theme-toggle");
  const menuButton = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-links");
  const year = document.getElementById("year");
  const roleText = document.getElementById("role-text");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (year) year.textContent = new Date().getFullYear();

  const updateScroll = () => {
    const maxScroll = root.scrollHeight - root.clientHeight;
    if (progressBar)
      progressBar.style.width = `${maxScroll > 0 ? (root.scrollTop / maxScroll) * 100 : 0}%`;
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 450);
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  backToTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }),
  );

  const setMenu = (open) => {
    if (!menu || !menuButton) return;
    menu.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    menuButton.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}"></i>`;
  };
  menuButton?.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  menu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (
      menu?.classList.contains("open") &&
      !menu.contains(event.target) &&
      !menuButton?.contains(event.target)
    )
      setMenu(false);
  });

  const getTheme = () => root.dataset.theme || "dark";
  const renderTheme = () => {
    if (!themeToggle) return;
    const dark = getTheme() === "dark";
    themeToggle.innerHTML = `<i class="fa-solid ${dark ? "fa-sun" : "fa-moon"}"></i>`;
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
  };
  renderTheme();
  themeToggle?.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    renderTheme();
  });

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => navObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((element) => element.classList.add("visible"));
  }

  if (roleText && !reducedMotion) {
    const roles = [
      "Web Development",
      "C++ & Problem Solving",
      "Creative Technology",
      "Workflow Automation",
    ];
    let roleIndex = 0;
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.animate(
        [
          { opacity: 0, transform: "translateY(5px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 280, easing: "ease-out" },
      );
      roleText.textContent = roles[roleIndex];
    }, 2600);
  }
});
