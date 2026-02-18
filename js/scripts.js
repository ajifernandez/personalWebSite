jQuery(function ($) {
    'use strict';

    // -------------------------------------------------------
    // PreLoader
    // -------------------------------------------------------
    (function () {
        $('#preloader').delay(300).fadeOut('slow');
    }());

    // -------------------------------------------------------
    // Typed text effect for subtitle
    // -------------------------------------------------------
    (function () {
        var el = document.getElementById('typed-text');
        if (!el) return;

        var phrases = [
            'Software Engineer',
            'Team Lead',
            'Backend Developer',
            'Problem Solver'
        ];
        var phraseIndex = 0;
        var charIndex   = 0;
        var isDeleting  = false;
        var typingSpeed = 90;
        var pauseDelay  = 1800;

        function type() {
            var current = phrases[phraseIndex];

            if (isDeleting) {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            var delay = isDeleting ? typingSpeed / 2 : typingSpeed;

            if (!isDeleting && charIndex === current.length) {
                delay       = pauseDelay;
                isDeleting  = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting  = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay       = 400;
            }

            setTimeout(type, delay);
        }

        // Start after preloader fades
        setTimeout(type, 600);
    }());

    // -------------------------------------------------------
    // Smooth scroll for sidebar nav links
    // -------------------------------------------------------
    (function () {
        document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var target = document.querySelector(this.getAttribute('href'));
                if (!target) return;

                // The right column is the scrollable container
                var rightCol = document.querySelector('.right-col-block');
                if (rightCol) {
                    var offset = target.offsetTop;
                    rightCol.scrollTo({ top: offset, behavior: 'smooth' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }());

    // -------------------------------------------------------
    // Active nav link on scroll (IntersectionObserver)
    // -------------------------------------------------------
    (function () {
        var sections  = document.querySelectorAll('section[id]');
        var navLinks  = document.querySelectorAll('.sidebar-nav a.nav-link');

        if (!sections.length || !navLinks.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === '#' + id
                        );
                    });
                }
            });
        }, {
            root      : document.querySelector('.right-col-block'),
            rootMargin: '0px 0px -60% 0px',
            threshold : 0
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }());

}); // jQuery end