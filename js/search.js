export const initSearch = () => {
  const form = document.querySelector('.search');
  if (!form) {
    console.error('Search form not found!');
    return;
  }
  console.log('Search form found, adding event listener');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
      document.querySelectorAll('.highlight').forEach((el) => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
        }
      });

      const searchKey = e.target.q.value.trim();
      if (!searchKey) return;

      const regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

      const walk = (node) => {
        if (node.nodeType === 3) {
          const match = node.nodeValue.match(regex);
          if (match) {
            const span = document.createElement('span');
            span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
            node.replaceWith.apply(node, span.childNodes);
          }
        } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
          node.childNodes.forEach(walk);
        }
      };

      const articleElement = document.querySelector('article');
      if (articleElement) {
        walk(articleElement);
      }

    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try a different search term.');
    }
  });
}; 