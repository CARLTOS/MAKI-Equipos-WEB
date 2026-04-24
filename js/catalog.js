/* ============================================
   MAKI EQUIPOS - Catalog Filters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogFilters();
});

function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.catalog-filter__btn');
  const categories = document.querySelectorAll('.catalog-category');

  if (!filterBtns.length || !categories.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter categories
      categories.forEach(cat => {
        if (filter === 'todos' || cat.dataset.category === filter) {
          cat.style.display = '';
          // Re-trigger animation
          cat.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 100);
          });
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}
