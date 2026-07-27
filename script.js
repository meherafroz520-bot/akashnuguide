/* Akash NU Guide — shared behaviour */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ambient background motes ---------- */
  const bg = document.querySelector('.bg-motes');
  if (bg) {
    const count = window.innerWidth < 760 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const isRing = i % 3 === 0;
      el.className = isRing ? 'ring' : 'dot';
      const size = isRing ? (18 + Math.random() * 26) : (4 + Math.random() * 7);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDuration = (6 + Math.random() * 7) + 's';
      el.style.animationDelay = (Math.random() * 6) + 's';
      bg.appendChild(el);
    }
  }

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // On mobile, tapping a dropdown parent expands instead of navigating
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 760) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* ---------- mark active nav link ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* ---------- year tabs (used on social-work.html) ---------- */
  const tabButtons = document.querySelectorAll('.year-tabs button');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.year-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById(btn.dataset.target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ---------- field-work FAQ orbit decoration ---------- */
  const orbit = document.querySelector('.faq-orbit');
  if (orbit) {
    const colors = ['var(--teal)', 'var(--coral)', 'var(--violet)', 'var(--sky)', 'var(--rose)', 'var(--gold)'];
    const count = window.innerWidth < 760 ? 6 : 12;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const size = 6 + Math.random() * 12;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.background = colors[i % colors.length];
      el.style.animationDuration = (5 + Math.random() * 4) + 's';
      el.style.animationDelay = (Math.random() * 4) + 's';
      orbit.appendChild(el);
    }
  }

  /* ---------- field-work FAQ search + expand/collapse ---------- */
  const faqSearch = document.getElementById('faqSearch');
  const qaItems = document.querySelectorAll('details.qa');
  const faqCount = document.getElementById('faqCount');
  const faqEmpty = document.getElementById('faqEmpty');
  const partTitles = document.querySelectorAll('.faq-part-title');

  function filterFaq() {
    const term = faqSearch.value.trim().toLowerCase();
    let visible = 0;
    qaItems.forEach(item => {
      const text = item.dataset.search || item.textContent.toLowerCase();
      const match = !term || text.includes(term);
      item.classList.toggle('qa-hidden', !match);
      if (match) visible++;
    });
    partTitles.forEach(pt => {
      const part = pt.dataset.part;
      const list = document.querySelector('.qa-list[data-part-list="' + part + '"]');
      if (!list) return;
      const anyVisible = list.querySelectorAll('details.qa:not(.qa-hidden)').length > 0;
      pt.classList.toggle('qa-hidden', !anyVisible);
      list.classList.toggle('qa-hidden', !anyVisible);
    });
    if (faqCount) faqCount.textContent = visible + ' / ' + qaItems.length + ' টি প্রশ্ন';
    if (faqEmpty) faqEmpty.classList.toggle('show', visible === 0);
  }

  if (faqSearch) {
    faqSearch.addEventListener('input', filterFaq);
    filterFaq();
  }

  const expandAllBtn = document.getElementById('expandAll');
  const collapseAllBtn = document.getElementById('collapseAll');
  if (expandAllBtn) expandAllBtn.addEventListener('click', () => qaItems.forEach(i => i.open = true));
  if (collapseAllBtn) collapseAllBtn.addEventListener('click', () => qaItems.forEach(i => i.open = false));

  /* ---------- contact form (no backend — friendly confirmation) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'ধন্যবাদ! বার্তা লেখা হয়েছে। এখন সরাসরি যোগাযোগের জন্য ফেসবুক পেজে মেসেজ করুন — আমরা সবচেয়ে দ্রুত সেখানেই উত্তর দিই।';
        note.style.color = '#0E6B4F';
      }
      form.reset();
    });
  }

});
