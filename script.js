document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const messageEl = document.getElementById('message');
  const ctaButton = document.getElementById('cta');
  const section = document.getElementById('subscription');

  function validateEmail(email) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
      messageEl.textContent = '¡Gracias por suscribirte!';
      messageEl.style.color = 'green';
      form.reset();
    } else {
      messageEl.textContent = 'Por favor, introduce un correo válido.';
      messageEl.style.color = 'red';
    }
  });

  ctaButton.addEventListener('click', () => {
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
