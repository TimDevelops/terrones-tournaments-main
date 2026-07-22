// ==========================================
// CONFIGURATION
// ==========================================
// Flip to false when tournament registration is full/closed
const IS_REGISTRATION_OPEN = false; 


// ==========================================
// 1. REGISTRATION FORM HANDLER
// ==========================================
const regForm = document.getElementById('registration-form');

if (regForm) {
    regForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent standard page refresh

        // Check if registration is closed
        if (!IS_REGISTRATION_OPEN) {
            alert("❌ Team registration is now closed. The deadline has passed, and we are no longer accepting new teams. Thank you for your interest!");
            return;
        }

        const formData = new FormData(regForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const data = await response.json();

            if (response.status === 200) {
                // Grab the Square URL dynamically from the hidden input field in HTML
                const squareUrl = regForm.querySelector('input[name="redirect"]').value;
                window.location.href = squareUrl;
            } else {
                alert("❌ There was an issue submitting your registration. Please try again.");
            }

        } catch (error) {
            console.error("❌ Registration Error:", error);
            alert("❌ Something went wrong. Please check your connection and try again.");
        }
    });
}


// ==========================================
// 2. CONTACT FORM HANDLER
// ==========================================
const contactForm = document.querySelector('#contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent standard page refresh

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const data = await response.json();

            if (response.status === 200) {
                alert("✅ Your message has been successfully sent!");
                contactForm.reset();
            } else {
                alert("❌ Your message was not sent. Please try again.");
            }

        } catch (error) {
            console.error("❌ Contact Form Error:", error);
            alert("❌ Something went wrong while sending your message.");
        }
    });
}