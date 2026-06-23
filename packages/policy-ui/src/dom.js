export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function severityBars(level) {
  return Array.from({ length: 5 }, (_, index) => {
    const active = index < level ? 'is-hot' : '';

    return `<i class="${active}"></i>`;
  }).join('');
}
