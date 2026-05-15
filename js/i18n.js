(function() {
  'use strict';

  function getNestedValue(obj, key) {
    return key.split('.').reduce(function(o, k) {
      return o && o[k] !== undefined ? o[k] : null;
    }, obj);
  }

  function applyTranslations(data) {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var value = getNestedValue(data, key);
      if (value !== null) {
        if (el.tagName === 'META') {
          el.setAttribute('content', value);
        } else if (el.tagName === 'TITLE') {
          el.textContent = value;
        } else {
          el.textContent = value;
        }
      }
    });
  }

  var pathParts = window.location.pathname.split('/').filter(function(p){return p.length > 0;});
  var isSubfolder = pathParts.length >= 1 && /^[a-z]{2}$/.test(pathParts[0]);
  var jsonPath = 'content.json';

  fetch(jsonPath)
    .then(function(r) { return r.json(); })
    .then(function(data) { applyTranslations(data); })
    .catch(function(err) { console.error('i18n error:', err); });
})();
