const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
    });
  });
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

document.querySelectorAll('.footer-socials').forEach((socials) => {
  if (socials.querySelector('[data-location-link]')) return;

  const mailLink = socials.parentElement.querySelector('.footer-mail');
  if (mailLink) {
    mailLink.setAttribute('aria-label', 'Email info@shyamsolarsystems.com');
    mailLink.setAttribute('title', 'Email Shyam Solar System');

    const mailIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mailIcon.setAttribute('viewBox', '0 0 24 24');
    mailIcon.setAttribute('aria-hidden', 'true');
    mailIcon.setAttribute('focusable', 'false');

    const mailOutline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mailOutline.setAttribute('x', '3');
    mailOutline.setAttribute('y', '5');
    mailOutline.setAttribute('width', '18');
    mailOutline.setAttribute('height', '14');
    mailOutline.setAttribute('rx', '1.5');
    mailOutline.setAttribute('fill', 'none');
    mailOutline.setAttribute('stroke', 'currentColor');
    mailOutline.setAttribute('stroke-width', '2');

    const mailFold = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mailFold.setAttribute('d', 'm4 7 8 6 8-6');
    mailFold.setAttribute('fill', 'none');
    mailFold.setAttribute('stroke', 'currentColor');
    mailFold.setAttribute('stroke-width', '2');

    mailIcon.append(mailOutline, mailFold);
    mailLink.replaceChildren(mailIcon);
    socials.append(mailLink);
  }

  const mapLink = document.createElement('a');
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('2/360, Vikalp Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010')}`;
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  mapLink.setAttribute('aria-label', 'Find Shyam Solar System on Google Maps');
  mapLink.setAttribute('title', 'Find us on Google Maps');
  mapLink.dataset.locationLink = '';

  const mapIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mapIcon.setAttribute('viewBox', '0 0 24 24');
  mapIcon.setAttribute('aria-hidden', 'true');
  mapIcon.setAttribute('focusable', 'false');

  const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pinPath.setAttribute('d', 'M12 22s8-7.6 8-13a8 8 0 1 0-16 0c0 5.4 8 13 8 13Z');
  pinPath.setAttribute('fill', 'none');
  pinPath.setAttribute('stroke', 'currentColor');
  pinPath.setAttribute('stroke-width', '2');

  const pinCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  pinCenter.setAttribute('cx', '12');
  pinCenter.setAttribute('cy', '9');
  pinCenter.setAttribute('r', '2.5');
  pinCenter.setAttribute('fill', 'none');
  pinCenter.setAttribute('stroke', 'currentColor');
  pinCenter.setAttribute('stroke-width', '2');

  mapIcon.append(pinPath, pinCenter);
  mapLink.append(mapIcon);
  socials.append(mapLink);
});

const billInput = document.querySelector('#monthly-bill');
const billRange = document.querySelector('#bill-range');
const savingsOutput = document.querySelector('#estimated-savings');
const capacityOutput = document.querySelector('#estimated-capacity');
const generationOutput = document.querySelector('#estimated-generation');
const currency = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

if (billInput && billRange && savingsOutput && capacityOutput && generationOutput) {
  function updateEstimate(value) {
    const monthlyBill = Math.max(500, Math.min(1000000, Number(value) || 0));
    const monthlyUnits = monthlyBill / 8;
    const capacity = monthlyUnits / (4.5 * 30);
    const monthlySavings = monthlyBill * 0.85;
    const annualGeneration = capacity * 4.5 * 30 * 12;

    savingsOutput.textContent = `₹${currency.format(monthlySavings)}`;
    capacityOutput.textContent = `${capacity.toFixed(1)} kW`;
    generationOutput.textContent = `${currency.format(annualGeneration)} kWh`;
    billRange.value = String(Math.min(30000, Math.max(1000, monthlyBill)));
    billRange.style.setProperty('--range-progress', `${((Number(billRange.value) - 1000) / 29000) * 100}%`);
  }

  billInput.addEventListener('input', () => updateEstimate(billInput.value));
  billRange.addEventListener('input', () => {
    billInput.value = billRange.value;
    updateEstimate(billRange.value);
  });
  updateEstimate(billInput.value);
}

const reviewTrack = document.querySelector('.review-track');
const reviewPrev = document.querySelector('.review-prev');
const reviewNext = document.querySelector('.review-next');
if (reviewTrack && reviewPrev && reviewNext) {
  reviewPrev.addEventListener('click', () => {
    reviewTrack.scrollBy({ left: -reviewTrack.querySelector('.review-card').getBoundingClientRect().width - 13, behavior: 'smooth' });
  });
  reviewNext.addEventListener('click', () => {
    reviewTrack.scrollBy({ left: reviewTrack.querySelector('.review-card').getBoundingClientRect().width + 13, behavior: 'smooth' });
  });
}

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector('img').alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Solar enquiry from ${formData.get('name')}`);
    const message = [
      `Name: ${formData.get('name')}`,
      `Phone: ${formData.get('phone')}`,
      `Email: ${formData.get('email') || 'Not provided'}`,
      `Interested in: ${formData.get('interest')}`,
      `Project details: ${formData.get('message') || 'Not provided'}`,
    ].join('\n');
    formStatus.textContent = 'Your email app is opening with the enquiry details.';
    window.location.href = `mailto:info@shyamsolarsystems.com?subject=${subject}&body=${encodeURIComponent(message)}`;
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
