document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle per dispositivi mobili
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        // Rimuovi eventuali listener precedenti
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Aggiungi il nuovo listener
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('active');
            console.log('Menu toggle clicked');
        });
    }
    
    // Chiudi il menu quando l'utente scorre la pagina
    window.addEventListener('scroll', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    // Slideshow automatico per i progetti
    function setupSlideshows() {
        const slideshows = document.querySelectorAll('.slideshow');
        
        slideshows.forEach(slideshow => {
            const slides = slideshow.querySelectorAll('img');
            let currentSlide = 0;
            
            // Funzione per cambiare slide
            function nextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
            
            // Avvia lo slideshow con intervallo di 1 secondo
            setInterval(nextSlide, 1000);
        });
    }
    
    // Inizializza gli slideshow
    setupSlideshows();

    // Smooth scroll per i link di navigazione
    const navLinks = document.querySelectorAll('nav ul li a, .hero-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Verifica se il link punta a un'altra pagina
            if (targetId.includes('.html')) {
                // Non abbiamo più bisogno di gestire la pagina lavoraconnoi.html separata
            // poiché ora è una sezione nella home page
                
                // Per tutti gli altri link .html, lascia che il browser gestisca la navigazione normalmente
                console.log('Navigazione a: ' + targetId);
                return; // Importante: non prevenire il comportamento predefinito
            }
            
            // Altrimenti, gestisci lo smooth scroll all'interno della pagina
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Chiudi il menu mobile se aperto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
                
                // Scroll smooth verso la sezione
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Compensazione per l'header fisso
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Rimuoviamo la gestione specifica per il link "Lavora con noi" per permettere la navigazione standard
    // Questo permette al browser di gestire normalmente i link tra le pagine

    // Animazione per le card dei servizi e progetti
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .project-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inizializza le card con opacità 0
    const cards = document.querySelectorAll('.service-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Esegui l'animazione al caricamento e allo scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Validazione del form di contatto
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Semplice validazione
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validazione semplice
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = 'red';
                }
            }
            
            if (isValid) {
                // Simulazione invio form
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Invio in corso...';
                
                // Simulazione di una richiesta AJAX
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Feedback all'utente
                    submitBtn.textContent = 'Inviato!';
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }
});