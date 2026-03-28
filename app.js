// Smooth reveal on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.about-card, .link-card, .section-title').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Typing effect for label
const label = document.querySelector('.label');
if (label) {
  const text = label.textContent;
  label.textContent = '';
  label.style.opacity = '1';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      label.textContent += text[i++];
      setTimeout(type, 55);
    } else {
      label.textContent += ' █';
      setTimeout(() => {
        label.textContent = label.textContent.replace(' █', '');
        setTimeout(() => { label.textContent += ' █'; setTimeout(() => { label.textContent = label.textContent.replace(' █', ''); }, 500); }, 500);
      }, 500);
    }
  };
  setTimeout(type, 600);
}
