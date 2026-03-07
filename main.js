// ============================================
// FLIP CARTES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.flip-card-container').forEach(card => {
        card.addEventListener('click', function() { this.classList.toggle('flipped'); });
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.classList.toggle('flipped'); }
        });
        card.setAttribute('tabindex', '0'); card.setAttribute('role', 'button');
    });
});

// ============================================
// ANIMATION TIMELINE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline'), items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (entry.target.classList.contains('timeline')) entry.target.classList.add('animate');
            if (entry.target.classList.contains('timeline-item')) setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
    
    if (timeline) observer.observe(timeline);
    items.forEach((item, i) => { item.dataset.delay = i * 200; observer.observe(item); });
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.timeline-icon').forEach((icon, i) => {
            icon.style.transform = `translateY(${-(scrolled * (0.5 + i * 0.1) * 0.05)}px)`;
        });
    });
});

// ============================================
// HEADER  EFFECT SCROLL
// ============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

// ============================================
// ACCORDÉON VEILLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.veille-accordion-item').forEach(item => {
        item.querySelector('.veille-accordion-header').addEventListener('click', function() {
            document.querySelectorAll('.veille-accordion-item.active').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
});

// ============================================
// FORMULAIRE CONTACT - FORMSPREE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm'), btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus'), rgpd = document.getElementById('rgpdCheck'), rgpdErr = document.getElementById('rgpdError');
    
    if (!form || !btn || !status || !rgpd) { console.error('❌ Éléments manquants'); return; }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!rgpd.checked) { rgpdErr && (rgpdErr.style.display = 'block'); rgpd.focus(); return; }
        rgpdErr && (rgpdErr.style.display = 'none');
        
        btn.disabled = true; const original = btn.innerHTML; btn.innerHTML = '<span>Envoi...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        try {
            const res = await fetch(form.getAttribute('action'), { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }});
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Erreur serveur');
            status.className = 'form-status success'; status.innerHTML = '✅ <strong>Message envoyé !</strong><br>Je vous répondrai rapidement.'; status.style.display = 'block'; form.reset();
        } catch (err) {
            status.className = 'form-status error'; status.innerHTML = '❌ <strong>Erreur.</strong><br>Vérifiez votre connexion.'; status.style.display = 'block';
        } finally {
            btn.disabled = false; btn.innerHTML = original; setTimeout(() => status.style.display = 'none', 6000);
        }
    });
    
    rgpd.addEventListener('change', () => rgpd.checked && rgpdErr && (rgpdErr.style.display = 'none'));
});

// ============================================
// NAVIGATION BURGER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-toggle'), nav = document.querySelector('#navbar'), overlay = document.querySelector('.menu-overlay');
    const closeMenu = () => { burger.classList.remove('active'); nav.classList.remove('active'); overlay.classList.remove('active'); document.querySelectorAll('#navbar .dropdown').forEach(d => d.classList.remove('active')); };
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active'); nav.classList.toggle('active'); overlay.classList.toggle('active');
        if (!nav.classList.contains('active')) document.querySelectorAll('#navbar .dropdown').forEach(d => d.classList.remove('active'));
    });
    
    overlay.addEventListener('click', closeMenu);
    
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.closest('.dropdown'), isToggle = parent && this.getAttribute('href') === '#';
            if (!isToggle) closeMenu();
        });
    });
    
    document.querySelectorAll('#navbar .dropdown > a').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') e.preventDefault();
            const drop = this.parentElement, active = drop.classList.contains('active');
            document.querySelectorAll('#navbar .dropdown').forEach(d => d.classList.remove('active'));
            if (!active) drop.classList.add('active');
        });
    });
});

// ============================================
// NAVIGATION ACTIVE AUTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Quelle page ? (ex: "certifications.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Pour chaque lien du menu
    document.querySelectorAll('#navbar a').forEach(link => {
        const href = link.getAttribute('href');
        
        // Enlève active partout
        link.classList.remove('active');
        
        // Nettoie le href (enlève #section)
        const cleanHref = href.split('#')[0];
        
        // Compare
        const isMatch = cleanHref === currentPage || 
                       (currentPage === '' && cleanHref === 'index.html') ||
                       (currentPage === 'index.html' && cleanHref === 'index.html');
        
        // Ajoute active si c'est la bonne page
        if (isMatch) {
            link.classList.add('active');
        }
    });
});

// ============================================
// NAVIGATION ACTIVE SELON L'ANCRE (INDEX.HTML)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Vérifie si on est sur index.html
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' && 
        window.location.pathname !== '') {
        return; // Pas sur index.html, on quitte
    }
    
    const sections = ['hero', 'about', 'resume', 'skills','contact'];
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    
    // Fonction pour mettre à jour l'active
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100; // Offset pour le header
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            // Si on est dans cette section
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Enlève active partout
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Ajoute active sur le bon lien
                const activeLink = document.querySelector(`#navbar .nav-link[href="index.html#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
    
    // Au scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Au chargement
    updateActiveNav();
});
   