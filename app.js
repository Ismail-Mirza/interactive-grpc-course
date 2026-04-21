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

/* ---- Mermaid Init ---- */
function initMermaid() {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#f4f4f5',
        primaryTextColor: '#18181b',
        primaryBorderColor: '#d0d0d0',
        lineColor: '#71717a',
        secondaryColor: '#fafafa',
        tertiaryColor: '#f6f6f6',
        edgeLabelBackground: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        fontSize: '13px',
        clusterBkg: '#fafafa',
        clusterBorder: '#e4e4e4',
        titleColor: '#18181b',
        nodeBorder: '#d0d0d0',
        mainBkg: '#ffffff',
        nodeTextColor: '#18181b',
        activationBorderColor: '#71717a',
        activationBkgColor: '#f4f4f5',
        sequenceNumberColor: '#ffffff',
        actorBkg: '#18181b',
        actorTextColor: '#ffffff',
        actorBorder: '#18181b',
        signalColor: '#3f3f46',
        signalTextColor: '#18181b',
        labelBoxBkgColor: '#f4f4f5',
        labelBoxBorderColor: '#d0d0d0',
        labelTextColor: '#18181b',
        loopTextColor: '#18181b',
        noteBorderColor: '#d0d0d0',
        noteBkgColor: '#fffbeb',
        noteTextColor: '#78350f',
      },
      flowchart: { curve: 'basis', padding: 20 },
      sequence: { actorMargin: 50, messageMargin: 35, mirrorActors: false },
    });
  }
}

/* ---- Step-Through Components ---- */
function initSteppers() {
  document.querySelectorAll('.stepper').forEach(stepper => {
    const tabs   = stepper.querySelectorAll('.stepper-tab');
    const panels = stepper.querySelectorAll('.stepper-panel');
    const nextBtn = stepper.querySelector('.stepper-btn.primary');
    const prevBtn = stepper.querySelector('.stepper-btn.secondary');
    let current = 0;

    function goTo(idx) {
      // mark previous as done
      for (let i = 0; i < idx; i++) tabs[i].classList.add('done');
      tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      current = idx;
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === tabs.length - 1;
      if (nextBtn && idx === tabs.length - 1) nextBtn.textContent = '✓ Done';
    }

    tabs.forEach((tab, i) => tab.addEventListener('click', () => goTo(i)));
    if (nextBtn) nextBtn.addEventListener('click', () => { if (current < tabs.length - 1) goTo(current + 1); });
    if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });

    goTo(0);
  });
}

/* ---- Flow Visualizer (step-by-step with animated arrow) ---- */
function initFlowViz() {
  document.querySelectorAll('.flow-viz[data-auto]').forEach(viz => {
    const steps = viz.querySelectorAll('.flow-step');
    if (!steps.length) return;

    let idx = 0;
    function advance() {
      if (idx > 0) steps[idx - 1].classList.replace('active', 'done');
      if (idx < steps.length) {
        steps[idx].classList.add('active');
        idx++;
        setTimeout(advance, parseInt(viz.dataset.auto) || 1400);
      }
    }
    // start after a short delay so page is visible first
    setTimeout(advance, 600);
  });
}

/* ---- Protocol Selector Tabs ---- */
function initProtocolSelectors() {
  document.querySelectorAll('.protocol-selector').forEach(sel => {
    const tabs   = sel.querySelectorAll('.protocol-tab');
    const panels = sel.querySelectorAll('.protocol-panel');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t   => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panels[i].classList.add('active');
      });
    });
    if (tabs.length) { tabs[0].classList.add('active'); panels[0].classList.add('active'); }
  });
}

/* ---- Expand/Collapse Explainers ---- */
function initExplainers() {
  document.querySelectorAll('.explainer-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.explainer').classList.toggle('open');
    });
  });
}

/* ---- Intersection Observer for fade-in ---- */
function initFadeIns() {
  if (!window.IntersectionObserver) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in, .fade-in-2, .fade-in-3').forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
}

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  initMermaid();
  initCopyButtons();
  initTabs();
  initCompleteBtn();
  initHighlight();
  initVideoThumbs();
  initSmoothScroll();
  initSteppers();
  initFlowViz();
  initProtocolSelectors();
  initExplainers();
  initFadeIns();
  updateAllUI();
});
