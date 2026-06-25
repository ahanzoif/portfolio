document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
      LOADER
  =========================== */

  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 600);
    }
  });

  /* ===========================
      SCROLL PROGRESS BAR
  =========================== */

  const progressBar = document.getElementById("progress-bar");

  function updateProgressBar() {

    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  }

  window.addEventListener("scroll", updateProgressBar);



  /* ===========================
      BACK TO TOP BUTTON
  =========================== */

  const backToTop = document.getElementById("backToTop");

  function toggleBackButton() {

    if (!backToTop) return;

    if (window.scrollY > 350) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackButton);

  if (backToTop) {
    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });
  }



  /* ===========================
      SMOOTH SCROLL
  =========================== */

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });



  /* ===========================
      ACTIVE NAVBAR
  =========================== */

  const sections = document.querySelectorAll("section[id]");

  function activeMenu() {

    let currentSection = "";

    sections.forEach(section => {

      const top = section.offsetTop - 150;
      const height = section.offsetHeight;

      if (window.scrollY >= top &&
          window.scrollY < top + height) {

        currentSection = section.id;

      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {

        link.classList.add("active");

      }

    });

  }

  window.addEventListener("scroll", activeMenu);



  /* ===========================
      SCROLL REVEAL
  =========================== */

  const revealElements = document.querySelectorAll(

    ".aboutCard,\
     .skillCard,\
     .educationCard,\
     .project_card,\
     .achievement_card,\
     .learning_card,\
     .exp_card,\
     .timeline_card"

  );



  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";

        }

      });

    },

    {
      threshold: .15
    }

  );



  revealElements.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".7s ease";

    observer.observe(item);

  });



  /* ===========================
      THEME TOGGLE
  =========================== */

  const themeButton = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    if (themeButton) {
      themeButton.innerHTML = "☀️";
    }

  }

  if (themeButton) {

    themeButton.addEventListener("click", () => {

      document.body.classList.toggle("light-mode");

      const light =
        document.body.classList.contains("light-mode");

      localStorage.setItem(
        "theme",
        light ? "light" : "dark"
      );

      themeButton.innerHTML =
        light ? "☀️" : "🌙";

    });

  }



  /* ===========================
      TYPING EFFECT
  =========================== */

  const typing = document.querySelector(".typing-text");

  if (typing) {

    const words = [

      "Web Developer",

      "C++ Programmer",

      "Problem Solver",

      "Tech Enthusiast",

      "Content Creator"

    ];

    let wordIndex = 0;

    let letterIndex = 0;

    let deleting = false;



    function type() {

      const current = words[wordIndex];



      if (!deleting) {

        typing.textContent =
          current.substring(0, letterIndex++);

      }

      else {

        typing.textContent =
          current.substring(0, letterIndex--);

      }



      let speed = deleting ? 50 : 120;



      if (!deleting &&
          letterIndex === current.length + 1) {

        deleting = true;

        speed = 1200;

      }

      else if (deleting &&
               letterIndex === 0) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length)
          wordIndex = 0;

      }

      setTimeout(type, speed);

    }

    type();

  }

});

