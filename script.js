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

  /* =========================================================
     PROJECT GALLERY MODAL
     -----------------------------------------------------------
     Each project points to a folder under media/<project-id>/.
     Add as many numbered files as you like (1.jpg, 2.jpg, 3.mp4 ...)
     and list them here in the order you want them to appear.
     Supported: .jpg .jpeg .png .gif .webp (image) and .mp4 .webm (video)
  ========================================================= */
  const projectMedia = {
    "escape-from-school": {
      title: "Escape from School",
      items: [
        { type: "image", src: "media/escape-from-school/1.svg" },
        { type: "image", src: "media/escape-from-school/2.svg" },
        { type: "image", src: "media/escape-from-school/3.svg" }
      ]
    },
    "door-of-truth": {
      title: "Find the Door of Truth",
      items: [
        { type: "image", src: "media/door-of-truth/1.svg" },
        { type: "image", src: "media/door-of-truth/2.svg" }
      ]
    },
    "pulau-sunyi": {
      title: "Pulau Sunyi: Misteri Mayat di Dermaga",
      items: [
        { type: "image", src: "media/pulau-sunyi/1.svg" },
        { type: "image", src: "media/pulau-sunyi/2.svg" },
        { type: "image", src: "media/pulau-sunyi/3.svg" }
      ]
    },
    "witch-vs-parasite": {
      title: "Witch vs Parasite",
      items: [
        { type: "image", src: "media/witch-vs-parasite/1.svg" },
        { type: "image", src: "media/witch-vs-parasite/2.svg" }
      ]
    },
    "interactive-learning": {
      title: "Interactive Learning Mini-Games",
      items: [
        { type: "image", src: "media/interactive-learning/1.svg" },
        { type: "image", src: "media/interactive-learning/2.svg" },
        { type: "image", src: "media/interactive-learning/3.svg" }
      ]
    },
    "visual-novel-funtasya": {
      title: "Visual Novel Project : Funtasya",
      items: [
        { type: "image", src: "media/visual-novel-funtasya/1.svg" },
        { type: "image", src: "media/visual-novel-funtasya/2.svg" },
        { type: "image", src: "media/visual-novel-funtasya/3.svg" }
      ]
    },
    "mora": {
      title: "Mora — Mood Relaxing Anxiety",
      items: [
        { type: "image", src: "media/mora/1.svg" },
        { type: "image", src: "media/mora/2.svg" },
        { type: "image", src: "media/mora/3.svg" }
      ]
    },
    "taud-saqu": {
      title: "TAUD Saqu Ashabul Qur'an",
      items: [
        { type: "image", src: "media/taud-saqu/1.svg" },
        { type: "image", src: "media/taud-saqu/2.svg" }
      ]
    },
    "studysync": {
      title: "StudySync",
      items: [
        { type: "image", src: "media/studysync/1.svg" },
        { type: "image", src: "media/studysync/2.svg" }
      ]
    },
    "finance-ai": {
      title: "Finance AI",
      items: [
        { type: "image", src: "media/finance-ai/1.svg" },
        { type: "image", src: "media/finance-ai/2.svg" }
      ]
    }
  };

  const modal = document.getElementById('mediaModal');
  const modalMediaWrap = document.getElementById('modalMediaWrap');
  const modalTitle = document.getElementById('modalTitle');
  const modalCounter = document.getElementById('modalCounter');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  let currentItems = [];
  let currentIndex = 0;
  let lastFocusedCard = null;

  function renderMedia(){
    const item = currentItems[currentIndex];
    modalMediaWrap.innerHTML = '';
    if(item.type === 'video'){
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      modalMediaWrap.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = modalTitle.textContent + ' — image ' + (currentIndex + 1);
      modalMediaWrap.appendChild(img);
    }
    modalCounter.textContent = (currentIndex + 1) + ' / ' + currentItems.length;
  }

  function openModal(projectId, triggerEl){
    const project = projectMedia[projectId];
    if(!project || !project.items.length) return;
    currentItems = project.items;
    currentIndex = 0;
    modalTitle.textContent = project.title;
    lastFocusedCard = triggerEl;
    renderMedia();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalMediaWrap.innerHTML = '';
    document.body.style.overflow = '';
    if(lastFocusedCard) lastFocusedCard.focus();
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    renderMedia();
  }
  function showNext(){
    currentIndex = (currentIndex + 1) % currentItems.length;
    renderMedia();
  }

  cards.forEach(card => {
    const projectId = card.dataset.project;
    if(!projectId) return;
    card.addEventListener('click', () => openModal(projectId, card));
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openModal(projectId, card);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', showPrev);
  modalNext.addEventListener('click', showNext);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if(!modal.classList.contains('open')) return;
    if(e.key === 'Escape') closeModal();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });
