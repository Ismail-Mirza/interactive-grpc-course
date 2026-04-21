/* ============================================================
   gRPC Mastery Course — Shared JavaScript
   ============================================================ */

const TOTAL_LESSONS = 10;

/* ---- Completion Tracking ---- */
function getCompleted() {
  try { return JSON.parse(localStorage.getItem('grpc_completed') || '[]'); }
  catch { return []; }
}

function markComplete(lessonNum) {
  const done = getCompleted();
  if (!done.includes(lessonNum)) { done.push(lessonNum); }
  localStorage.setItem('grpc_completed', JSON.stringify(done));
  updateAllUI();
}

function isCompleted(lessonNum) {
  return getCompleted().includes(lessonNum);
}

/* ---- Progress Bar ---- */
function updateAllUI() {
  const done = getCompleted();
  const pct = Math.round((done.length / TOTAL_LESSONS) * 100);

  document.querySelectorAll('.nav-progress-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.nav-progress-count').forEach(el => el.textContent = done.length + '/' + TOTAL_LESSONS);
  document.querySelectorAll('.big-progress-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.progress-count').forEach(el => el.textContent = done.length + ' of ' + TOTAL_LESSONS + ' completed');

  document.querySelectorAll('.progress-dot').forEach((dot, i) => {
    const num = i + 1;
    dot.classList.toggle('done', done.includes(num));
  });

  document.querySelectorAll('.lesson-card[data-lesson]').forEach(card => {
    const num = parseInt(card.dataset.lesson);
    const status = card.querySelector('.card-status');
    card.classList.toggle('completed', done.includes(num));
    if (status) {
      status.classList.toggle('done', done.includes(num));
      status.innerHTML = done.includes(num) ? '✓ Completed' : '→ Start';
    }
  });

  const completeBtns = document.querySelectorAll('.complete-btn');
  completeBtns.forEach(btn => {
    const num = parseInt(btn.dataset.lesson);
    if (done.includes(num)) {
      btn.innerHTML = '✓ Lesson Completed';
      btn.classList.add('done');
    }
  });

  const banner = document.querySelector('.completion-banner');
  if (banner) {
    const num = parseInt(banner.dataset.lesson);
    if (done.includes(num)) banner.classList.add('show');
  }
}

/* ---- Copy to Clipboard ---- */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ---- Exercise Tabs ---- */
function initTabs() {
  document.querySelectorAll('.exercise-tabs').forEach(tabBar => {
    const section = tabBar.closest('.exercise-section, .ex-group');
    tabBar.querySelectorAll('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabBar.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        section.querySelectorAll('.ex-panel').forEach(p => p.classList.remove('active'));
        const panel = section.querySelector('#' + target);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ---- Complete Button ---- */
function initCompleteBtn() {
  document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = parseInt(btn.dataset.lesson);
      if (!isNaN(num)) markComplete(num);
    });
  });
}

/* ---- Highlight.js Init ---- */
function initHighlight() {
  if (window.hljs) {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
  }
}

/* ---- YouTube Thumbnail Fallback ---- */
function initVideoThumbs() {
  document.querySelectorAll('.video-thumb[data-vid]').forEach(el => {
    const vid = el.dataset.vid;
    const img = el.querySelector('img');
    if (img) img.src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
  });
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initTabs();
  initCompleteBtn();
  initHighlight();
  initVideoThumbs();
  initSmoothScroll();
  updateAllUI();
});
