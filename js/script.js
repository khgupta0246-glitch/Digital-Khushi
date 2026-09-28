/* =========================================================
   DIGITAL KHUSHI — WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            menuToggle.innerHTML =
                navLinks.classList.contains("open") ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.innerHTML = "☰";
            });
        });
    }


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbar);
    handleNavbar();


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       COUNTER ANIMATION
    ========================= */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(element) {

        const target = Number(element.dataset.target || 0);
        let current = 0;

        const duration = 1400;
        const startTime = performance.now();

        function update(time) {

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const ease = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * ease);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    if (counters.length) {

        const counterObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.6
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }


    /* =========================
       SCROLL TO TOP
    ========================= */

    const scrollTop = document.querySelector(".scroll-top");

    if (scrollTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                scrollTop.classList.add("visible");
            } else {
                scrollTop.classList.remove("visible");
            }

        });

        scrollTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================
       FORM DEMO HANDLER
    ========================= */

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            const action =
                contactForm.getAttribute("action");

            if (!action || action === "#") {

                event.preventDefault();

                const button =
                    contactForm.querySelector("button[type='submit']");

                if (button) {

                    const originalText = button.innerHTML;

                    button.innerHTML = "Message Ready ✓";

                    setTimeout(() => {
                        button.innerHTML = originalText;
                    }, 2500);
                }

            }

        });

    }


    /* =========================
       CARD TILT EFFECT
    ========================= */

    const tiltCards =
        document.querySelectorAll(".service-card, .project-card");

    if (window.innerWidth > 850) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;

                const rotateY =
                    ((x / rect.width) - 0.5) * 4;

                card.style.transform =
                    `translateY(-7px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }

});
