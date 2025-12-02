const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const form = document.getElementById('contactForm');
if (form) {
const fields = ['name', 'email', 'subject', 'message'];

const setError = (id, msg) => {
    const el = form.querySelector(`[data-error-for="${id}"]`);
    if (el) el.textContent = msg || '';
};

const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

fields.forEach((id) => {
    const input = form.querySelector(`#${id}`);
    input.addEventListener('input', () => {
    setError(id, '');
    form.querySelector('.form-status').textContent = '';
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let ok = true;

    const name = form.name.value.trim();
    if (!name) { setError('name', 'Name is required.'); ok = false; } else setError('name', '');

    
    const email = form.email.value.trim();
    if (!email) { setError('email', 'Email is required.'); ok = false; }
    else if (!validateEmail(email)) { setError('email', 'Enter a valid email.'); ok = false; }
    else setError('email', '');

    const subject = form.subject.value.trim();
    if (!subject) { setError('subject', 'Subject is required.'); ok = false; } else setError('subject', '');

    const message = form.message.value.trim();
    if (!message) { setError('message', 'Message is required.'); ok = false; } else setError('message', '');

    const status = form.querySelector('.form-status');

    if (!ok) {
    status.textContent = 'Please fix the errors above.';
    return;
    }

    status.textContent = 'Sending...';
    setTimeout(() => {
    status.textContent = 'Thanks! Your message has been sent.';
    form.reset();
    }, 800);
});
}
const map = document.getElementById('map');
if (map) {
map.addEventListener('mouseenter', () => {
    map.style.background = '#f0fdf4';
});
map.addEventListener('mouseleave', () => {
    map.style.background = '';
});
}
