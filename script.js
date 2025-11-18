const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';

    try {
        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            formMessage.textContent =
                'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
        } else {
            // Handle Formspree validation errors
            if (data.errors) {
                const errorMessages = data.errors
                    .map((err) => err.message || err)
                    .join(', ');
                throw new Error(`Validation errors: ${errorMessages}`);
            }
            throw new Error(data.error || 'Form submission failed');
        }
    } catch (error) {
        console.error('Form Error:', error);
        const errorMessage =
            error.message && error.message.includes('Validation errors')
                ? error.message
                : 'Sorry, there was an error sending your message. Please try again or contact us directly at grizzlydashenterprise@gmail.com.';
        formMessage.textContent = errorMessage;
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Prevent icon animation from restarting
const heroIcon = document.querySelector('.hero-icon');
if (heroIcon) {
    heroIcon.addEventListener(
        'animationend',
        () => {
            heroIcon.classList.add('animated');
        },
        { once: true }
    );
}

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
