export const initSearch = (): void => {
  const form = document.querySelector('.search')!;
  if (!form) {
    console.error('Search form not found!');
    return;
  }
  console.log('Search form found, adding event listener');

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    try {
      // Clear previous highlights
      document.querySelectorAll('.highlight').forEach((el) => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(
            document.createTextNode(el.textContent || ''),
            el
          );
          parent.normalize();
        }
      });

      const target = e.target as HTMLFormElement;
      const searchKey = (target.q as HTMLInputElement).value.trim();
      if (!searchKey) return;

      const regex = new RegExp(
        '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'gi'
      );

      const walk = (node: Node): void => {
        if (node.nodeType === 3) {
          // Text node
          const match = (node.nodeValue || '').match(regex);
          if (match) {
            const span = document.createElement('span');
            span.innerHTML = (node.nodeValue || '').replace(
              regex,
              '<mark class="highlight">$1</mark>'
            );
            node.replaceWith(...span.childNodes);
          }
        } else if (
          node.nodeType === 1 &&
          (node as Element).tagName !== 'SCRIPT' &&
          (node as Element).tagName !== 'STYLE' &&
          (node as Element).tagName !== 'FORM'
        ) {
          node.childNodes.forEach(walk);
        }
      };

      // Only search within article content
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
