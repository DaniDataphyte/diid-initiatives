export function bindScrollSpy(anchors, sections, offset = 140) {
  if (!anchors.length || !sections.length) {
    return;
  }

  const syncActiveSection = () => {
    const threshold = window.scrollY + offset;
    let currentId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= threshold) {
        currentId = section.id;
      }
    });

    anchors.forEach((anchor) => {
      const active = anchor.getAttribute('href') === `#${currentId}`;
      anchor.classList.toggle('is-active', active);
    });
  };

  window.addEventListener('scroll', syncActiveSection, { passive: true });
  syncActiveSection();
}
