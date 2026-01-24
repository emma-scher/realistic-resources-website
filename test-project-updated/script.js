/**
 * Realistic Resources - Main JavaScript
 */

(function() {
    'use strict';

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
                menuToggle.focus();
            }
        });
    }

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card[data-type]');

    function applyFilter(filter) {
        // Update active state on buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            }
        });

        // Filter cards
        resourceCards.forEach(function(card) {
            const cardType = card.getAttribute('data-type');

            if (filter === 'all' || cardType === filter) {
                card.style.display = '';
                card.removeAttribute('hidden');
            } else {
                card.style.display = 'none';
                card.setAttribute('hidden', '');
            }
        });

        // Announce filter change for screen readers
        announceFilterChange(filter);
    }

    if (filterButtons.length > 0 && resourceCards.length > 0) {
        // Check for hash in URL and apply filter
        const hash = window.location.hash.replace('#', '');
        if (hash && document.querySelector('[data-filter="' + hash + '"]')) {
            applyFilter(hash);
        }

        // Listen for hash changes
        window.addEventListener('hashchange', function() {
            const newHash = window.location.hash.replace('#', '');
            if (newHash && document.querySelector('[data-filter="' + newHash + '"]')) {
                applyFilter(newHash);
            }
        });

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                applyFilter(filter);

                // Update URL hash without scrolling
                history.pushState(null, null, filter === 'all' ? window.location.pathname : '#' + filter);
            });
        });
    }

    // Screen reader announcement helper
    function announceFilterChange(filter) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('visually-hidden');

        const visibleCount = document.querySelectorAll('.resource-card[data-type]:not([hidden])').length;

        let filterLabel = filter;
        if (filter === 'coming') filterLabel = 'coming soon';

        announcement.textContent = `Showing ${visibleCount} ${filter === 'all' ? '' : filterLabel + ' '}resource${visibleCount !== 1 ? 's' : ''}`;

        document.body.appendChild(announcement);

        setTimeout(function() {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Smooth scroll for anchor links (progressive enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Add loading state to external link buttons
    document.querySelectorAll('.btn[target="_blank"]').forEach(function(button) {
        button.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';

            // Reset after a short delay in case user navigates back
            setTimeout(function() {
                button.style.opacity = '';
                button.style.pointerEvents = '';
            }, 2000);
        });
    });

    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

})();
