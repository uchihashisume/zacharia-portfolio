
/* =====================================
   DYNAMIC COPYRIGHT YEAR
===================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =====================================
   BACK TO TOP FUNCTIONALITY
===================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ========================================
   MOBILE NAVIGATION MENU
======================================== */

// Get navigation elements
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close the mobile menu
if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        // Toggle the active class
        navMenu.classList.toggle("active");

        // Check whether the menu is open
        const isOpen = navMenu.classList.contains("active");

        // Update accessibility attributes
        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close the menu when a navigation link is selected
    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });

    });
}


/* ==============================
   CONTACT FORM
============================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent the default form submission
        event.preventDefault();

        // Get visitor information
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Check that all fields are completed
        if (!name || !email || !subject || !message) {
            alert("Please complete all fields.");
            return;
        }

        // Prepare the email content
        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        // Create the email link
        const mailtoLink =
            "mailto:skwale1@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        // Open the visitor's default email application
        window.location.href = mailtoLink;

    });

}
/* ========================================
   ACTIVE NAVIGATION ON SCROLL
======================================== */

// Get all portfolio sections
const pageSections = document.querySelectorAll(
    "section[id]"
);

// Highlight the navigation link for the visible section
const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentSectionId = entry.target.id;

                // Remove active class from all navigation links
                navLinks.forEach(function (link) {
                    link.classList.remove("active");
                });

                // Highlight the link matching the current section
                const activeLink = document.querySelector(
                    '.nav-link[href="#' + currentSectionId + '"]'
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    },
    {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
    }
);

// Observe each section
pageSections.forEach(function (section) {
    sectionObserver.observe(section);
});


/* ========================================
   SCROLL REVEAL ANIMATIONS
======================================== */

// Select the main portfolio sections
const revealElements = document.querySelectorAll(
    ".hero-section, .about-section, .projects-section, " +
    ".skills-section, .experience-section, .contact-section"
);

// Check whether the browser supports IntersectionObserver
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    // Show the section
                    entry.target.classList.add("visible");

                    // Stop observing once it has appeared
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.10
        }
    );

    // Add animation class and observe each section
    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

} else {

    // Display sections normally in older browsers
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}
