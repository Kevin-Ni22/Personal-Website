document.querySelectorAll('.experience-entry').forEach(entry => {
  entry.addEventListener('click', () => {
    const content = entry.querySelector('.description');
    const icon = entry.querySelector('.card-arrow-icon');
    const isExpanding = !content.classList.contains('expanded');

    // Collapse others
    document.querySelectorAll('.experience-entry').forEach(other => {
      if (other !== entry) {
        const otherContent = other.querySelector('.description');
        const otherIcon = other.querySelector('.card-arrow-icon');

        if (otherContent.classList.contains('expanded')) {
          collapseCard(otherContent, otherIcon, other);
        }
      }
    });

    if (isExpanding) {
      expandCard(content, icon, entry);
    } else {
      collapseCard(content, icon, entry);
    }

    // Update focus effect
    updateFocusEffect();
  });

  // Add hover effects for focus
  entry.addEventListener('mouseenter', function() {
    const scrollContainer = document.querySelector('.scrolling-content');
    scrollContainer.classList.add('card-focused');
  });

  entry.addEventListener('mouseleave', function() {
    // Only remove focus if no cards are active
    const hasActiveCards = document.querySelectorAll('.experience-entry.active').length > 0;
    if (!hasActiveCards) {
      const scrollContainer = document.querySelector('.scrolling-content');
      scrollContainer.classList.remove('card-focused');
    }
  });
});

function updateFocusEffect() {
  const scrollContainer = document.querySelector('.scrolling-content');
  const hasActiveCards = document.querySelectorAll('.experience-entry.active').length > 0;
  
  if (hasActiveCards) {
    scrollContainer.classList.add('card-focused');
  } else {
    scrollContainer.classList.remove('card-focused');
  }
}

function expandCard(content, icon, entry) {
  content.style.maxHeight = content.scrollHeight + 'px';
  content.classList.add('expanded');
  icon.classList.remove('collapsing');
  icon.classList.add('expanding', 'expanded');
  entry.classList.add('active');
}

function collapseCard(content, icon, entry) {
  content.style.maxHeight = content.scrollHeight + 'px'; // set to current height

  // Force reflow to trigger transition
  void content.offsetHeight;

  content.style.maxHeight = '4.5rem';
  icon.classList.remove('expanded', 'expanding');
  icon.classList.add('collapsing');
  entry.classList.remove('active');

  // Listen for transition end before removing class
  const onTransitionEnd = () => {
    content.classList.remove('expanded');
    content.removeEventListener('transitionend', onTransitionEnd);
  };

  content.addEventListener('transitionend', onTransitionEnd);
}

// Spotlight effect
const spotlight = document.querySelector('.spotlight');
if (spotlight) {
  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const scrollContainer = document.querySelector('.scrolling-content');

// Smooth scroll on nav click
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target && scrollContainer) {
      const targetPosition = target.offsetTop - scrollContainer.offsetTop - 40;
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ScrollSpy functionality
const scrollSpySections = Array.from(navLinks).map(link =>
  document.querySelector(link.getAttribute('href'))
);

function updateActiveLink() {
  const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight / 2;

  scrollSpySections.forEach((section, index) => {
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
if (scrollContainer) {
  scrollContainer.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
}

// Global mouse wheel scrolling
document.addEventListener('wheel', function(e) {
  if (scrollContainer) {
    e.preventDefault();
    scrollContainer.scrollTop += e.deltaY;
  }
}, { passive: false });
