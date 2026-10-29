jQuery(function ($) {
    'use strict';

    // -------------------------------------------------------
    // Smooth scroll for nav links
    // -------------------------------------------------------
    (function () {
        document.querySelectorAll('.nav-menu a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    var navHeight = document.querySelector('.top-nav').offsetHeight;
                    var targetOffset = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }());

    // -------------------------------------------------------
    // Active nav link on scroll
    // -------------------------------------------------------
    (function () {
        var sections  = document.querySelectorAll('section[id]');
        var navLinks  = document.querySelectorAll('.nav-menu a');

        if (!sections.length || !navLinks.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-10% 0px -85% 0px',
            threshold : 0
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }());

    // -------------------------------------------------------
    // Light / dark theme toggle
    // -------------------------------------------------------
    (function () {
        var btn  = document.getElementById('theme-toggle');
        var root = document.documentElement;
        if (!btn) return;

        function render() {
            var dark = root.dataset.theme === 'dark';
            btn.textContent = dark ? '\u2600' : '\u263E';
            btn.setAttribute('aria-pressed', dark);
        }

        btn.addEventListener('click', function () {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
            render();
        });
        render();
    }());

}); // jQuery end