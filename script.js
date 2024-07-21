var typed = new Typed(".text", {

  strings: ["Funcional", "Educativo", "Interativo"],

  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection)
      {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});