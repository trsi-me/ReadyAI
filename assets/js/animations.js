document.addEventListener('DOMContentLoaded', function() {
    const aboutCards = document.querySelectorAll('.about-accordion-card');
    aboutCards.forEach(function(card) {
        card.addEventListener('click', function() {
            aboutCards.forEach(function(c) { c.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    const animateEls = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animateEls.forEach(function(el) {
        observer.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateNumber(el, 0, target, 1200);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(function(el) {
        statObserver.observe(el);
    });
});

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(start + (end - start) * easeOut);
        element.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    requestAnimationFrame(update);
}
