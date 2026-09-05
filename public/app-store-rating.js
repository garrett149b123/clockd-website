/**
 * Hydrate App Store rating badges from Apple’s public lookup API
 * (via same-origin /api proxy so CORS never blocks the update).
 */
(function hydrateAppStoreRating() {
  const nodes = document.querySelectorAll('[data-app-store-rating]');
  if (!nodes.length) return;

  fetch('/api/app-store-rating')
    .then(function (res) {
      return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(function (data) {
      var rating = Number(data && data.rating);
      var count = Number(data && data.count);
      if (!Number.isFinite(rating) || rating <= 0 || !Number.isFinite(count) || count < 0) return;

      var ratingText = (Math.round(rating * 10) / 10).toFixed(1);
      var countRounded = Math.round(count);
      var countText = countRounded === 1 ? '1 rating' : countRounded + ' ratings';
      var label = ratingText + ' on the App Store · ' + countText;

      nodes.forEach(function (el) {
        var value = el.querySelector('[data-app-store-rating-value]');
        if (value) value.textContent = label;
        el.setAttribute(
          'aria-label',
          'Rated ' + ratingText + ' out of 5 on the App Store from ' + countText,
        );
      });
    })
    .catch(function () {
      /* Keep build-time fallback text. */
    });
})();
