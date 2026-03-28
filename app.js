// ========== Custom Cursor ==========
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .link-card, .about-card, .project-card, .badge, .stag').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ========== Smooth reveal on scroll ==========
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

// NOTE: skill-group intentionally excluded — uses opacity:1 !important
document.querySelectorAll('.about-card, .link-card, .section-title, .project-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ========== Skill bar animation ==========
const skillObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
      skillObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ========== Typing animation ==========
const typingTarget = document.getElementById('typing-target');
const phrases = [
  'Computer Science student & systems developer.',
  'Passionate about low-level programming.',
  'Assembly, C/C++, Linux enthusiast.',
  'Building things from scratch.'
];

let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typingTarget.textContent = isDeleting
    ? current.substring(0, --charIndex)
    : current.substring(0, ++charIndex);

  let delay = isDeleting ? 35 : 60;

  if (!isDeleting && charIndex >= current.length) {
    delay = 2200; isDeleting = true;
  } else if (isDeleting && charIndex <= 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}

setTimeout(typeLoop, 900);

// ========== Label type-in ==========
const label = document.querySelector('.label');
if (label) {
  const text = label.textContent;
  label.textContent = '';
  label.style.opacity = '1';
  let i = 0;
  const type = () => { if (i < text.length) { label.textContent += text[i++]; setTimeout(type, 55); } };
  setTimeout(type, 300);
}

// ========== Contact form ==========
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    try { await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); } catch (_) {}
    setTimeout(() => { form.reset(); btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
  });
}

// ========== Discord copy ==========
document.querySelectorAll('.link-card--copy').forEach(card => {
  card.addEventListener('click', () => {
    navigator.clipboard.writeText(card.dataset.copy).then(() => {
      const span = card.querySelector('span');
      const orig = span.textContent;
      span.textContent = 'copied!';
      card.style.borderColor = 'rgba(94,234,212,0.6)';
      setTimeout(() => { span.textContent = orig; card.style.borderColor = ''; }, 1800);
    });
  });
});
