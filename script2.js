document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
  
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
        
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});