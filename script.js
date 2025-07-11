// Spotlight
const spotlight = document.querySelector('.spotlight');
document.addEventListener('mousemove', (e) => {
  spotlight.style.left = `${e.clientX}px`;
  spotlight.style.top = `${e.clientY}px`;
});

// Smooth scroll on click
const navLinks = document.querySelectorAll('.nav-link');
const scrollContainer = document.querySelector('.scrolling-content');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ScrollSpy with internal scroll container
const sections = Array.from(navLinks).map(link =>
  document.querySelector(link.getAttribute('href'))
);

function updateActiveLink() {
  const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight / 2;

  sections.forEach((section, index) => {
    const link = navLinks[index];
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// Watch scroll on the scrolling content div
scrollContainer.addEventListener('scroll', updateActiveLink);
// Also run once on load
window.addEventListener('load', updateActiveLink);
