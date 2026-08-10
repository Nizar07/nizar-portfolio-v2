const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const filterRow = document.getElementById('filterRow');
  const cards = document.querySelectorAll('.level-card');
  filterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(c => {
      const show = filter === 'all' || c.dataset.cat === filter;
      c.style.display = show ? 'flex' : 'none';
    });
  });
