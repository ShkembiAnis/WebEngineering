export function initSearch() {
  var form = document.querySelector('.search');
  if (!form) {
    console.error('Search form not found!');
    return;
  }
  console.log('Search form found, adding event listener');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    try {
      // Clear previous highlights
      document.querySelectorAll('.highlight').forEach(function(el) {
        var parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
        }
      });

      var searchKey = this.q.value.trim();
      if (!searchKey) return;

      var regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

      function walk(node) {
        if (node.nodeType === 3) { // Text node
          var match = node.nodeValue.match(regex);
          if (match) {
            var span = document.createElement('span');
            span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
            node.replaceWith.apply(node, span.childNodes);
          }
        } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
          node.childNodes.forEach(walk);
        }
      }

      // Only search within article content
      var articleElement = document.querySelector('article');
      if (articleElement) {
        walk(articleElement);
      }

    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try a different search term.');
    }
  });
} 