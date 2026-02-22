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

        // Get the grid container
        var grid = document.getElementById('resource-grid');
        if (!grid) return;

        // Collect visible cards and sort: available first, then coming-soon
        var visibleCards = [];
        resourceCards.forEach(function(card) {
            var cardType = card.getAttribute('data-type');
            if (filter === 'all' || cardType === filter) {
                card.style.display = '';
                card.removeAttribute('hidden');
                visibleCards.push(card);
            } else {
                card.style.display = 'none';
                card.setAttribute('hidden', '');
            }
        });

        // Sort: cards with .tag-free before cards with .tag-coming
        visibleCards.sort(function(a, b) {
            var aIsComingSoon = a.querySelector('.tag-coming') !== null;
            var bIsComingSoon = b.querySelector('.tag-coming') !== null;
            if (aIsComingSoon && !bIsComingSoon) return 1;
            if (!aIsComingSoon && bIsComingSoon) return -1;
            return 0;
        });

        // Re-append in sorted order (available first)
        visibleCards.forEach(function(card) {
            grid.appendChild(card);
        });

        // Announce filter change for screen readers
        announceFilterChange(filter);
    }

    if (filterButtons.length > 0 && resourceCards.length > 0) {
        // Always sort on initial page load (available before coming-soon)
        applyFilter('all');

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

    // Recipe Substitutions Accordion
    (function initRecipeAccordion() {
        var accordionItems = document.querySelectorAll('.accordion-item');
        var subIcons = document.querySelectorAll('.sub-icon');

        if (accordionItems.length === 0) return;

        // Toggle accordion item
        function toggleAccordion(item, shouldOpen) {
            var trigger = item.querySelector('.accordion-trigger');
            var content = item.querySelector('.accordion-content');

            if (shouldOpen) {
                trigger.setAttribute('aria-expanded', 'true');
                content.removeAttribute('hidden');
            } else {
                trigger.setAttribute('aria-expanded', 'false');
                content.setAttribute('hidden', '');
            }
        }

        // Close all accordion items
        function closeAllAccordions() {
            accordionItems.forEach(function(item) {
                toggleAccordion(item, false);
            });
        }

        // Handle accordion trigger clicks
        accordionItems.forEach(function(item) {
            var trigger = item.querySelector('.accordion-trigger');

            trigger.addEventListener('click', function() {
                var isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Close all others first (optional single-open behavior)
                closeAllAccordions();

                // Toggle this one
                if (!isExpanded) {
                    toggleAccordion(item, true);
                }
            });
        });

        // Handle substitution icon clicks
        subIcons.forEach(function(icon) {
            icon.addEventListener('click', function() {
                var ingredientId = this.getAttribute('data-ingredient');
                var targetItem = document.querySelector('.accordion-item[data-ingredient="' + ingredientId + '"]');

                if (!targetItem) return;

                // Close all and open the target
                closeAllAccordions();
                toggleAccordion(targetItem, true);

                // Scroll to the item with offset for header
                var headerOffset = 100;
                var elementPosition = targetItem.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add highlight animation
                targetItem.classList.remove('is-highlighted');
                // Trigger reflow to restart animation
                void targetItem.offsetWidth;
                targetItem.classList.add('is-highlighted');

                // Focus the trigger for accessibility
                setTimeout(function() {
                    targetItem.querySelector('.accordion-trigger').focus();
                }, 400);
            });
        });
    })();

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

    // Cookie Consent Banner
    function loadAnalytics() {
        // Add analytics scripts here when ready.
        // This function is only called when the user has accepted cookies.
        //
        // Example for Google Analytics:
        // var script = document.createElement('script');
        // script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR-ID';
        // script.async = true;
        // document.head.appendChild(script);
        // script.onload = function() {
        //     window.dataLayer = window.dataLayer || [];
        //     function gtag(){dataLayer.push(arguments);}
        //     gtag('js', new Date());
        //     gtag('config', 'YOUR-ID');
        // };
    }

    (function handleCookieConsent() {
        var banner = document.getElementById('cookie-consent');
        var acceptBtn = document.getElementById('cookie-accept');
        var declineBtn = document.getElementById('cookie-decline');

        if (!banner) return;

        var consent = localStorage.getItem('cookie-consent');

        if (consent === 'accepted') {
            loadAnalytics();
            return;
        }

        if (consent === 'declined') {
            return;
        }

        // No prior choice — show the banner
        banner.removeAttribute('hidden');

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'accepted');
            banner.setAttribute('hidden', '');
            loadAnalytics();
        });

        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'declined');
            banner.setAttribute('hidden', '');
        });
    })();

})();
